export type ConditionType = 'price_drops' | 'price_rises';
export type Action        = 'buy' | 'sell' | 'alert';
export type AgentStatus   = 'idle' | 'monitoring' | 'triggered' | 'paused' | 'error';

export interface SolanaToken {
  id:     string;  // CoinGecko ID e.g. 'solana'
  symbol: string;  // e.g. 'SOL'
  name:   string;  // e.g. 'Solana'
}

export interface AgentRule {
  id:            string;
  name:          string;
  token:         SolanaToken;
  conditionType: ConditionType;
  conditionPct:  number;       // e.g. 5 = "drops 5%"
  action:        Action;
  amount:        number;
  status:        AgentStatus;
  createdAt:     Date;
  triggeredAt?:  Date;
}

export interface Execution {
  id:          string;
  agentId:     string;
  agentName:   string;
  tokenSymbol: string;
  action:      Action;
  amount:      number;
  timestamp:   Date;
  txHash:      string | null;
  status:      'success' | 'failed' | 'pending';
  price:       number;
}

export interface PriceData {
  current:   number;
  change24h: number;
  history:   number[];
}
