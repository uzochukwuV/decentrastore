"use client"
import { Shop } from "@/types"
import {createContext, Dispatch, SetStateAction, useState} from "react"

interface ShopInterfce {
    shop:Shop|null;
    setShop: Dispatch<SetStateAction<Shop | null>>
}

export const storeContext = createContext<ShopInterfce|null>(null)


export const StoreProvider = ({children}:React.PropsWithChildren)=>{
    const [store, setStore]= useState<Shop|null>(null);

    return <storeContext.Provider value={{shop:store, setShop:setStore}}>
        {children}
    </storeContext.Provider>
}