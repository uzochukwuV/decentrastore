
"use client"
import { useAccount, useReadContract, useReadContracts } from "wagmi"
import { deployedContracts } from "@/contracts"
import { useQuery } from "@tanstack/react-query"
import { useRead } from "./readContract"
import { formatListing } from "./lib"
import { useEffect } from "react"

import { addToast } from "@heroui/toast"


export function useNFTData(
    {
        ids,
        key
       
    }:
        {
            ids: bigint[],
            key:string
           
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
        queryKey: [key],
        queryFn: async () => {
            const data = fetchDataForIds(storeUri as any, ids)
            return (await data).map((item, i)=> {
                return {...item, id:formatListing(ids)[i]}
            });
        },
    })

    useEffect(()=>{
        
        if(errStoreUri){
            addToast({
                title:"Error Calling Store Contract",
                description:` error ${errStoreUri||""}`
            })
        }
        console.log(res)
        if(!isFechingStoreUri){
            res.refetch()
        }
    }, [errStoreUri,isFechingStoreUri])

    
    return res
}

const fetchDataForIds = async (ids: any, idList:any[]) => {
    console.log(ids)
    return Promise.all(
        ids.map(async (storeUri:any, i:number) => {
            const response = await fetch("api/get_data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: storeUri.result }),
            });

            const result = await response.json();
            
            const data = result.data?.data; // Ensure safe access
            console.log({id:idList[i], ...data})
            return {id:idList[i], ...data}
        })
    );
};