'use client';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TokenRow {
  symbol:    string;
  name:      string;
  price:     number;
  change:    number;
  volume:    string;
}

// Mock market data — replace with live API (Birdeye, Jupiter) in production
const TOKENS: TokenRow[] = [
  { symbol: 'SOL',  name: 'Solana',    price: 148.52, change:  2.14, volume: '$1.2B' },
  { symbol: 'JTO',  name: 'Jito',      price:   3.81, change: -1.23, volume: '$42M'  },
  { symbol: 'RAY',  name: 'Raydium',   price:   2.07, change:  5.61, volume: '$18M'  },
  { symbol: 'BONK', name: 'Bonk',      price: 0.000021, change: -3.4, volume: '$89M' },
  { symbol: 'WIF',  name: 'dogwifhat', price:   1.94, change:  8.22, volume: '$230M' },
];

export function MarketCard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-secondary" />
          <h2 className="font-bold text-sm">Market</h2>
        </div>
        <span className="text-xs text-muted bg-card-2 px-2 py-0.5 rounded-full">Mock data</span>
      </div>

      <div className="divide-y divide-border">
        {TOKENS.map(token => {
          const pos = token.change >= 0;
          // Format price nicely
          const priceStr = token.price < 0.001
            ? `$${token.price.toFixed(6)}`
            : token.price < 1
              ? `$${token.price.toFixed(4)}`
              : `$${token.price.toFixed(2)}`;

          return (
            <div
              key={token.symbol}
              className="flex items-center justify-between px-5 py-3 hover:bg-card-2/50 transition-colors"
            >
              {/* Token info */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30
                                flex items-center justify-center text-xs font-bold font-mono">
                  {token.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{token.symbol}</p>
                  <p className="text-xs text-muted">{token.name}</p>
                </div>
              </div>

              {/* Price + change */}
              <div className="text-right">
                <p className="text-sm font-mono font-semibold">{priceStr}</p>
                <div className={`flex items-center justify-end gap-1 text-xs font-mono
                  ${pos ? 'text-accent' : 'text-danger'}`}>
                  {pos
                    ? <TrendingUp   className="w-3 h-3" />
                    : <TrendingDown className="w-3 h-3" />
                  }
                  {pos ? '+' : ''}{token.change.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Opportunity highlight */}
      <div className="m-4 p-3 rounded-xl bg-accent/5 border border-accent/20">
        <p className="text-xs font-bold text-accent mb-1">🔥 Opportunity Detected</p>
        <p className="text-xs text-muted">
          WIF is up <span className="text-text font-mono">+8.22%</span> in 24h.
          Consider setting a momentum buy agent.
        </p>
      </div>
    </div>
  );
}
