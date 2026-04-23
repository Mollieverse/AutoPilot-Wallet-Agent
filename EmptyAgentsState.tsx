'use client';
import { Bot, Plus, Zap } from 'lucide-react';

interface Props {
  onCreateClick: () => void;
}

export function EmptyAgentsState({ onCreateClick }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50
                    flex flex-col items-center justify-center py-14 px-6 text-center
                    animate-fade-in">
      {/* Animated icon */}
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20
                        flex items-center justify-center">
          <Bot className="w-8 h-8 text-primary/70" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card-2 border border-border
                        flex items-center justify-center">
          <Zap className="w-2.5 h-2.5 text-accent" />
        </div>
      </div>

      <h3 className="font-bold text-base mb-2">No Agents Yet</h3>
      <p className="text-sm text-muted mb-6 max-w-xs leading-relaxed">
        Create your first automation agent. It will monitor the market
        and execute trades automatically when conditions are met.
      </p>

      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                   bg-gradient-to-r from-primary to-secondary text-white
                   font-semibold text-sm hover:opacity-90 transition-all
                   shadow-lg shadow-primary/20 active:scale-95"
      >
        <Plus className="w-4 h-4" />
        Create First Agent
      </button>
    </div>
  );
}
