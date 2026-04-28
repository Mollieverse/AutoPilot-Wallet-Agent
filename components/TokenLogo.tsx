'use client';
import { useState, memo } from 'react';

interface Props {
  mint?:     string;
  logo?:     string;
  symbol:    string;
  size?:     'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-5 h-5 text-[8px]',
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
  xl: 'w-14 h-14 text-base',
};

// Gradient colors per symbol for beautiful fallbacks
function getGradient(symbol: string): string {
  const gradients = [
    'from-purple-500 to-blue-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-purple-500',
    'from-yellow-500 to-orange-500',
    'from-cyan-500 to-blue-500',
    'from-red-500 to-pink-500',
  ];
  const index = symbol.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export const TokenLogo = memo(function TokenLogo({
  mint,
  logo,
  symbol,
  size = 'md',
  className = '',
}: Props) {
  const [attempt, setAttempt] = useState(0);

  const sizeClass = SIZE_MAP[size];

  // Priority order of image sources
  const sources = [
    logo,
    mint ? `https://img.jup.ag/tokens/${mint}` : null,
    mint ? `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${mint}/logo.png` : null,
  ].filter(Boolean) as string[];

  const currentSrc = sources[attempt];

  const handleError = () => {
    if (attempt < sources.length - 1) {
      setAttempt(a => a + 1);
    } else {
      setAttempt(sources.length); // show fallback
    }
  };

  const showFallback = attempt >= sources.length || !currentSrc;

  if (!showFallback && currentSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={currentSrc}
        alt={symbol}
        onError={handleError}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
        loading="lazy"
      />
    );
  }

  // Beautiful gradient fallback
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br
                     ${getGradient(symbol)}
                     flex items-center justify-center font-bold
                     text-white flex-shrink-0 ${className}`}>
      {symbol.slice(0, 2).toUpperCase()}
    </div>
  );
});
