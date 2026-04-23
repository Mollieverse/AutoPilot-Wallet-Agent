import { NextResponse } from 'next/server';

// Cache: tokenId -> { usd, usd_24h_change, ts }
const cache: Record<string, { usd: number; usd_24h_change: number; ts: number }> = {};
const TTL = 30_000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids') || 'solana';

  const now     = Date.now();
  const idList  = ids.split(',').map(s => s.trim()).filter(Boolean);
  const stale   = idList.filter(id => !cache[id] || now - cache[id].ts > TTL);

  // Only fetch what isn't cached
  if (stale.length > 0) {
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${stale.join(',')}&vs_currencies=usd&include_24hr_change=true`;
      const res  = await fetch(url, { next: { revalidate: 30 } });
      const data = await res.json();
      for (const [id, info] of Object.entries(data as Record<string, { usd: number; usd_24h_change: number }>)) {
        cache[id] = { usd: info.usd, usd_24h_change: info.usd_24h_change ?? 0, ts: now };
      }
    } catch {
      // fall through to return cached values
    }
  }

  const result: Record<string, { usd: number; usd_24h_change: number }> = {};
  for (const id of idList) {
    if (cache[id]) result[id] = { usd: cache[id].usd, usd_24h_change: cache[id].usd_24h_change };
  }
  return NextResponse.json(result);
}
