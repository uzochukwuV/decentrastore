"use client"
import { useAccount, useChainId, useReadContract } from "wagmi"
import { deployedContracts } from "@/contracts"
import { config } from "@/config/wagmi"

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
    const { address } = useAccount({config:config})
    const id = useChainId({config:config})
    const res = useReadContract({
        abi: contract == "MarketPlace" ?
            deployedContracts[id].CropMarketplace.abi : contract == "Store" ?
                deployedContracts[id].Store.abi :
                deployedContracts[id].CropNft.abi,
        address: contract == "MarketPlace" ?
            deployedContracts[id].CropMarketplace.address as `0x${string}` :
            contract == "Store" ? deployedContracts[id].Store.address as `0x${string}` :
                deployedContracts[id].CropNft.address as `0x${string}`,
        functionName: functionName,
        args: args,
        account:address,
        chainId: id
        
    })
    return res;
}