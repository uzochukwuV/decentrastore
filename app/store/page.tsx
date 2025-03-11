"use client"
import { Store } from "@/components/store";
import { storeContext } from "@/context/store";
import { deployedContracts } from "@/contracts";
import { StoreData, TokenizedProductNFT } from "@/types";
import { useRead } from "@/utils/readContract";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

  const StorePage: React.FC = () => {
    const {address} = useAccount();
    const [storeId, setStoreId] = useState<string|null>(null)
    const storeState = useContext(storeContext);
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
      queryKey: ['store-1'],
      queryFn: async () => {
        if(!storeUri) return null;
        const data = await fetch("api/get_data", {
          method:"POST",
          body :JSON.stringify({id:storeUri})
        })
        return (await data.json()).data.data
      },
    })

    useEffect(() => {
      if(storeUri && !data){
  
        refetch()
      }else {
        
      }
      console.log({id:store?.toString(), ...data})
      storeState?.setShop({id:store?.toString(), ...data})
     
    }, [data, storeUri, isFechingStore])
      if(!address){
      return <div className=" fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30">
        <Button>Connect Wallet</Button>
      </div>
    
    }
    if(errStore || !store) return <div className=" fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30">No Store..</div>
    
    if(isLoading || isFechingStoreUri ) return <div className=" fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30">Getting Store..</div>
    return <>
    {
      data && <Store id={store.toString()} store={{id:store?.toString(), ...data}} isLoading={isLoading} />
    }
    </>
  };
  
  export default StorePage;