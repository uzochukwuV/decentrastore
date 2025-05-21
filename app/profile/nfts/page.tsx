"use client"

import NFTGrid from "@/components/nft-grid";
import { useRead } from "@/utils/readContract";
import { Skeleton } from "@heroui/skeleton";
import { useAccount } from "wagmi";


export default function MNFTPage() {
    const {address} = useAccount()
  const {data, isFetching, refetch} = useRead({contract:"MarketPlace", functionName:"get_user_purchase", args:[9, address]})
   const {data: nft, isFetching: isFetchingNft}  = useRead({contract:"Nft", functionName:"getAllUserNFT", args:[ address]})
  const RenderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
      ))}
    </div>
  );

  console.log(nft)
  return (
    <div className=" space-y-8">
      <div className=" bg-orange-100 rounded-md h-52 flex items-center px-8 ">
        <div className=" max-w-2xl">
        <h1 className="font-bold text-3xl text-gray-900">
          Welcome
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Discover , track and manage your nft and coin portfolio here
        </p>
        </div>
      </div>
      {
        isFetching ?  <RenderSkeleton /> : <NFTGrid ids={data as any} isLoading={isFetchingNft} isMarket={false} fetchkey="market-1" />
      }
       {/* {
        isFetching ?  <RenderSkeleton /> : <NFTGrid ids={nft as any} isLoading={isFetchingNft} isMarket={false} fetchkey="market-1" />
      } */}

    </div>
  );
}
