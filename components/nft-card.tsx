"use client"
import React, { useContext, useState } from "react";
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
import { useAccount, useChainId } from "wagmi";
import { heroui } from "@heroui/theme";
import { TokenizedProductNFT } from "@/types";
import clsx from "clsx";
import { storeContext } from "@/context/store";
import { parseEther } from "viem";
import { deployedContracts } from "@/contracts";
import { config } from "@/config/wagmi";

const NFTCard = ({ nft }: { nft: TokenizedProductNFT }) => {
    const { address } = useAccount()
    const { writeAsync, isPending } = useWrite({ contract: "MarketPlace" });
    const { writeAsync:writeApprove, isPending:isPendingApprove } = useWrite({ contract: "Nft" });
    const [loading, setLoading] = useState(false)
    const storeState = useContext(storeContext);
    console.log(storeState?.shop)
    const id = useChainId({config:config})

    const listProductMutation = useMutation({
        mutationFn: async () => {
            await writeApprove({
                functionName:"approve",
                args:[deployedContracts[id].CropMarketplace.address, nft.id]
            })
            const data = await writeAsync({
                functionName:"list_for_sale",
                args:[BigInt(nft.id), BigInt(Number(nft.price).toFixed(0)), deployedContracts[id].CropNft.address],
                
            })
            console.log(data)
            return data
        },
        onSuccess: async (data) => {
            // Handle successful Product creation
            console.log('Product created:', data);
            
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
                <h3 className="text-lg text-white font-semibold ">{nft.name} #{nft.id}</h3>
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
                        <p className="font-medium">{Number(nft.price).toFixed(2)} Eth</p>
                    </div>
                    <div className="text-right">
                        <p className="">Shop</p>
                        <p className="font-medium">
                            {storeState?.shop?.id}/{storeState?.shop?.owner}
                        </p>
                    </div>
                </div>
                <Spacer y={3} />

                {/* Purchase Button */}
                
            </CardBody>
            <CardFooter>
                    <Button
                        onPress={() => listProductMutation.mutateAsync()}
                        disabled={isPending || !address}
                        style={{color:nft.bgcolor!, background:"white"}}
                        className="w-full"
                        isLoading={isPending}
                    >
                        {isPending ? "Processing" : "List Now"}
                    </Button>
                </CardFooter>
        </Card>
    );
};


export default NFTCard;