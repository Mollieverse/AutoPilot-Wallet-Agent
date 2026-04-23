'use client';
import { memo } from 'react';
import { Bot, Zap, TrendingUp, Shield } from 'lucide-react';

interface Props { agentCount: number; execCount: number; successRate: number; }

export const StatsBar = memo(function StatsBar({ agentCount, execCount, successRate }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: 'Active Agents', value: agentCount,             suffix: '',  Icon: Bot,        color: 'text-primary'   },
        { label: 'Executions',    value: execCount,              suffix: '',  Icon: Zap,        color: 'text-secondary' },
        { label: 'Success Rate',  value: successRate.toFixed(0), suffix: '%', Icon: TrendingUp, color: 'text-accent'    },
        { label: 'Network',       value: 'Devnet',               suffix: '',  Icon: Shield,     color: 'text-warning'   },
      ].map(({ label, value, suffix, Icon, color }) => (
        <div key={label} className="rounded-xl bg-card border border-border p-3.5 flex items-center gap-3 hover:border-primary/20 transition-colors">
          <div className={`w-8 h-8 rounded-lg bg-card-2 flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className={`font-bold text-base font-mono leading-none ${color}`}>{value}{suffix}</p>
            <p className="text-[10px] text-muted mt-0.5 truncate">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
});
