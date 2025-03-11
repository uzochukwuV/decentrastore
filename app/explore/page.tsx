"use client"
import { title } from "@/components/primitives";
import NFTCard from "@/components/nft-card";
import { TokenizedProductNFT } from "@/types";
import NFTGrid from "@/components/nft-grid";
import { useRead } from "@/utils/readContract";
import { Skeleton } from "@heroui/skeleton";


export default function ExplorePage() {
  const {data, isFetching, refetch} = useRead({contract:"MarketPlace", functionName:"get_listings", args:[0, 9]})
  const RenderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
      ))}
    </div>
  );
  return (
    <div className=" space-y-8">
      <div className=" bg-orange-100 rounded-md h-52 flex items-center px-8 ">
        <div className=" max-w-2xl">
        <h1 className="font-bold text-3xl text-gray-900">
          Welcome to DecentraStore
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          We build a decentralized marketplace where you can buy and sell real-world products tokenized as NFTs. 
          Discover unique items, verify ownership, and trade securely on the blockchain.
        </p>
        </div>
      </div>
      {
        isFetching ?  <RenderSkeleton /> : <NFTGrid ids={data as any} isLoading={false} isMarket={true} fetchkey="market-1" />
      }

    </div>
  );
}
