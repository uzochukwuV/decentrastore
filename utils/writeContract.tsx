"use client"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { deployedContracts } from "@/contracts"

export function useWrite(
    {
        contract,
        
    }:
    {
        contract: "MarketPlace" | "Nft"|"Store",
        
    }) {
    const { address } = useAccount()
    const {writeContractAsync, ...games} = useWriteContract()
    const writeAsync = async ({
        args,
        functionName
    }:{
        args: any,
        functionName: any
    })=>{
        return await writeContractAsync({
            abi: contract == "MarketPlace" ? deployedContracts[5201420].CropMarketplace.abi : contract == "Store" ? deployedContracts[5201420].Store.abi: deployedContracts[5201420].CropNft.abi,
            address: contract == "MarketPlace" ? deployedContracts[5201420].CropMarketplace.address as `0x${string}` : contract == "Store" ? deployedContracts[5201420].Store.address as `0x${string}`:deployedContracts[5201420].CropNft.address as `0x${string}`,
            account: address,
            functionName: functionName,
            args: args
        })
    }
   return {
        writeAsync,
        ...games
   }
}