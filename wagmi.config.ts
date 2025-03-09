// import { defineConfig } from '@wagmi/cli'
// import { react } from '@wagmi/cli/plugins'
// import { abi } from './path/to/your/contract/abi.json'

// export default defineConfig({
//   out: 'src/generated.ts',
//   plugins: [
//     react({
//       useContract: true,
//       useContractRead: true,
//       useContractWrite: true,
//     }),
//   ],
//   contracts: [
//     {
//       name: 'YourContract',
//       abi: abi,
//       address: {
//         // Add your contract addresses for different networks
//         1: '0x...', // mainnet
//         5: '0x...', // goerli
//       },
//     },
//   ],
// }) 