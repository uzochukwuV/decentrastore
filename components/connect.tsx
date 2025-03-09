"use client"
import { Button } from '@heroui/button'
import { Connector, useAccount, useConnect } from 'wagmi'


export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const {address , isConnected} = useAccount()

  return isConnected ? <Button
  key={connectors[0].uid}
onPress={()=>connect({connector:connectors[0]})}
className="text-sm font-normal text-default-600 bg-success-200 "

variant="solid"
>
Connected
</Button> : <Button
        key={connectors[0].uid}
    onPress={()=>connect({connector:connectors[0]})}
  className="text-sm font-normal text-default-600 bg-default-100"
  variant="solid"
>
  Connect Wallet
</Button>
}