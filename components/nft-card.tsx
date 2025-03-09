"use client"
import React from "react";
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
import { TokenizedProductNFT } from "@/types";

const NFTCard = ({ nft }: { nft: TokenizedProductNFT }) => {
    const { address } = useAccount()
    const { writeContract, isPending } = useWrite({ contract: "Nft" });

    return (
        <Card
            className="w-72 overflow-hidden bg-foreground transition-all hover:shadow-lg"
            radius="lg"
            shadow="sm"
        >
            {/* NFT Image */}
            <CardHeader className="relative h-56 w-full">
                <Image
                    src={nft.imageUrl}
                    alt={nft.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge
                    variant="solid"
                    color="primary"
                    className=" absolute top-2 border-0 outline-0"
                    content={nft.rarity}
                    placement="top-right"
                >
                    <div className=" h-52 w-8 ">
                        
                    </div>
                </Badge>
            </CardHeader>

            {/* Card Content */}
            <CardBody className="p-4">
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900">{nft.name}</h3>
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
                        <p className="text-gray-600">Price</p>
                        <p className="font-medium">{nft.price} ETH</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">Edition</p>
                        <p className="font-medium">
                            {nft.edition}/{nft.totalEditions}
                        </p>
                    </div>
                </div>
                <Spacer y={3} />

                {/* Purchase Button */}
                
            </CardBody>
            <CardFooter>
                    <Button
                        onPress={() => (3)}
                        disabled={isPending || !address}
                        color="primary"
                        className="w-full"
                        isLoading={isPending}
                    >
                        {isPending ? "Processing" : "Buy Now"}
                    </Button>
                </CardFooter>
        </Card>
    );
};


export default NFTCard;