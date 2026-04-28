'use client';
import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface ParsedIntent {
  token:     string;
  condition: string;
  action:    string;
  amount:    string;
  summary:   string;
}

const EXAMPLES = [
  'Buy SOL if price drops 10%',
  'Sell BONK after 20% gain',
  'Buy $50 JUP every Monday',
  'Exit WIF if liquidity crashes',
  'Rebalance to 60% SOL weekly',
];

interface Props {
  onIntentParsed: (intent: ParsedIntent) => void;
}

export function NLIntentBox({ onIntentParsed }: Props) {
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [parsed,  setParsed]  = useState<ParsedIntent | null>(null);
  const [error,   setError]   = useState('');

  const parseIntent = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setParsed(null);

    try {
      const res = await fetch('/api/parse-intent', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ intent: input }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setParsed(data);
    } catch (err) {
      setError('Could not parse intent. Try being more specific.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h2 className="font-bold text-sm">Tell HELM What You Want</h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                parseIntent();
              }
            }}
            placeholder='e.g. "Buy SOL if price drops 10%" or "Sell BONK at 20% profit"'
            rows={3}
            className="w-full px-4 py-3 pr-12 rounded-xl bg-card-2 border border-border
                       text-sm resize-none focus:outline-none focus:border-primary/60
                       transition-colors placeholder-muted/50 leading-relaxed"
          />
          <button
            onClick={parseIntent}
            disabled={loading || !input.trim()}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-lg
                       bg-primary flex items-center justify-center
                       disabled:opacity-40 transition-all hover:bg-primary/80
                       active:scale-95"
          >
            {loading
              ? <Loader2 className="w-4 h-4 text-white animate-spin" />
              : <ArrowRight className="w-4 h-4 text-white" />
            }
          </button>
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="text-xs px-3 py-1.5 rounded-full bg-card-2 border border-border
                         text-muted hover:text-text hover:border-primary/30
                         transition-all"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-danger bg-danger/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Parsed result */}
        {parsed && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20
                          space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-bold text-primary">Intent Parsed</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'Token',     value: parsed.token     },
                { label: 'Condition', value: parsed.condition  },
                { label: 'Action',    value: parsed.action     },
                { label: 'Amount',    value: parsed.amount     },
              ].map(({ label, value }) => (
                <div key={label} className="bg-card-2 rounded-lg p-2">
                  <p className="text-muted mb-0.5">{label}</p>
                  <p className="font-semibold text-text">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted italic">"{parsed.summary}"</p>
            <button
              onClick={() => onIntentParsed(parsed)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary
                         to-secondary text-white text-sm font-bold hover:opacity-90
                         transition-all active:scale-[0.98]"
            >
              Deploy This Intent
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
