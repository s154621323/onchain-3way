import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'
import { defineChain } from 'viem'

const localhost = defineChain({
  id: 31337, // Hardhat 默认链 ID
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'], // 本地节点地址
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
})

export const config = createConfig(
  getDefaultConfig({
    appName: '数据上链 DApp',
    walletConnectProjectId: import.meta.env.VITE_WC_PROJECT_ID,
    chains: [sepolia, localhost],
    transports: {
      [sepolia.id]: http(),
      [localhost.id]: http(),
    },
  })
)

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}