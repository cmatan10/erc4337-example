// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract exampleContract is ERC721 {

    uint256 public tokenId;

    constructor()
        ERC721("MyToken", "MTK")
    {}

    function safeMint() public  {
        tokenId++;
        _safeMint(msg.sender, tokenId);
    }
}