import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, electroneumTestnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { defineChain } from 'viem'

// Define Electroneum chain
const electroneumTest = defineChain({
  id: 5_201_420, // Custom Chain ID for Electroneum
  name: "Electroneum Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Electroneum",
    symbol: "ETN",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/electroneum_testnet"], // Replace with actual RPC URL if different
    },
    public: {
      http: ["https://rpc.ankr.com/electroneum_testnet"],
    },
  },
  blockExplorers: {
    default: { name: "ETN Explorer", url: "https://blockexplorer.electroneum.com" },
  },
  contracts:{},
  testnet:true,
})

export const config = createConfig({
  chains: [ electroneumTest],
  connectors:[
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {

    [electroneumTestnet.id]: http(),
  },
})