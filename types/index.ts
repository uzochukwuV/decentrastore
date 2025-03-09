import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// types/nft.ts
export interface TokenizedProductNFT {
  imageUrl: string;           // URL to the product image
  name: string;               // Name of the product
  category: string;           // Product category (e.g., "Luxury Watches", "Sneakers")
  price: string;              // Price in ETH as a string (e.g., "5.2")
  rarity: string;             // Rarity or exclusivity level (e.g., "Rare", "Unique")
  edition: number;            // Current edition number
  totalEditions: number;      // Total number of editions (1 for unique items)
  contractAddress: string;    // Blockchain contract address for the NFT
  tokenId: string;            // Unique token ID on the blockchain
  owner: string;              // Wallet address of the current owner
  ownerAvatar: string;        // URL to the owner's avatar image
  condition: string;          // Physical condition (e.g., "Like New", "Excellent")
  location: string;           // Physical location of the item (e.g., "New York, NY")
}

export interface StoreData {
  name: string;
  description: string;
  owner: string;
  ownerAvatar: string;
  bannerImage: string;
  bgColor:String;
  products: TokenizedProductNFT[];
}

export interface Shop {
  animation_url: string;
  banner: string;
  bgcolor: string;
  description: string;
  discord: string;
  external_url: string;
  instagram: string;
  logo: string;
  name: string;
  ownerImage: string;
  twitter?: string;
  youtube_url?: string;
  owner?:string
}
