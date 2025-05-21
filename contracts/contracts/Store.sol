//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Burnable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Store is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId = 1;
    mapping(address => bool) public hasMinted;
    mapping(address => uint256) public owners;

    constructor(address initialOwner, string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable(initialOwner) {}

    function safeMint(address to, string memory uri) public {
        require(!hasMinted[to], "Address has already minted an NFT");
        uint256 tokenId = _nextTokenId++;
        hasMinted[to] = true;
        owners[to] = tokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function getUserStore(address user) public view returns (uint256) {
        return owners[user];
    }

   

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
