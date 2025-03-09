
"use client"
import { useAccount, useReadContract, useReadContracts } from "wagmi"
import { deployedContracts } from "@/contracts"
import { useQuery } from "@tanstack/react-query"
import { useRead } from "./readContract"
import { formatListing } from "./lib"
import { useEffect } from "react"
import { toast } from "@heroui/theme"
import { addToast } from "@heroui/toast"

export function useNFTData(
    {
        ids,
       
    }:
        {
            ids: bigint[],
           
        }) {
    const { data: storeUri, error: errStoreUri, isFetching: isFechingStoreUri } = useReadContracts({
        contracts: formatListing(ids).map((i) => {
            return {
                abi: deployedContracts[5201420].CropNft.abi,
                address: deployedContracts[5201420].CropNft.address as any,
                functionName: 'tokenURI',
                args: [i]
            }
        }) as any,
    })


    const res = useQuery({
        queryKey: ['store'],
        queryFn: async () => {
            const data = fetchDataForIds(storeUri as any)
            return data;
        },
    })

    useEffect(()=>{
        formatListing(ids)
        console.log(storeUri, res.data)
        if(errStoreUri){
            addToast({
                title:"Error Calling Store Contract",
                description:` error ${errStoreUri||""}`
            })
        }
        if(!isFechingStoreUri){
            res.refetch()
        }
    }, [errStoreUri,isFechingStoreUri])

    return res
}

const fetchDataForIds = async (ids: any) => {
    return Promise.all(
        ids.map(async (storeUri:any) => {
            const response = await fetch("api/get_data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: storeUri.result }),
            });
            alert(storeUri.result)

            const result = await response.json();
            console.log("result", result)
            return result.data?.data; // Ensure safe access
        })
    );
};