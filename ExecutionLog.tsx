'use client';
import { ExternalLink, CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import { Execution } from '@/lib/types';
import { explorerLink } from '@/lib/solana';
import { ACTION_LABELS } from '@/lib/constants';

interface Props {
  executions: Execution[];
}

function StatusIcon({ status }: { status: Execution['status'] }) {
  if (status === 'success') return <CheckCircle2 className="w-4 h-4 text-accent" />;
  if (status === 'failed')  return <XCircle      className="w-4 h-4 text-danger" />;
  return <Loader2 className="w-4 h-4 text-secondary animate-spin" />;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function shortHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
}

export function ExecutionLog({ executions }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <h2 className="font-bold text-sm">Execution Log</h2>
        </div>
        <span className="text-xs font-mono text-muted bg-card-2 px-2 py-0.5 rounded-full">
          {executions.length}
        </span>
      </div>

      {executions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-card-2 flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-muted/50" />
          </div>
          <p className="text-sm font-medium text-muted">No executions yet</p>
          <p className="text-xs text-muted/60 mt-1">Create an agent and trigger it to see results here</p>
        </div>
      ) : (
        <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
          {executions.map(exec => (
            <div key={exec.id} className="px-5 py-4 hover:bg-card-2/50 transition-colors animate-slide-up">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <StatusIcon status={exec.status} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold truncate">{exec.agentName}</p>
                    <span className={`flex-shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded-full
                      ${exec.status === 'success' ? 'bg-accent/10 text-accent' :
                        exec.status === 'failed'  ? 'bg-danger/10 text-danger' :
                        'bg-secondary/10 text-secondary'}`}>
                      {exec.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Action + amount */}
                  <p className="text-xs text-muted mb-2">
                    {ACTION_LABELS[exec.action]} ·{' '}
                    <span className="font-mono text-text">{exec.amount} SOL</span>
                    {' '}@ <span className="font-mono">${exec.price.toFixed(2)}</span>
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted/70">
                      {formatTime(exec.timestamp)}
                    </span>

                    {exec.txHash && exec.txHash !== 'alert-only' ? (
                      <a
                        href={explorerLink(exec.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80
                                   font-mono transition-colors"
                      >
                        {shortHash(exec.txHash)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : exec.txHash === 'alert-only' ? (
                      <span className="text-xs text-muted/60 font-mono">alert sent</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
