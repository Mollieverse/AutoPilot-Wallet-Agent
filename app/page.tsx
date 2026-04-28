'use client';

import { useState, useCallback, memo } from 'react';
import {
  Plus, Zap, Bot, RefreshCw,
  ArrowRight, Shield, Activity,
  ChevronRight, PieChart, BarChart2,
  Layers, Sparkles,
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

import { Sidebar }           from '@/components/Sidebar';
import { BottomNav }         from '@/components/BottomNav';
import { WalletButton }      from '@/components/WalletButton';
import { BalanceCard }       from '@/components/BalanceCard';
import { AgentCard }         from '@/components/AgentCard';
import { CreateAgentModal }  from '@/components/CreateAgentModal';
import { ExecutionLog }      from '@/components/ExecutionLog';
import { MarketPage }        from '@/components/MarketPage';
import { PortfolioPage }     from '@/components/PortfolioPage';
import { SettingsPanel }     from '@/components/SettingsPanel';
import { StatsBar }          from '@/components/StatsBar';
import { EmptyAgentsState }  from '@/components/EmptyAgentsState';
import { NLIntentBox }       from '@/components/NLIntentBox';
import { IntentTemplates }   from '@/components/IntentTemplates';
import { TokenLogo }         from '@/components/TokenLogo';
import { useWalletBalance }  from '@/hooks/useWalletBalance';
import { useSolPrice }       from '@/hooks/useSolPrice';
import { useAgentEngine }    from '@/hooks/useAgentEngine';
import { AgentRule }         from '@/lib/types';
import { SOLANA_TOKENS }     from '@/lib/constants';

// ─── Landing page ─────────────────────────────────────────────────────────────
function LandingPage() {
  const PARTNERS = [
    { name: 'Phantom',  logo: 'https://img.jup.ag/tokens/So11111111111111111111111111111111111111112' },
    { name: 'Jupiter',  logo: 'https://img.jup.ag/tokens/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' },
    { name: 'Pyth',     logo: 'https://img.jup.ag/tokens/HZ1JovNiVvGrG1jnrqCMQmxuExbzB3FKha4FszS5T6Hh' },
    { name: 'Raydium',  logo: 'https://img.jup.ag/tokens/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
    { name: 'Bonk',     logo: 'https://img.jup.ag/tokens/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  ];

  const INTENTS = [
    { text: 'Buy SOL if price drops 10%',     color: 'text-blue-400'   },
    { text: 'Sell BONK after 20% gain',       color: 'text-green-400'  },
    { text: 'Buy $50 JUP every Monday',       color: 'text-purple-400' },
    { text: 'Exit WIF if liquidity crashes',  color: 'text-red-400'    },
    { text: 'Rebalance to 60% SOL weekly',    color: 'text-yellow-400' },
    { text: 'Move USDC to highest yield',     color: 'text-cyan-400'   },
  ];

  const STEPS = [
    {
      icon:  '🔗',
      title: 'Connect Wallet',
      desc:  'Link Phantom or Solflare. HELM never holds funds.',
    },
    {
      icon:  '🎯',
      title: 'Define Intent',
      desc:  'Use templates or plain English to set your strategy.',
    },
    {
      icon:  '📡',
      title: 'HELM Monitors',
      desc:  'Agents watch markets 24/7 against your conditions.',
    },
    {
      icon:  '⚡',
      title: 'Auto-Executes',
      desc:  'Jupiter swaps fire when conditions are met. You approve in Phantom.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Glow orbs */}
      <div className="fixed top-20 left-1/4 w-96 h-96 rounded-full
                      bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-40 right-1/4 w-80 h-80 rounded-full
                      bg-secondary/6 blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-30 sticky top-0 bg-bg/80 backdrop-blur-xl
                         border-b border-border">
        <div className="flex items-center justify-between px-5 h-14 max-w-5xl
                        mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary
                            to-secondary flex items-center justify-center
                            shadow-lg shadow-primary/40">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-sm tracking-tight leading-none">
                HELM
              </p>
              <p className="text-[9px] text-muted leading-none uppercase tracking-widest">
                Protocol
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1
                            rounded-full bg-accent/10 border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping-slow" />
              <span className="text-[10px] font-mono font-bold text-accent">
                LIVE ON SOLANA
              </span>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>

      <div className="relative flex-1 max-w-4xl mx-auto w-full px-5">

        {/* Hero */}
        <div className="pt-16 pb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-primary/10 border border-primary/20 text-xs font-mono
                          font-bold text-primary">
            <Layers className="w-3 h-3" />
            THE INTENT LAYER FOR SOLANA
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold
                         leading-[1.1] tracking-tight">
            Tell HELM{' '}
            <span className="bg-gradient-to-r from-primary via-secondary
                             to-accent bg-clip-text text-transparent">
              what you want.
            </span>
            <br />
            HELM handles the rest.
          </h1>

          <p className="text-muted text-base sm:text-lg leading-relaxed
                        max-w-xl mx-auto">
            HELM monitors markets and executes trades when your conditions
            are met — while you keep full wallet custody. No bots.
            No private keys shared. Ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center
                          justify-center gap-3 pt-2">
            <WalletButton />
            <a href="#how"
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                          border border-border text-sm font-semibold text-muted
                          hover:text-text hover:border-primary/40 transition-all">
              How It Works
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-muted">
            No sign-up · Non-custodial · Free to use
          </p>
        </div>

        {/* Intent examples carousel */}
        <div className="rounded-2xl border border-border bg-card/80
                        backdrop-blur-sm p-5 mb-10">
          <p className="text-xs text-muted font-mono mb-4 uppercase tracking-wider">
            Examples of what you can tell HELM
          </p>
          <div className="space-y-2.5">
            {INTENTS.map((ex, i) => (
              <div key={i}
                   className="flex items-center gap-3 p-3 rounded-xl bg-card-2
                              border border-border hover:border-primary/30
                              transition-colors group cursor-default">
                <span className="text-base">→</span>
                <span className={`text-sm font-medium ${ex.color}`}>
                  "{ex.text}"
                </span>
                <Sparkles className="w-3.5 h-3.5 text-muted/40
                                     group-hover:text-primary ml-auto
                                     transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div id="how" className="mb-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <p className="text-xs font-bold text-muted uppercase tracking-widest px-3">
              How It Works
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STEPS.map((step, i) => (
              <div key={i}
                   className="flex gap-4 p-4 rounded-2xl bg-card border border-border
                              hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-card-2 flex items-center
                                justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold
                                     text-primary/50">
                      0{i + 1}
                    </span>
                    <p className="font-bold text-sm">{step.title}</p>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token logos showcase */}
        <div className="mb-10 space-y-4">
          <p className="text-xs font-bold text-muted uppercase tracking-wider
                        text-center">
            Supports Any Solana Token
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SOLANA_TOKENS.slice(0, 12).map(t => (
              <div key={t.id}
                   className="flex items-center gap-2 px-3 py-2 rounded-full
                              bg-card border border-border hover:border-primary/30
                              transition-colors">
                <TokenLogo mint={t.mint} logo={t.logo} symbol={t.symbol} size="xs" />
                <span className="text-xs font-mono font-bold text-muted">
                  {t.symbol}
                </span>
              </div>
            ))}
            <div className="flex items-center px-3 py-2 rounded-full bg-card
                            border border-border text-xs font-mono text-muted">
              + any meme coin
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { icon: <Shield   className="w-5 h-5" />, label: 'Non-custodial',
              desc: 'Your keys, always.',     color: 'text-primary' },
            { icon: <Bot      className="w-5 h-5" />, label: 'Multi-agent',
              desc: 'Run many at once.',      color: 'text-secondary' },
            { icon: <Activity className="w-5 h-5" />, label: 'Live data',
              desc: 'Real-time prices.',      color: 'text-accent' },
            { icon: <Zap      className="w-5 h-5" />, label: 'Jupiter swaps',
              desc: 'Best liquidity.',        color: 'text-warning' },
          ].map(f => (
            <div key={f.label}
                 className="p-4 rounded-2xl bg-card border border-border
                            hover:border-primary/20 transition-colors space-y-2">
              <div className={`${f.color}`}>{f.icon}</div>
              <p className="font-bold text-sm">{f.label}</p>
              <p className="text-xs text-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="mb-10 space-y-4">
          <p className="text-xs font-bold text-muted uppercase tracking-wider
                        text-center">
            Built On
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {PARTNERS.map(p => (
              <div key={p.name}
                   className="flex items-center gap-2 opacity-60
                              hover:opacity-100 transition-opacity">
                <TokenLogo mint={undefined} logo={p.logo} symbol={p.name} size="sm" />
                <span className="text-xs font-semibold text-muted">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pb-16 space-y-4">
          <div className="p-px rounded-2xl bg-gradient-to-r from-primary
                          via-secondary to-accent">
            <div className="bg-card rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-extrabold">
                Ready to navigate Solana DeFi automatically?
              </h2>
              <p className="text-muted text-sm">
                Connect your wallet and deploy your first intent in 60 seconds.
              </p>
              <WalletButton />
              <p className="text-xs text-warning">
                ⚠️ Running on Devnet — test SOL only, no real funds at risk
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Agents section ───────────────────────────────────────────────────────────
interface AgentsSectionProps {
  agents:     AgentRule[];
  connected:  boolean;
  processing: boolean;
  onPause:    (id: string) => void;
  onDelete:   (id: string) => void;
  onTrigger:  (agent: AgentRule) => void;
  onCreate:   () => void;
}

const AgentsSection = memo(function AgentsSection({
  agents, connected, processing,
  onPause, onDelete, onTrigger, onCreate,
}: AgentsSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h2 className="font-bold text-sm">Active Agents</h2>
          {agents.length > 0 && (
            <span className="font-mono text-xs text-muted bg-card-2 px-2
                             py-0.5 rounded-full border border-border">
              {agents.length}
            </span>
          )}
        </div>
        {connected && (
          <button
            onClick={onCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       text-xs font-semibold bg-primary/15 text-primary
                       hover:bg-primary/25 transition-all border
                       border-primary/20 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            New Agent
          </button>
        )}
      </div>

      {agents.length === 0 ? (
        <EmptyAgentsState onCreateClick={onCreate} />
      ) : (
        <div className="space-y-3">
          {agents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onPause={onPause}
              onDelete={onDelete}
              onTrigger={onTrigger}
              processing={processing}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// ─── Intents page ─────────────────────────────────────────────────────────────
function IntentsPage({
  agents, processing, onPause, onDelete, onTrigger, onCreate, connected,
}: AgentsSectionProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Intents</h1>
        {connected && (
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       text-sm font-semibold bg-gradient-to-r from-primary
                       to-secondary text-white hover:opacity-90 transition-all
                       shadow-lg shadow-primary/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Intent
          </button>
        )}
      </div>

      {/* NL Intent Box */}
      <NLIntentBox onIntentParsed={(parsed) => {
        // Open modal with pre-filled data — simplified for now
        onCreate();
      }} />

      {/* Templates */}
      <IntentTemplates onSelect={(template) => {
        onCreate();
      }} />

      {/* Active agents */}
      <AgentsSection
        agents={agents}
        connected={connected}
        processing={processing}
        onPause={onPause}
        onDelete={onDelete}
        onTrigger={onTrigger}
        onCreate={onCreate}
      />
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { connected }                    = useWallet();
  const [activeTab, setActiveTab]        = useState('home');
  const [showCreateModal, setShowCreate] = useState(false);

  const {
    balance, loading: balLoading, refresh: refreshBalance,
  } = useWalletBalance();

  const { price } = useSolPrice();

  const {
    agents, executions, processing,
    addAgent, removeAgent, togglePause, triggerNow,
  } = useAgentEngine({
    price:            price ?? { current: 0, change24h: 0, history: [] },
    onBalanceRefresh: refreshBalance,
  });

  const successCount = executions.filter(e => e.status === 'success').length;
  const successRate  = executions.length > 0
    ? (successCount / executions.length) * 100
    : 100;
  const activeAgents = agents.filter(a => a.status === 'monitoring').length;

  const openCreate  = useCallback(() => setShowCreate(true),  []);
  const closeCreate = useCallback(() => setShowCreate(false), []);

  const handleCreateAgent = useCallback(
    (data: Parameters<typeof addAgent>[0]) => {
      if (!connected) return;
      addAgent(data);
      closeCreate();
    },
    [connected, addAgent, closeCreate],
  );

  const handleTriggerFirst = useCallback(() => {
    const first = agents.find(a => a.status === 'monitoring');
    if (first) triggerNow(first);
  }, [agents, triggerNow]);

  if (!connected) return <LandingPage />;

  return (
    <div className="min-h-screen bg-bg bg-grid">
      <div className="flex min-h-screen">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          agentCount={activeAgents}
        />

        <main className="flex-1 min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-xl
                             border-b border-border">
            <div className="flex items-center justify-between px-4 sm:px-6 h-14">
              {/* Logo mobile */}
              <div className="flex items-center gap-2.5 lg:hidden">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary
                                to-secondary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">HELM</span>
              </div>

              {/* Title desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <h1 className="font-bold capitalize">
                  {activeTab === 'home'      ? 'Dashboard'  :
                   activeTab === 'intents'   ? 'My Intents' :
                   activeTab === 'portfolio' ? 'Portfolio'  :
                   activeTab === 'market'    ? 'Market'     :
                   'Settings'}
                </h1>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full
                                bg-accent/10 border border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent
                                   animate-ping-slow" />
                  <span className="text-[10px] font-mono font-bold text-accent
                                   uppercase">Live</span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshBalance}
                  className={`p-2 rounded-lg hover:bg-card text-muted
                              hover:text-text transition-all
                              ${balLoading ? 'animate-spin' : ''}`}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <div className="lg:hidden">
                  <WalletButton />
                </div>
                {agents.length > 0 && (
                  <button
                    onClick={handleTriggerFirst}
                    disabled={processing}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5
                               rounded-lg text-xs font-semibold bg-accent/15
                               text-accent hover:bg-accent/25 disabled:opacity-50
                               transition-all border border-accent/20 active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Trigger
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-4 sm:p-6 pb-24 lg:pb-8">

            {/* Home */}
            {activeTab === 'home' && (
              <div className="space-y-4 lg:space-y-5">
                <BalanceCard
                  balance={balance}
                  loading={balLoading}
                  refresh={refreshBalance}
                  price={price}
                />
                <StatsBar
                  agentCount={activeAgents}
                  execCount={executions.length}
                  successRate={successRate}
                />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
                  <AgentsSection
                    agents={agents}
                    connected={connected}
                    processing={processing}
                    onPause={togglePause}
                    onDelete={removeAgent}
                    onTrigger={triggerNow}
                    onCreate={openCreate}
                  />
                  <ExecutionLog executions={executions} />
                </div>
              </div>
            )}

            {/* Intents */}
            {activeTab === 'intents' && (
              <IntentsPage
                agents={agents}
                connected={connected}
                processing={processing}
                onPause={togglePause}
                onDelete={removeAgent}
                onTrigger={triggerNow}
                onCreate={openCreate}
              />
            )}

            {/* Portfolio */}
            {activeTab === 'portfolio' && (
              <PortfolioPage price={price} />
            )}

            {/* Market */}
            {activeTab === 'market' && (
              <MarketPage solHistory={price?.history ?? []} />
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold lg:hidden">Settings</h1>
                <SettingsPanel />
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {showCreateModal && (
        <CreateAgentModal onClose={closeCreate} onCreate={handleCreateAgent} />
      )}
    </div>
  );
             }
