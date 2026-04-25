import type { Metadata } from 'next';
import './globals.css';
import { SolanaProviders } from './providers';

export const metadata: Metadata = {
  title:       'HELM — Navigate Solana DeFi Automatically',
  description: 'Non-custodial intent execution on Solana. Set conditions. HELM executes real Jupiter swaps automatically. Your keys never leave Phantom.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <SolanaProviders>
          {children}
        </SolanaProviders>
      </body>
    </html>
  );
}
