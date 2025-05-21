"use client"
import { useAccount, useChainId, useReadContract, useWriteContract } from "wagmi"
import { deployedContracts } from "@/contracts"
import { config } from "@/config/wagmi"

export function useWrite(
    {
        contract,
        
    }:
    {
        contract: "MarketPlace" | "Nft"|"Store",
        
    }) {
    const { address } = useAccount()
    const {writeContractAsync, ...games} = useWriteContract({config:config})
    const id = useChainId({config: config})
    const writeAsync = async ({
        args,
        functionName,
        value,
    }:{
        args: any,
        functionName: any,
        value?:any
    })=>{
        return await writeContractAsync({
            abi: contract == "MarketPlace" ? deployedContracts[id].CropMarketplace.abi : contract == "Store" ? deployedContracts[id].Store.abi: deployedContracts[id].CropNft.abi,
            address: contract == "MarketPlace" ? deployedContracts[id].CropMarketplace.address as `0x${string}` : contract == "Store" ? deployedContracts[id].Store.address as `0x${string}`:deployedContracts[id].CropNft.address as `0x${string}`,
            account: address,
            functionName: functionName,
            args: args,
            value:value || 0,
            chainId: id
        })
    }
   return {
        writeAsync,
        ...games
   }
}