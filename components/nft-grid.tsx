import { Skeleton } from '@heroui/skeleton';
import React, { useEffect } from 'react'
import NFTCard from './nft-card';
import { TokenizedProductNFT } from '@/types';
import { useNFTData } from '@/utils/getNftData';
import { formatListing } from '@/utils/lib';
import NFTBuyCard from './nft-buy-card';

// NFT Grid Component for Explore Page
const NFTGrid = ({ ids, isLoading = false,fetchkey, isMarket }: { ids: bigint[], isLoading: boolean, fetchkey:string, isMarket:boolean }) => {
  const { data, isFetching, error } = useNFTData({ ids, key: fetchkey })

  useEffect(() => {
    
    console.log(data)
  }, [isFetching, data])

  // Skeleton Loader for when data is loading
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
      ))}
    </div>
  );

  // Main Grid Render
  const renderGrid = () => {
    let tokens = data?.map((item, i) => {
      return { ...item, id: formatListing(ids)[i] }
    })
    if(isMarket) return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {tokens?.map((nft) => (
          <NFTBuyCard key={nft.tokenId} nft={nft} />
        )) || "No Products"}
      </div>
    )
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {tokens?.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        )) || "No Products"}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* <h2 className="mb-6 text-2xl font-bold text-foreground">
          Explore Products
        </h2> */}
        {isLoading || isFetching && data !== undefined ? renderSkeleton() : renderGrid()}
      </div>
    </section>
  );
};

export default NFTGrid