'use client';
import { useState } from 'react';
import { Zap, TrendingDown, TrendingUp, RefreshCw, Clock, Shield } from 'lucide-react';
import { SolanaToken, ConditionType, Action } from '@/lib/types';
import { SOLANA_TOKENS } from '@/lib/constants';

interface Template {
  id:       string;
  icon:     React.ReactNode;
  title:    string;
  desc:     string;
  color:    string;
  defaults: {
    conditionType: ConditionType;
    conditionPct:  number;
    action:        Action;
    amount:        number;
    name:          string;
  };
}

const TEMPLATES: Template[] = [
  {
    id:    'buy-dip',
    icon:  <TrendingDown className="w-5 h-5" />,
    title: 'Buy the Dip',
    desc:  'Buy when price drops from your entry',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    defaults: {
      conditionType: 'price_drops',
      conditionPct:  10,
      action:        'buy',
      amount:        0.1,
      name:          'Dip Buyer',
    },
  },
  {
    id:    'take-profit',
    icon:  <TrendingUp className="w-5 h-5" />,
    title: 'Take Profit',
    desc:  'Sell when price rises to target',
    color: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
    defaults: {
      conditionType: 'price_rises',
      conditionPct:  20,
      action:        'sell',
      amount:        0.1,
      name:          'Profit Taker',
    },
  },
  {
    id:    'stop-loss',
    icon:  <Shield className="w-5 h-5" />,
    title: 'Stop Loss',
    desc:  'Protect against large downside',
    color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
    defaults: {
      conditionType: 'price_drops',
      conditionPct:  15,
      action:        'sell',
      amount:        0.1,
      name:          'Stop Loss Guard',
    },
  },
  {
    id:    'dca',
    icon:  <Clock className="w-5 h-5" />,
    title: 'Weekly DCA',
    desc:  'Buy a fixed amount every week',
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    defaults: {
      conditionType: 'price_drops',
      conditionPct:  0,
      action:        'buy',
      amount:        0.05,
      name:          'Weekly DCA',
    },
  },
  {
    id:    'rebalance',
    icon:  <RefreshCw className="w-5 h-5" />,
    title: 'Rebalance',
    desc:  'Keep portfolio in target ratios',
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
    defaults: {
      conditionType: 'price_rises',
      conditionPct:  5,
      action:        'sell',
      amount:        0.1,
      name:          'Auto Rebalance',
    },
  },
  {
    id:    'momentum',
    icon:  <Zap className="w-5 h-5" />,
    title: 'Momentum Buy',
    desc:  'Buy when breakout is confirmed',
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
    defaults: {
      conditionType: 'price_rises',
      conditionPct:  8,
      action:        'buy',
      amount:        0.1,
      name:          'Momentum Rider',
    },
  },
];

interface Props {
  onSelect: (template: Template['defaults'] & { token: SolanaToken }) => void;
}

export function IntentTemplates({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-muted uppercase tracking-wider">
        Quick Templates
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setSelected(t.id);
              onSelect({
                ...t.defaults,
                token: SOLANA_TOKENS[0],
              });
            }}
            className={`p-4 rounded-xl border bg-gradient-to-br text-left
                        transition-all active:scale-95 hover:scale-[1.02]
                        ${t.color}
                        ${selected === t.id ? 'ring-2 ring-white/20' : ''}`}
          >
            <div className="mb-2">{t.icon}</div>
            <p className="font-bold text-sm mb-0.5">{t.title}</p>
            <p className="text-xs opacity-70 leading-tight">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
