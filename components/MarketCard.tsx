'use client';
import { useEffect, useState, memo } from 'react';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';

interface Props {
  solHistory: number[];
}

interface TokenData {
  id:                          string;
  symbol:                      string;
  name:                        string;
  current_price:               number;
  price_change_percentage_24h: number;
  total_volume:                number;
  sparkline_in_7d?:            { price: number[] };
}

const TOKEN_IDS = 'solana,jito-governance-token,raydium,bonk,dogwifcoin';

function MiniChart({ prices, positive }: { prices: number[]; positive: boolean }) {
  if (!prices || prices.length < 2) return null;
  const W = 80, H = 30;
  const min = Math.min(...prices), max = Math.max(...prices), range = max - min || 1;
  const pts = prices.map((v, i) => ({ x: (i / (prices.length - 1)) * W, y: H - ((v - min) / range) * H }));
  const d   = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const color = positive ? '#00FFA3' : '#FF6B6B';
  return (
    <svg width={W} height={H} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`mg${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={`${d} L${W} ${H} L0 ${H} Z`} fill={`url(#mg${positive})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SolPriceChart({ history }: { history: number[] }) {
  if (!history || history.length < 2) return null;
  const vW = 400, vH = 100;
  const min = Math.min(...history), max = Math.max(...history), range = max - min || 1;
  const n   = history.length;
  const positive = history[n - 1] >= history[0];
  const color    = positive ? '#00FFA3' : '#FF6B6B';
  const pts = history.map((v, i) => ({ x: (i / (n - 1)) * vW, y: vH - ((v - min) / range) * vH }));
  const d   = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const now = new Date();
  const labels = history.map((_, i) => i).filter(i => i % 6 === 0 || i === n - 1);
  const getLabel = (i: number) => {
    const d = new Date(now.getTime() - (n - 1 - i) * 3_600_000);
    return d.getHours().toString().padStart(2, '0') + ':00';
  };
  return (
    <div className="mt-2">
      <p className="text-xs text-muted mb-2 font-mono">SOL/USD — 24h</p>
      <svg viewBox={`0 0 ${vW} ${vH + 20}`} style={{ width: '100%', height: 100 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0"   />
          </linearGradient>
          <clipPath id="cc"><rect x="0" y="0" width={vW} height={vH} /></clipPath>
        </defs>
        {[0, 25, 50, 75, 100].map(p => (
          <line key={p} x1="0" y1={vH * p / 100} x2={vW} y2={vH * p / 100} stroke="rgba(48,54,61,0.6)" strokeWidth="0.5" />
        ))}
        <path d={`${d} L${vW} ${vH} L0 ${vH} Z`} fill="url(#cg)" clipPath="url(#cc)" />
        <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" clipPath="url(#cc)" />
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill={color} stroke="#161B22" strokeWidth="2" />
        {labels.map(i => (
          <text key={i} x={(i / (n - 1)) * vW} y={vH + 16} textAnchor="middle" fontSize="9" fill="#8B949E" fontFamily="'Space Mono',monospace">
            {getLabel(i)}
          </text>
        ))}
        <text x="2" y="10"       fontSize="8" fill="#8B949E" fontFamily="'Space Mono',monospace">${max.toFixed(1)}</text>
        <text x="2" y={vH - 2}   fontSize="8" fill="#8B949E" fontFamily="'Space Mono',monospace">${min.toFixed(1)}</text>
      </svg>
    </div>
  );
}

function fmtPrice(p: number): string {
  if (p < 0.00001) return `$${p.toFixed(8)}`;
  if (p < 0.001)   return `$${p.toFixed(6)}`;
  if (p < 1)       return `$${p.toFixed(4)}`;
  return `$${p.toFixed(2)}`;
}

function fmtVol(v: number): string {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000)     return `$${(v / 1_000_000).toFixed(0)}M`;
  return `$${(v / 1_000).toFixed(0)}K`;
}

export const MarketCard = memo(function MarketCard({ solHistory }: Props) {
  const [tokens,      setTokens]      = useState<TokenData[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error,       setError]       = useState(false);

  const fetchMarket = async () => {
    setLoading(true);
    setError(false);
    try {
      const res  = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${TOKEN_IDS}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
      );
      if (!res.ok) throw new Error();
      const data = await res.json() as TokenData[];
      setTokens(data);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarket();
    const id = setInterval(fetchMarket, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-secondary" />
          <h2 className="font-bold text-sm">Live Market</h2>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-muted font-mono">
              {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
          <button onClick={fetchMarket} className={`p-1.5 rounded-lg hover:bg-card-2 text-muted transition-all ${loading ? 'animate-spin' : ''}`}>
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {solHistory.length > 0 && (
        <div className="px-5 pt-4 pb-2 border-b border-border">
          <SolPriceChart history={solHistory} />
        </div>
      )}

      {loading && tokens.length === 0 ? (
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-card-2 shimmer" />
                <div className="space-y-1">
                  <div className="w-12 h-3 rounded bg-card-2 shimmer" />
                  <div className="w-20 h-2.5 rounded bg-card-2 shimmer" />
                </div>
              </div>
              <div className="w-16 h-3 rounded bg-card-2 shimmer" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <p className="text-sm text-muted mb-3">Failed to load market data</p>
          <button onClick={fetchMarket} className="text-xs text-secondary hover:underline">Retry</button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {tokens.map(token => {
            const pos         = token.price_change_percentage_24h >= 0;
            const sparkPrices = token.sparkline_in_7d?.price?.slice(-24) ?? [];
            return (
              <div key={token.id} className="flex items-center justify-between px-5 py-3 hover:bg-card-2/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30
                                  flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                    {token.symbol.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{token.symbol.toUpperCase()}</p>
                    <p className="text-xs text-muted">{fmtVol(token.total_volume)} vol</p>
                  </div>
                </div>
                {sparkPrices.length > 0 && (
                  <div className="hidden sm:block mx-3">
                    <MiniChart prices={sparkPrices} positive={pos} />
                  </div>
                )}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-mono font-semibold">{fmtPrice(token.current_price)}</p>
                  <div className={`flex items-center justify-end gap-1 text-xs font-mono ${pos ? 'text-accent' : 'text-danger'}`}>
                    {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {pos ? '+' : ''}{token.price_change_percentage_24h?.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tokens.length > 0 && (() => {
        const best = [...tokens].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)[0];
        const pos  = best.price_change_percentage_24h >= 0;
        return (
          <div className={`m-4 p-3 rounded-xl border text-xs ${pos ? 'bg-accent/5 border-accent/20' : 'bg-danger/5 border-danger/20'}`}>
            <p className={`font-bold mb-1 ${pos ? 'text-accent' : 'text-danger'}`}>{pos ? '🔥 Opportunity' : '📉 Watch Out'}</p>
            <p className="text-muted">
              <span className="text-text font-semibold">{best.symbol.toUpperCase()}</span> is {pos ? 'up' : 'down'}{' '}
              <span className={`font-mono font-bold ${pos ? 'text-accent' : 'text-danger'}`}>
                {pos ? '+' : ''}{best.price_change_percentage_24h.toFixed(2)}%
              </span>{' '}
              in 24h. {pos ? 'Consider a momentum agent.' : 'Consider a dip-buy agent.'}
            </p>
          </div>
        );
      })()}
    </div>
  );
});
