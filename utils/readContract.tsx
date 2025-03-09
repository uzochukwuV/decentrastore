"use client"
import { useAccount, useReadContract } from "wagmi"
import { deployedContracts } from "@/contracts"

export function useRead(
    {
        contract,
        args,
        functionName
    }:
        {
            contract: "MarketPlace" | "Nft" | "Store",
            args: any,
            functionName: any
        }) {
    const { address } = useAccount()
    const res = useReadContract({
        abi: contract == "MarketPlace" ?
            deployedContracts[5201420].CropMarketplace.abi : contract == "Store" ?
                deployedContracts[5201420].Store.abi :
                deployedContracts[5201420].CropNft.abi,
        address: contract == "MarketPlace" ?
            deployedContracts[5201420].CropMarketplace.address as `0x${string}` :
            contract == "Store" ? deployedContracts[5201420].Store.address as `0x${string}` :
                deployedContracts[5201420].CropNft.address as `0x${string}`,
        functionName: functionName,
        args: args,
        account:address,
        
    })
    return res;
}