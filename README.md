# HELM Protocol

> Navigate Solana DeFi automatically — non-custodial intent execution on Solana.

---

## What Is HELM

HELM is a non-custodial intent execution layer built on Solana.

Users define financial conditions — *"buy SOL if it drops 5% from my entry price"* — and HELM agents automatically execute real Jupiter swaps when conditions are met.

No private keys shared. No Telegram bots. No manual trading. Your keys never leave Phantom.

---

## Live Demo

🚀 [helm-protocol.vercel.app](https://helm-protocol.vercel.app)

---

## The Problem

Solana retail users miss trades because they cannot monitor markets 24/7.

Telegram bots solve this but require your private key — a massive security risk. Multiple high-profile hacks have drained user wallets through compromised Telegram bots.

No simple, non-custodial automation exists on Solana. HELM fills that gap.

---

## The Solution
User sets intent:
"Buy SOL if it drops 5% from my entry price"
↓
HELM agent monitors price continuously
↓
Condition met → Jupiter swap executes
↓
Transaction signed in Phantom — your keys stay with you
↓
Result logged with tx hash on Solana Explorer
---

## Why Only Solana

- **Pyth 400ms price feeds** — 75x faster than any EVM oracle
- **Jupiter composable swaps** — deepest liquidity on Solana
- **Sub-second finality** — agents react before EVM chains confirm
- **State compression** — on-chain agent storage for fractions of a cent
- **Token Extensions** — permanent delegate for true autonomous execution
- **Solana Actions + Blinks** — shareable strategies as links

---

## Features

- ✅ Real Jupiter v6 swap execution on mainnet
- ✅ Non-custodial — keys never leave Phantom
- ✅ Any SPL token including pumpfun meme coins
- ✅ Entry price tracking with real PnL display
- ✅ Phantom and Solflare wallet support
- ✅ Mobile-first responsive design
- ✅ Deep link wallet connection for mobile
- ✅ Live price data from Jupiter Price API
- ✅ Execution log with Solana Explorer links
- ✅ Agent persistence via localStorage
- ✅20 popular Solana tokens pre-loaded
- ✅ Wallet token detection — any SPL token in your wallet

---

## Competitive Position

| Feature | HELM | Telegram Bots | Jupiter LO | Birdeye | Drift |
|---------|------|---------------|------------|---------|-------|
| Non-custodial | ✅ | ❌ | ✅ | ✅ | ⚠️ |
| Auto execution | ✅ | ✅ | ✅ | ❌ | ✅ |
| Meme coins | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| Mobile first | ✅ | ✅ | ❌ | ⚠️ | ❌ |
| % from entry | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Free to use | ✅ | ❌ | ✅ | ✅ | ✅ |

HELM is the **non-custodial alternative to Telegram trading bots** — same automation, same meme coin support, zero custody risk.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, Tailwind CSS |
| Wallet | Solana Wallet Adapter — Phantom, Solflare |
| Execution | Jupiter v6 Swap API |
| Blockchain | @solana/web3.js |
| Prices | Jupiter Price API, CoinGecko |
| Hosting | Vercel |

---

## Project Structure
helm-protocol/
├── app/
│   ├── api/
│   │   ├── price/route.ts           # SOL price feed
│   │   └── token-prices/route.ts    # Any SPL token price
│   ├── layout.tsx
│   ├── page.tsx                     # Landing + Dashboard
│   ├── globals.css
│   └── providers.tsx                # Wallet adapter
│
├── components/
│   ├── AgentCard.tsx                # Agent rule display
│   ├── BalanceCard.tsx              # SOL balance + sparkline
│   ├── BottomNav.tsx                # Mobile navigation
│   ├── CreateAgentModal.tsx         # Agent creation form
│   ├── EmptyAgentsState.tsx
│   ├── ExecutionLog.tsx             # Transaction history
│   ├── MarketCard.tsx               # Live market data
│   ├── SettingsPanel.tsx            # How it works + docs
│   ├── Sidebar.tsx                  # Desktop navigation
│   ├── StatsBar.tsx                 # Quick stats
│   └── WalletButton.tsx             # Connect wallet UI
│
├── hooks/
│   ├── useAgentEngine.ts            # Core agent loop
│   ├── useSolPrice.ts               # SOL price polling
│   ├── useWalletBalance.ts          # SOL balance fetcher
│   └── useWalletTokens.ts           # SPL token detection
│
├── lib/
│   ├── constants.ts                 # Token list + config
│   ├── solana.ts                    # Jupiter + web3 utils
│   └── types.ts                     # TypeScript types
│
├── .env.local                       # Environment config
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
---

## Quick Start

### 1. Clone

```bash
git clone https://github.com/Mollieverse/helm-protocol.git
cd helm-protocol
2. Install
npm install
3. Environment
cp .env.local.example .env.local
Add your RPC endpoint:
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
Get a free Helius key at helius.dev
4. Run
npm run dev
Open http://localhost:3000
Demo Flow (60 seconds)
Open helm-protocol.vercel.app
Tap Connect Wallet → approve in Phantom
Tap New Agent → set condition → Deploy
Tap ⚡ Trigger Agent in header
Approve transaction in Phantom
See result in Execution Log with tx hash
Roadmap
Now — v0.1 (Live)
Agent creation and monitoring
Jupiter mainnet execution
Any SPL token support
Mobile wallet connection
Next — v0.2
Supabase database — agents persist beyond browser
Railway worker — 24/7 server-side monitoring
Pyth on-chain price feeds — 400ms updates
Then — v0.3
DCA time-based triggers
Portfolio rebalancing
Slippage controls
Future — v1.0
Developer SDK — @helm/sdk
Solana Actions and Blinks
On-chain agent storage
Strategy marketplace
Environment Variables
Variable
Description
Required
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT
Solana RPC URL
Yes
Deploy
# Deploy to Vercel
vercel --prod
Set NEXT_PUBLIC_SOLANA_RPC_ENDPOINT in Vercel environment variables.
Why HELM
The captain sets the course.
HELM navigates the waters of Solana DeFi.
The captain never loses control of the ship.
You set the intent. HELM handles the execution. Your keys never leave your wallet.
License
MIT — built for the Solana ecosystem.
HELM Protocol — You set the course. HELM navigates Solana.
