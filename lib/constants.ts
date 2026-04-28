export const SOLANA_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT ||
  'https://api.devnet.solana.com';

export const IS_MAINNET = !SOLANA_RPC_ENDPOINT.includes('devnet');

export const EXPLORER_BASE    = 'https://explorer.solana.com/tx';
export const EXPLORER_CLUSTER = IS_MAINNET ? '' : '?cluster=devnet';

export const SOL_MINT  = 'So11111111111111111111111111111111111111112';
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Jupiter CDN — covers every token including meme coins
const JUPITER_LOGO = (mint: string) =>
  `https://img.jup.ag/tokens/${mint}`;

export const SOLANA_TOKENS = [
  {
    id:     'solana',
    symbol: 'SOL',
    name:   'Solana',
    mint:   SOL_MINT,
    logo:   JUPITER_LOGO(SOL_MINT),
  },
  {
    id:     'jito-governance-token',
    symbol: 'JTO',
    name:   'Jito',
    mint:   'jtojtomepa8beP8AuQc6eXt5FriJwfFMwjx2ZEMxHMU',
    logo:   JUPITER_LOGO('jtojtomepa8beP8AuQc6eXt5FriJwfFMwjx2ZEMxHMU'),
  },
  {
    id:     'raydium',
    symbol: 'RAY',
    name:   'Raydium',
    mint:   '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    logo:   JUPITER_LOGO('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'),
  },
  {
    id:     'bonk',
    symbol: 'BONK',
    name:   'Bonk',
    mint:   'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    logo:   JUPITER_LOGO('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
  },
  {
    id:     'dogwifcoin',
    symbol: 'WIF',
    name:   'dogwifhat',
    mint:   'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    logo:   JUPITER_LOGO('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'),
  },
  {
    id:     'jupiter-exchange-solana',
    symbol: 'JUP',
    name:   'Jupiter',
    mint:   'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    logo:   JUPITER_LOGO('JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'),
  },
  {
    id:     'pyth-network',
    symbol: 'PYTH',
    name:   'Pyth Network',
    mint:   'HZ1JovNiVvGrG1jnrqCMQmxuExbzB3FKha4FszS5T6Hh',
    logo:   JUPITER_LOGO('HZ1JovNiVvGrG1jnrqCMQmxuExbzB3FKha4FszS5T6Hh'),
  },
  {
    id:     'render-token',
    symbol: 'RENDER',
    name:   'Render',
    mint:   'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
    logo:   JUPITER_LOGO('rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof'),
  },
  {
    id:     'helium',
    symbol: 'HNT',
    name:   'Helium',
    mint:   'hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux',
    logo:   JUPITER_LOGO('hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux'),
  },
  {
    id:     'orca-so',
    symbol: 'ORCA',
    name:   'Orca',
    mint:   'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
    logo:   JUPITER_LOGO('orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE'),
  },
  {
    id:     'marinade',
    symbol: 'MNDE',
    name:   'Marinade',
    mint:   'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey',
    logo:   JUPITER_LOGO('MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey'),
  },
  {
    id:     'drift-protocol',
    symbol: 'DRIFT',
    name:   'Drift',
    mint:   'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
    logo:   JUPITER_LOGO('DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7'),
  },
  {
    id:     'popcat',
    symbol: 'POPCAT',
    name:   'Popcat',
    mint:   '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    logo:   JUPITER_LOGO('7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr'),
  },
  {
    id:     'stepn',
    symbol: 'GMT',
    name:   'STEPN',
    mint:   '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx',
    logo:   JUPITER_LOGO('7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx'),
  },
  {
    id:     'nosana',
    symbol: 'NOS',
    name:   'Nosana',
    mint:   'nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7',
    logo:   JUPITER_LOGO('nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7'),
  },
  {
    id:     'tensor',
    symbol: 'TNSR',
    name:   'Tensor',
    mint:   'TNSRxcUxoT9xBG3de7A4n3CGe8uUKa4Ohe7i7MLBQm',
    logo:   JUPITER_LOGO('TNSRxcUxoT9xBG3de7A4n3CGe8uUKa4Ohe7i7MLBQm'),
  },
  {
    id:     'kamino',
    symbol: 'KMNO',
    name:   'Kamino',
    mint:   'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS',
    logo:   JUPITER_LOGO('KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS'),
  },
  {
    id:     'myro',
    symbol: 'MYRO',
    name:   'Myro',
    mint:   'HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4',
    logo:   JUPITER_LOGO('HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4'),
  },
  {
    id:     'cat-in-a-dogs-world',
    symbol: 'MEW',
    name:   'MEW',
    mint:   '3s3WCMbKm7jBBr6J5fZCdPvFWJncHFLyBxgA1h8ANYA3',
    logo:   JUPITER_LOGO('3s3WCMbKm7jBBr6J5fZCdPvFWJncHFLyBxgA1h8ANYA3'),
  },
  {
    id:     'parcl',
    symbol: 'PRCL',
    name:   'Parcl',
    mint:   '4LLbsb5ReP3yEtYzmXewyGjcir5uXtKFURtaEUVC2AHs',
    logo:   JUPITER_LOGO('4LLbsb5ReP3yEtYzmXewyGjcir5uXtKFURtaEUVC2AHs'),
  },
];
