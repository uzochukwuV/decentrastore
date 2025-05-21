"use client"
import { config } from '@/config/wagmi'
import { Button } from '@heroui/button'
import { sepolia } from 'viem/chains'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'


export function WalletOptions() {
  const { connectors, connectAsync, data} = useConnect({ config: config })
  const { address, isConnected } = useAccount()
  const {disconnect} = useDisconnect()

  return !isConnected ? connectors.map((c)=>{
    return <Button
    key={c.uid}
    onPress={() => connectAsync({ connector: c })}
    className="text-sm font-normal text-default-600 bg-success-200 "

    variant="solid"
  >
    Connect Wallet
  </Button> 
  }) : <Button
  
    onPress={() => disconnect()}
    className="text-sm font-normal text-default-600 bg-success-200 "

    variant="solid"
  >
    Connected
  </Button> 
}