import { Chain } from '@wagmi/core';
import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { createPublicClient, http } from 'viem';

export const tomoTestnet = {
  id: 89,
  name: 'Viction Testnet',
  network: 'victionTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.viction.xyz'],
      webSocket: ['wss://ws-testnet.viction.xyz'],
    },
    public: {
      http: ['https://rpc-testnet.viction.xyz'],
      webSocket: ['wss://ws-testnet.viction.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'VicScan', url: 'https://testnet.vicscan.xyz' },
  },
} as const satisfies Chain;

export const victionTestnet = {
  id: 89,
  name: 'Viction Testnet',
  network: 'victionTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.viction.xyz'],
      webSocket: ['wss://ws-testnet.viction.xyz'],
    },
    public: {
      http: ['https://rpc-testnet.viction.xyz'],
      webSocket: ['wss://ws-testnet.viction.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'VicScan', url: 'https://testnet.vicscan.xyz' },
  },
} as const satisfies Chain;

/**
 * Init VIC client
 */
const configsVictionChain = configureChains(
  [tomoTestnet, victionTestnet],
  [publicProvider()],
);
const publicClient = createPublicClient({
  chain: tomoTestnet,
  transport: http(),
});

const publicVictionClient = createPublicClient({
  chain: victionTestnet,
  transport: http(),
});
export { configsVictionChain, publicClient, publicVictionClient };
