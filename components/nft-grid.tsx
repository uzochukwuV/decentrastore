import { Skeleton } from '@heroui/skeleton';
import React, { useEffect } from 'react'
import NFTCard from './nft-card';
import { TokenizedProductNFT } from '@/types';
import { useNFTData } from '@/utils/getNftData';
import { formatListing } from '@/utils/lib';

// NFT Grid Component for Explore Page
const NFTGrid = ({ ids, isLoading = false }:{ids:bigint[], isLoading :boolean}) => {
  const {data, isFetching, error} = useNFTData({ids})

  useEffect(() => {
    
  console.log(data, error,formatListing(ids))
   
  }, [isFetching])
  
    // Skeleton Loader for when data is loading
    const renderSkeleton = () => (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
        ))}
      </div>
    );
  
    // Main Grid Render
    const renderGrid = () => (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))} */}
      </div>
    );
  
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Explore Products
          </h2>
          {isLoading ? renderSkeleton() : renderGrid()}
        </div>
      </section>
    );
  };

export default NFTGrid