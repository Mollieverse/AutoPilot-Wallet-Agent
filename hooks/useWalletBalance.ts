'use client';
import { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function useWalletBalance() {
  const { publicKey, connected } = useWallet();
  const { connection }           = useConnection();
  const [balance, setBalance]    = useState<number | null>(null);
  const [loading, setLoading]    = useState(false);

  const refresh = useCallback(async () => {
    if (!publicKey || !connected) {
      setBalance(null);
      return;
    }
    setLoading(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch {
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, connection]);

  // Refresh when wallet connects/changes
  useEffect(() => { refresh(); }, [refresh]);

  // Refresh every 30 s
  useEffect(() => {
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [refresh]);

  return { balance, loading, refresh };
}
