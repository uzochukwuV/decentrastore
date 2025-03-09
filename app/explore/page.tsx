"use client"
import { title } from "@/components/primitives";
import NFTCard from "@/components/nft-card";
import { TokenizedProductNFT } from "@/types";
import NFTGrid from "@/components/nft-grid";


export default function ExplorePage() {
  return (
    <div>
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
      <NFTGrid nfts={sampleProducts} isLoading={false} />
    </div>
  );
}

const Example = () => {
    

    return <NFTCard nft={sampleProducts[0]} />;
};

const sampleProducts: TokenizedProductNFT[] = [
  {
    imageUrl: "/path/to/luxury-watch.jpg",
    name: "Rolex Submariner",
    category: "Luxury Watches",
    price: "5.2",
    rarity: "Rare",
    edition: 1,
    totalEditions: 1,
    contractAddress: "0x...",
    tokenId: "1",
    owner: "0x1234...5678",
    ownerAvatar: "/path/to/owner1.jpg",
    condition: "Like New",
    location: "New York, NY",
  },
  {
    imageUrl: "/path/to/vintage-guitar.jpg",
    name: "Gibson Les Paul 1959",
    category: "Musical Instruments",
    price: "12.8",
    rarity: "Legendary",
    edition: 1,
    totalEditions: 1,
    contractAddress: "0x...",
    tokenId: "2",
    owner: "0x5678...1234",
    ownerAvatar: "/path/to/owner2.jpg",
    condition: "Excellent",
    location: "Los Angeles, CA",
  },
  {
    imageUrl: "/path/to/sneakers.jpg",
    name: "Air Jordan 1 Retro",
    category: "Sneakers",
    price: "1.5",
    rarity: "Limited",
    edition: 1,
    totalEditions: 5,
    contractAddress: "0x...",
    tokenId: "3",
    owner: "0x9abc...def0",
    ownerAvatar: "/path/to/owner3.jpg",
    condition: "Brand New",
    location: "Chicago, IL",
  },
  {
    imageUrl: "/path/to/art-sculpture.jpg",
    name: "Bronze Sculpture",
    category: "Art & Collectibles",
    price: "3.9",
    rarity: "Unique",
    edition: 1,
    totalEditions: 1,
    contractAddress: "0x...",
    tokenId: "4",
    owner: "0xdef0...9abc",
    ownerAvatar: "/path/to/owner4.jpg",
    condition: "Pristine",
    location: "Paris, France",
  },
];