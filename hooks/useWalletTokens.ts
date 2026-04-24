'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { WalletToken } from '@/lib/types';

// Jupiter token list — covers most Solana tokens including meme coins
const JUPITER_TOKEN_LIST = 'https://token.jup.ag/all';
// Jupiter price API — works for ANY SPL token by mint
const JUPITER_PRICE_API  = 'https://price.jup.ag/v6/price?ids=';

// Cache token metadata so we don't re-fetch every time
let tokenListCache: Record<string, { symbol: string; name: string; logoURI?: string }> | null = null;

async function getTokenMetadata(mint: string): Promise<{ symbol: string; name: string; logo?: string }> {
  // Load Jupiter token list once
  if (!tokenListCache) {
    try {
      const res  = await fetch(JUPITER_TOKEN_LIST);
      const list = await res.json() as Array<{ address: string; symbol: string; name: string; logoURI?: string }>;
      tokenListCache = {};
      for (const t of list) {
        tokenListCache[t.address] = { symbol: t.symbol, name: t.name, logoURI: t.logoURI };
      }
    } catch {
      tokenListCache = {};
    }
  }

  const meta = tokenListCache[mint];
  if (meta) {
    return { symbol: meta.symbol, name: meta.name, logo: meta.logoURI };
  }

  // Unknown token — show shortened mint
  return {
    symbol: `${mint.slice(0, 4)}...`,
    name:   `Unknown (${mint.slice(0, 8)}...)`,
  };
}

async function getTokenPrices(mints: string[]): Promise<Record<string, number>> {
  if (!mints.length) return {};
  try {
    const res  = await fetch(`${JUPITER_PRICE_API}${mints.join(',')}`);
    const data = await res.json() as {
      data: Record<string, { price: number } | null>;
    };
    const prices: Record<string, number> = {};
    for (const [mint, info] of Object.entries(data.data ?? {})) {
      if (info?.price) prices[mint] = info.price;
    }
    return prices;
  } catch {
    return {};
  }
}

export function useWalletTokens() {
  const { publicKey, connected } = useWallet();
  const { connection }           = useConnection();

  const [tokens,  setTokens]  = useState<WalletToken[]>([]);
  const [loading, setLoading] = useState(false);
  const mountedRef            = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const fetchTokens = useCallback(async () => {
    if (!publicKey || !connected) { setTokens([]); return; }
    setLoading(true);

    try {
      // 1. Get all SPL token accounts
      const accounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') },
      );

      // 2. Filter tokens with balance > 0
      const nonZero = accounts.value
        .map(a => {
          const info = a.account.data.parsed.info;
          return {
            mint:    info.mint as string,
            balance: parseFloat(info.tokenAmount.uiAmountString ?? '0'),
          };
        })
        .filter(t => t.balance > 0);

      if (!mountedRef.current) return;
      if (nonZero.length === 0) { setTokens([]); setLoading(false); return; }

      // 3. Fetch metadata + prices in parallel
      const [metaResults, prices] = await Promise.all([
        Promise.all(nonZero.map(t => getTokenMetadata(t.mint))),
        getTokenPrices(nonZero.map(t => t.mint)),
      ]);

      if (!mountedRef.current) return;

      const result: WalletToken[] = nonZero.map((t, i) => ({
        mint:    t.mint,
        symbol:  metaResults[i].symbol,
        name:    metaResults[i].name,
        balance: t.balance,
        logo:    metaResults[i].logo,
        price:   prices[t.mint],
      }));

      // Sort: known tokens first, then by balance descending
      result.sort((a, b) => {
        const aKnown = !a.symbol.includes('...');
        const bKnown = !b.symbol.includes('...');
        if (aKnown !== bKnown) return aKnown ? -1 : 1;
        return (b.balance * (b.price ?? 0)) - (a.balance * (a.price ?? 0));
      });

      setTokens(result);
    } catch (err) {
      console.error('Failed to fetch wallet tokens:', err);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [publicKey, connected, connection]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading, refresh: fetchTokens };
                                  }
