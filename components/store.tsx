"use client"

import NFTGrid from "@/components/nft-grid";
import { Shop, StoreData, TokenizedProductNFT } from "@/types";
import { useRead } from "@/utils/readContract";
import { Avatar } from "@heroui/avatar";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Spacer } from "@heroui/spacer";
import { Tab, Tabs } from "@heroui/tabs";
import { Tooltip } from "@heroui/tooltip";
import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount } from "wagmi";

  // Store Page Component
 export  const Store: React.FC<{ store: Shop, isLoading:boolean }> = ({ store, isLoading }) => {
  const {address } = useAccount()
  const {data:userListing, error:errUserListing, isFetching:isFechingUserListing } = useRead({
    contract:"MarketPlace",
    functionName:"get_user_listing",
    args:[BigInt(10),address],
  })

  const {data, error, isFetching } = useRead({
    contract:"Nft",
    functionName:"getAllUserNFT",
    args:[address],
  })

    console.log(userListing)
    if(isLoading) return "Loading"
    return (
      <div className="min-h-screen">
        {/* Store Banner */}
        <div className={clsx("relative h-64 w-full rounded-md", store!.bgcolor)} style={{background: store!.bgcolor.toString()}}>
          <Image
            src={store!.banner}
            alt={`${store!.name} Banner`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl font-bold ">{store!.name}</h1>
          </div>
        </div>
  
        {/* Store Info Section */}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8" radius="lg" shadow="sm">
            <div className="p-6 flex flex-col justify-center sm:flex-row items-center sm:items-start gap-6">
              <Avatar
                src={store!.ownerImage}
                size="lg"
                radius="full"
                className=" shadow-md"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold ">
                  About {store!.name}
                </h2>
                <Spacer y={1} />
                <p className="">{store!.description}</p>
                <Spacer y={2} />
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm ">Owned by:</span>
                  <Tooltip content={store!.owner}>
                    <Chip variant="bordered" color="primary" size="sm">
                      {store!.owner?.slice(0, 6)}...{store!.owner?.slice(-4)}
                    </Chip>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
  
          {/* Products Section */}
          <Tabs className="mb-6">
            <Tab value="products" title="Listed Products">
              <NFTGrid ids={userListing as bigint[]} isLoading={false} />
            </Tab>
            <Tab value="products" title="UnListed Products">
              <NFTGrid ids={data as bigint[]} isLoading={false} />
            </Tab>
            <Tab value="about" title="About Store">
              <Card className="p-6" radius="lg" shadow="sm">
                <h3 className="text-xl font-semibold ">Store Details</h3>
                <Spacer y={2} />
                <p className="">
                  {store!.name} is a premier destination for tokenized real-world goods. 
                  All items are authenticated, securely stored, and tradable as NFTs on the blockchain.
                </p>
                <Spacer y={2} />
                <p className="">
                  Contact us at: <a href={`mailto:support@${store!.name.toLowerCase()}.com`} className="text-primary underline">
                    support@{store!.name.toLowerCase()}.com
                  </a>
                </p>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  };
  