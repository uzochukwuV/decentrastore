"use client"
import { Store } from "@/components/store";
import { deployedContracts } from "@/contracts";
import { StoreData, TokenizedProductNFT } from "@/types";
import { useRead } from "@/utils/readContract";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useImperativeHandle, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

  const StorePage: React.FC = () => {
    const {address} = useAccount();
    const [storeId, setStoreId] = useState<string|null>(null)
    const {data:store, error:errStore, isFetching:isFechingStore } = useRead({
      contract:"Store",
      functionName:"getUserStore",
      args:[address],
    })

    const {data:storeUri, error:errStoreUri, isFetching:isFechingStoreUri } = useRead({
      contract:"Store",
      functionName:"tokenURI",
      args:[store],
    })

    const {data, refetch, isLoading } = useQuery({
      queryKey: ['store'],
      queryFn: async () => {
        const data = await fetch("api/get_data", {
          method:"POST",
          body :JSON.stringify({id:storeUri})
        })
        return (await data.json()).data.data
      },
    })

    useEffect(() => {
      if(storeUri && !data){
        console.log(storeUri, data)
        refetch()
      }else {
        console.log(storeUri, data)
      }
     
    }, [data, storeUri, isFechingStore])
    
   
    if(isLoading || isFechingStoreUri ) return <div className=" fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30">Getting Store..</div>
    return <Store store={data} isLoading={isLoading} />;
  };
  
  export default StorePage;