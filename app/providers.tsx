'use client';
import React, { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SOLANA_RPC_ENDPOINT } from '@/lib/constants';
import '@solana/wallet-adapter-react-ui/styles.css';

// Cast to any to fix React 18 + wallet adapter type conflict
const CP  = ConnectionProvider  as any;
const WP  = WalletProvider      as any;
const WMP = WalletModalProvider as any;

export function SolanaProviders({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <CP endpoint={SOLANA_RPC_ENDPOINT}>
      <WP wallets={wallets} autoConnect>
        <WMP>
          {children}
        </WMP>
      </WP>
    </CP>
  );
}
