"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { Spacer } from "@heroui/spacer";
import { Tooltip } from "@heroui/tooltip";
import { Avatar } from "@heroui/avatar";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { useWrite } from "@/utils/writeContract";
import { useAccount } from "wagmi";
import { heroui } from "@heroui/theme";
import { ProductTransaction, TokenizedProductNFT } from "@/types";
import clsx from "clsx";
import { useRead } from "@/utils/readContract";
import { deployedContracts } from "@/contracts";
import { parseEther } from "viem";

const NFTBuyCard = ({ nft }: { nft: TokenizedProductNFT }) => {
    const { address } = useAccount()
    
    const [nftTx, setTx] = useState<ProductTransaction>()
    const [loading, setLoading] = useState(false)
    const {data, isFetching, refetch} = useRead({contract:"MarketPlace", functionName:"get_stock_data", args:[nft.id]})
    const { writeAsync, isPending } = useWrite({ contract: "MarketPlace" });
   

    const buyProductMutation = useMutation({
        mutationFn: async () => {
           
            const data = await writeAsync({
                functionName:"payForStock",
                args:[BigInt(nft.id)],
                value:parseEther(BigInt(Number(nftTx?.price).toFixed(0)).toString())
                
            })
            console.log(data)
            return data
        },
        onSuccess: async (data) => {
            // Handle successful Product creation
            console.log('Product bougth:', data);
            
            // You might want to redirect or show a success message
            addToast({
                title: "Successful",
                description: `Transaction Id ${data}`,
                severity:"success"
              });
              setLoading(false)

            
        },
        onError: (error) => {
            setLoading(false)
            // Handle error
            console.error('Error creating Product:', error);
            // You might want to show an error message
            addToast({
                title: "Declined",
                description: "Some Error Ocurred",
                severity:"danger"
              });
        },
    });

    useEffect(()=>{
        if(!nft.id){
            refetch()
        }
        console.log(data)
        setTx(data as any)
    })
    return (
        <Card
            className="w-72 overflow-hidden transition-all hover:shadow-lg"
            radius="lg"
            shadow="sm"
            style={{background:nft.bgcolor!}}
        >
            {/* NFT Image */}
            <CardHeader className="relative h-56 w-full">
                <Image
                    src={nft.image_url}
                    alt={nft.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge
                    variant="solid"
                    
                    className=" absolute top-2 border-0 outline-0"
                    content={nft.category}
                    placement="top-right"
                >
                    <div className=" h-52 w-8 ">
                        
                    </div>
                </Badge>
            </CardHeader>

            {/* Card Content */}
            <CardBody className={clsx("px-4", `bg-[${nft.bgcolor}]`)}>
                {/* Name */}
                <h3 className="text-lg text-white font-semibold ">{nft.name}</h3>
                <Spacer y={1} />

                {/* Collection and Creator */}
                <div className="flex items-center justify-between">
                    <Chip variant="flat" color="primary" size="sm">
                        {nft.category}
                    </Chip>
                    <Tooltip content={`Merchant: ${nft.owner}`}>
                        <Avatar
                            src={nft.ownerAvatar}
                            size="sm"
                            className="cursor-pointer"
                        />
                    </Tooltip>
                </div>
                <Spacer y={2} />

                {/* Price and Edition */}
                <div className="flex justify-between text-sm text-background">
                    <div>
                        <p className="">Price</p>
                        <p className="font-medium">{nftTx?.price} eth</p>
                    </div>
                    <div className="text-right">
                        <p className="">Shop</p>
                        <p className="font-medium">
                            showShop
                        </p>
                    </div>
                </div>
                <Spacer y={3} />

                {/* Purchase Button */}
                <div className="flex text-sm text-background">
                    {
                        nftTx?.payedFor && <div>
                       
                        <p className="font-medium">Payed</p>
                    </div>
                    }
                    {
                        nftTx?.buyerChecked && <div>
                       
                        <p className="font-medium">Buyer Marked</p>
                    </div>
                    }
                    {
                        nftTx?.sellerChecked && <div>
                       
                        <p className="font-medium">Seller Marked</p>
                    </div>
                    }
                </div>
                <Spacer y={3} />
            </CardBody>
            <CardFooter>
                {
                    nftTx?.payedFor ? <Button
                    onPress={() => (3)}
                    disabled={isPending || !address}
                    style={{color:nft.bgcolor!, background:"white"}}
                    className="w-full"
                    isLoading={isPending}
                >
                    {isPending ? "Processing" : "Mark as Delivered"}
                </Button>: nftTx?.owner == address ?<Button
                        onPress={() => (3)}
                        disabled
                        style={{color:nft.bgcolor!, background:"white"}}
                        className="w-full"
                        isLoading={isPending}
                    >
                        {isPending ? "Processing" : "Awaiting Payment"}
                    </Button> :<Button
                        onPress={() => buyProductMutation.mutateAsync()}
                        disabled={loading}
                        style={{color:nft.bgcolor!, background:"white"}}
                        className="w-full"
                        isLoading={isPending}
                    >
                        {isPending ? "Processing" : "Buy"}
                    </Button>
                }
                    
                </CardFooter>
        </Card>
    );
};


export default NFTBuyCard;