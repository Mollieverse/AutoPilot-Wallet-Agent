'use client';
import { useState, useMemo } from 'react';
import { X, Bot, Zap, Search, TrendingDown, TrendingUp, ChevronDown } from 'lucide-react';
import { ConditionType, Action, SolanaToken } from '@/lib/types';
import { SOLANA_TOKENS } from '@/lib/constants';

interface Props {
  onClose:  () => void;
  onCreate: (data: {
    name:          string;
    token:         SolanaToken;
    conditionType: ConditionType;
    conditionPct:  number;
    action:        Action;
    amount:        number;
  }) => void;
}

const ACTIONS: { value: Action; label: string; color: string }[] = [
  { value: 'buy',   label: '🟢 Buy',   color: 'border-accent/60 bg-accent/10 text-accent'       },
  { value: 'sell',  label: '🔴 Sell',  color: 'border-danger/60 bg-danger/10 text-danger'        },
  { value: 'alert', label: '🔔 Alert', color: 'border-secondary/60 bg-secondary/10 text-secondary' },
];

export function CreateAgentModal({ onClose, onCreate }: Props) {
  const [tokenSearch,    setTokenSearch]    = useState('');
  const [showTokenList,  setShowTokenList]  = useState(false);
  const [selectedToken,  setSelectedToken]  = useState<SolanaToken>(SOLANA_TOKENS[0]);
  const [conditionType,  setConditionType]  = useState<ConditionType>('price_drops');
  const [conditionPct,   setConditionPct]   = useState('5');
  const [action,         setAction]         = useState<Action>('buy');
  const [amount,         setAmount]         = useState('0.01');
  const [name,           setName]           = useState('');

  const autoName = `${selectedToken.symbol} ${conditionType === 'price_drops' ? 'Dip Buyer' : 'Moon Rider'}`;

  const filtered = useMemo(() =>
    SOLANA_TOKENS.filter(t =>
      t.symbol.toLowerCase().includes(tokenSearch.toLowerCase()) ||
      t.name.toLowerCase().includes(tokenSearch.toLowerCase()),
    ), [tokenSearch]);

  const handleSelectToken = (t: SolanaToken) => {
    setSelectedToken(t);
    setShowTokenList(false);
    setTokenSearch('');
  };

  const handleSubmit = () => {
    const pct = parseFloat(conditionPct);
    const amt = parseFloat(amount);
    if (isNaN(pct) || pct <= 0 || isNaN(amt) || amt <= 0) return;
    onCreate({
      name:          (name.trim() || autoName),
      token:         selectedToken,
      conditionType,
      conditionPct:  pct,
      action,
      amount:        amt,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:w-[500px] bg-card border border-border rounded-t-2xl
                      sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-base">Create Agent</h2>
              <p className="text-xs text-muted">Automate any Solana token</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-card-2 rounded-lg text-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 space-y-4">

          {/* Token selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">Token</label>
            <div className="relative">
              <button
                onClick={() => setShowTokenList(o => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                           bg-card-2 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30
                                  flex items-center justify-center text-xs font-bold font-mono">
                    {selectedToken.symbol.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{selectedToken.symbol}</p>
                    <p className="text-xs text-muted">{selectedToken.name}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform ${showTokenList ? 'rotate-180' : ''}`} />
              </button>

              {showTokenList && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-card border border-border
                                rounded-xl shadow-xl overflow-hidden">
                  <div className="p-2 border-b border-border">
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-card-2 rounded-lg">
                      <Search className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                      <input
                        autoFocus
                        value={tokenSearch}
                        onChange={e => setTokenSearch(e.target.value)}
                        placeholder="Search tokens..."
                        className="bg-transparent text-sm outline-none flex-1 placeholder-muted/50"
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filtered.length === 0 ? (
                      <div className="p-4 text-center text-xs text-muted">No tokens found</div>
                    ) : filtered.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectToken(t)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-card-2
                                   transition-colors text-left
                                   ${selectedToken.id === t.id ? 'bg-primary/10' : ''}`}
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30
                                        flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                          {t.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{t.symbol}</p>
                          <p className="text-xs text-muted">{t.name}</p>
                        </div>
                        {selectedToken.id === t.id && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">IF Condition</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {([
                { val: 'price_drops', label: 'Price Drops', Icon: TrendingDown, color: 'border-danger/50 bg-danger/10 text-danger' },
                { val: 'price_rises', label: 'Price Rises', Icon: TrendingUp,   color: 'border-accent/50 bg-accent/10 text-accent' },
              ] as const).map(({ val, label, Icon, color }) => (
                <button
                  key={val}
                  onClick={() => setConditionType(val)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border
                             text-sm font-semibold transition-all
                             ${conditionType === val ? color : 'border-border bg-card-2 text-muted hover:border-border/80'}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
            {/* Custom % input */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card-2 border border-border">
              <span className="text-sm text-muted flex-shrink-0">by</span>
              <input
                type="number"
                value={conditionPct}
                onChange={e => setConditionPct(e.target.value)}
                min="0.1"
                max="100"
                step="0.5"
                className="flex-1 bg-transparent text-center text-xl font-bold font-mono
                           outline-none text-text w-16"
              />
              <span className="text-xl font-bold text-muted flex-shrink-0">%</span>
            </div>
            <p className="text-xs text-muted text-center">
              Triggers when <span className="text-text font-semibold">{selectedToken.symbol}</span>{' '}
              {conditionType === 'price_drops' ? 'drops' : 'rises'}{' '}
              <span className="text-text font-semibold">{conditionPct || '?'}%</span> in 24h
            </p>
          </div>

          {/* Action */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">THEN Action</label>
            <div className="grid grid-cols-3 gap-2">
              {ACTIONS.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setAction(value)}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all
                    ${action === value ? color : 'border-border bg-card-2 text-muted hover:border-border/80'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">
              Amount (SOL)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="0.001"
                step="0.01"
                className="w-full px-3 py-2.5 pr-14 rounded-lg bg-card-2 border border-border
                           text-sm font-mono focus:outline-none focus:border-primary/60 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs font-mono">SOL</span>
            </div>
          </div>

          {/* Agent name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider">Agent Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={autoName}
              className="w-full px-3 py-2.5 rounded-lg bg-card-2 border border-border
                         text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Summary */}
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted leading-relaxed">
            <span className="text-primary font-semibold">Agent summary: </span>
            When <span className="text-text font-semibold">{selectedToken.symbol}</span>{' '}
            {conditionType === 'price_drops' ? 'drops' : 'rises'}{' '}
            <span className="text-text font-semibold">{conditionPct || '?'}%</span> in 24h →{' '}
            <span className="text-text font-semibold capitalize">{action}</span>{' '}
            <span className="text-text font-semibold">{amount || '?'} SOL</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border flex-shrink-0">
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-gradient-to-r from-primary to-secondary text-white font-bold
                       hover:opacity-90 transition-all active:scale-[0.98]
                       shadow-lg shadow-primary/20"
          >
            <Zap className="w-4 h-4" />
            Deploy Agent
          </button>
        </div>
      </div>
    </div>
  );
                        }
