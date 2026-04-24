export type ConditionType = 'price_drops' | 'price_rises';
export type Action        = 'buy' | 'sell' | 'alert';
export type AgentStatus   = 'idle' | 'monitoring' | 'triggered' | 'paused' | 'error';

export interface SolanaToken {
  id:      string;   // CoinGecko ID or mint address for on-chain tokens
  symbol:  string;
  name:    string;
  mint?:   string;   // SPL mint address (for wallet/meme tokens)
  logo?:   string;   // token logo URI
  balance?: number;  // wallet balance if from user's wallet
}

export interface AgentRule {
  id:            string;
  name:          string;
  token:         SolanaToken;
  conditionType: ConditionType;
  conditionPct:  number;
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

export interface WalletToken {
  mint:    string;
  symbol:  string;
  name:    string;
  balance: number;
  logo?:   string;
  price?:  number;
}
