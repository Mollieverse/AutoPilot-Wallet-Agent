# 🤖 AutoPilot Wallet Agent

An AI-powered Solana wallet automation MVP. Deploy agents that monitor
on-chain conditions and execute transactions automatically.

Built with: **Next.js 14 · Tailwind CSS · Solana Wallet Adapter · web3.js**

---

## ⚡ Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` — by default it uses Devnet (safe, no real funds):

```
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🦊 Wallet Setup (Phantom)

1. Install [Phantom](https://phantom.app/) browser extension
2. Create a new wallet **OR** switch to Devnet in Phantom settings:
   - Phantom → Settings → Developer Settings → Testnet Mode (or manually set RPC)
3. Get free devnet SOL from the faucet:
   ```
   https://faucet.solana.com/
   ```
   Paste your wallet address and request 2 SOL.

---

## 🎯 Demo Flow (2 minutes)

1. **Connect Wallet** → click "Connect Wallet" → approve in Phantom
2. **View Balance** → SOL balance + live USD price appear automatically
3. **Create Agent** → "New Agent" → pick condition ("Always (demo)") → Deploy
4. **Trigger Agent** → click ⚡ "Trigger Agent" in header OR on the card
5. **Sign Transaction** → Phantom popup appears → Approve
6. **See Result** → Execution log shows tx hash + Devnet Explorer link

---

## 📁 Project Structure

```
autopilot-wallet/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Main dashboard (all tabs)
│   ├── globals.css         # Global styles
│   ├── providers.tsx       # Solana wallet adapter providers
│   └── api/
│       └── price/
│           └── route.ts    # Mock SOL price API (random walk)
│
├── components/
│   ├── WalletButton.tsx    # Connect/disconnect wallet UI
│   ├── BalanceCard.tsx     # SOL balance + sparkline
│   ├── AgentCard.tsx       # Single agent rule display
│   ├── CreateAgentModal.tsx # New agent form
│   ├── ExecutionLog.tsx    # Transaction history
│   ├── MarketCard.tsx      # Mock market data
│   ├── BottomNav.tsx       # Mobile tab bar
│   ├── Sidebar.tsx         # Desktop sidebar
│   ├── StatsBar.tsx        # Quick stats grid
│   ├── EmptyAgentsState.tsx # Empty state UI
│   └── SettingsPanel.tsx   # Network + app info
│
├── hooks/
│   ├── useWalletBalance.ts  # SOL balance fetcher
│   ├── useSolPrice.ts       # Price polling hook
│   └── useAgentEngine.ts    # Core automation engine
│
├── lib/
│   ├── types.ts            # Shared TypeScript types
│   ├── constants.ts        # Labels, config constants
│   └── solana.ts           # web3.js utilities
│
├── .env.local              # Environment config
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🏗️ Architecture

### Agent Engine (`hooks/useAgentEngine.ts`)

- Runs a `setInterval` loop every 8 seconds
- Evaluates each active agent's condition against live price data
- When condition is met → builds a real Solana transaction
- Uses `sendTransaction` from Wallet Adapter → prompts Phantom signature
- Confirms on-chain and logs the result

### Price API (`app/api/price/route.ts`)

- Simple Next.js API route with random-walk price simulation
- Returns `{ current, change24h, history[] }`
- Polled every 6 seconds by `useSolPrice` hook
- Replace with CoinGecko / Birdeye / Jupiter in production

### Transaction Flow

```
Agent condition met
  → buildDemoTransaction() — self-transfer of 1000 lamports (dust)
  → sendTransaction()      — Phantom popup
  → connection.confirmTransaction()
  → log execution with tx hash
  → link to Devnet Explorer
```

---

## 🔧 Upgrading to Production

| Feature | MVP | Production |
|---------|-----|------------|
| Price data | Mock random walk | CoinGecko / Birdeye API |
| Transactions | Self-transfer (dust) | Real swap via Jupiter |
| Agent storage | React state | Supabase / Redis |
| Network | Devnet | Mainnet with paid RPC |
| Auth | Wallet only | Optional Civic / auth |

---

## 🌐 Deploy to Vercel

```bash
npm run build
vercel --prod
```

Set `NEXT_PUBLIC_SOLANA_RPC_ENDPOINT` in Vercel environment variables.

---

## 📄 License

MIT — built for hackathon demonstration purposes.
