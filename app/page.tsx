'use client';
import { useState, useCallback, memo } from 'react';
import { Plus, Zap, Bot, RefreshCw } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

import { Sidebar }          from '@/components/Sidebar';
import { BottomNav }        from '@/components/BottomNav';
import { WalletButton }     from '@/components/WalletButton';
import { BalanceCard }      from '@/components/BalanceCard';
import { AgentCard }        from '@/components/AgentCard';
import { CreateAgentModal } from '@/components/CreateAgentModal';
import { ExecutionLog }     from '@/components/ExecutionLog';
import { MarketCard }       from '@/components/MarketCard';
import { SettingsPanel }    from '@/components/SettingsPanel';
import { StatsBar }         from '@/components/StatsBar';
import { EmptyAgentsState } from '@/components/EmptyAgentsState';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { useSolPrice }      from '@/hooks/useSolPrice';
import { useAgentEngine }   from '@/hooks/useAgentEngine';
import { AgentRule }        from '@/lib/types';

interface AgentsSectionProps {
  agents: AgentRule[]; connected: boolean; processing: boolean;
  onPause: (id: string) => void; onDelete: (id: string) => void;
  onTrigger: (agent: AgentRule) => void; onCreate: () => void;
}

const AgentsSection = memo(function AgentsSection({
  agents, connected, processing, onPause, onDelete, onTrigger, onCreate,
}: AgentsSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h2 className="font-bold text-sm">Active Agents</h2>
          {agents.length > 0 && (
            <span className="font-mono text-xs text-muted bg-card-2 px-2 py-0.5 rounded-full border border-border">{agents.length}</span>
          )}
        </div>
        {connected && (
          <button onClick={onCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                       bg-primary/15 text-primary hover:bg-primary/25 transition-all border border-primary/20 active:scale-95">
            <Plus className="w-3.5 h-3.5" /> New Agent
          </button>
        )}
      </div>
      {!connected ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center py-10 px-6 text-center">
          <p className="text-sm text-muted mb-3">Connect your wallet to deploy agents</p>
          <WalletButton />
        </div>
      ) : agents.length === 0 ? (
        <EmptyAgentsState onCreateClick={onCreate} />
      ) : (
        <div className="space-y-3">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} onPause={onPause} onDelete={onDelete} onTrigger={onTrigger} processing={processing} />
          ))}
        </div>
      )}
    </div>
  );
});

export default function DashboardPage() {
  const { connected }                    = useWallet();
  const [activeTab, setActiveTab]        = useState('home');
  const [showCreateModal, setShowCreate] = useState(false);

  const { balance, loading: balLoading, refresh: refreshBalance } = useWalletBalance();
  const { price }  = useSolPrice();
  const { agents, executions, processing, addAgent, removeAgent, togglePause, triggerNow } =
    useAgentEngine({ price, onBalanceRefresh: refreshBalance });

  const successCount = executions.filter(e => e.status === 'success').length;
  const successRate  = executions.length > 0 ? (successCount / executions.length) * 100 : 100;
  const activeAgents = agents.filter(a => a.status === 'monitoring').length;

  const openCreate  = useCallback(() => setShowCreate(true),  []);
  const closeCreate = useCallback(() => setShowCreate(false), []);

  const handleCreateAgent = useCallback((data: Parameters<typeof addAgent>[0]) => {
    if (!connected) return;
    addAgent(data);
    closeCreate();
  }, [connected, addAgent, closeCreate]);

  const handleTriggerFirst = useCallback(() => {
    const first = agents.find(a => a.status === 'monitoring');
    if (first) triggerNow(first);
  }, [agents, triggerNow]);

  return (
    <div className="min-h-screen bg-bg bg-grid">
      <div className="flex min-h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} agentCount={activeAgents} />
        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-xl border-b border-border">
            <div className="flex items-center justify-between px-4 sm:px-6 h-14">
              <div className="flex items-center gap-2.5 lg:hidden">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">AutoPilot</span>
              </div>
              <div className="hidden lg:flex items-center gap-3">
                <h1 className="font-bold capitalize">{activeTab === 'home' ? 'Dashboard' : activeTab}</h1>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping-slow" />
                  <span className="text-[10px] font-mono font-bold text-accent uppercase">Live</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {connected && (
                  <button onClick={refreshBalance}
                    className={`p-2 rounded-lg hover:bg-card text-muted hover:text-text transition-all ${balLoading ? 'animate-spin' : ''}`}>
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <div className="lg:hidden"><WalletButton /></div>
                {connected && agents.length > 0 && (
                  <button onClick={handleTriggerFirst} disabled={processing}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                               bg-accent/15 text-accent hover:bg-accent/25 disabled:opacity-50
                               transition-all border border-accent/20 active:scale-95">
                    <Zap className="w-3.5 h-3.5" /> Trigger Agent
                  </button>
                )}
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 pb-24 lg:pb-8">
            {!connected && (
              <div className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">Welcome to AutoPilot Wallet</p>
                  <p className="text-xs text-muted mt-0.5">Connect your Phantom wallet to deploy automated agents on Solana.</p>
                </div>
                <WalletButton />
              </div>
            )}

            {activeTab === 'home' && (
              <div className="space-y-4 lg:space-y-5">
                <BalanceCard balance={balance} loading={balLoading} refresh={refreshBalance} price={price} />
                <StatsBar agentCount={activeAgents} execCount={executions.length} successRate={successRate} />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
                  <AgentsSection agents={agents} connected={connected} processing={processing}
                    onPause={togglePause} onDelete={removeAgent} onTrigger={triggerNow} onCreate={openCreate} />
                  <ExecutionLog executions={executions} />
                </div>
              </div>
            )}
            {activeTab === 'agents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">My Agents</h1>
                  {connected && (
                    <button onClick={openCreate}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                                 bg-gradient-to-r from-primary to-secondary text-white
                                 hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                      <Plus className="w-4 h-4" /> New Agent
                    </button>
                  )}
                </div>
                <AgentsSection agents={agents} connected={connected} processing={processing}
                  onPause={togglePause} onDelete={removeAgent} onTrigger={triggerNow} onCreate={openCreate} />
                {executions.length > 0 && <ExecutionLog executions={executions} />}
              </div>
            )}
            {activeTab === 'market' && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold lg:hidden">Market</h1>
                <MarketCard solHistory={price.history} />
              </div>
            )}
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
      {showCreateModal && <CreateAgentModal onClose={closeCreate} onCreate={handleCreateAgent} />}
    </div>
  );
                                             }
