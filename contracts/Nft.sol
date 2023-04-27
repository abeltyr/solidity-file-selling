// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RoomTokenShare.sol";

contract Nft is Ownable, RoomTokenShare {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseURI;

    event BaseURIUpdated(string uri);

    constructor() ERC721("StationRoomToken", "SRT") {}

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
        emit BaseURIUpdated(uri);
    }

    // string memory signature
    function mint(
        string memory id,
        string memory key,
        string memory cid,
        uint256 price
    ) public returns (RoomToken memory) {
        // Todo check the give signature match and if the user is allowed to mint

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        bool inPlatformSell = price > 0;
        RoomToken memory token = createToken(
            id,
            newItemId,
            key,
            cid,
            price,
            inPlatformSell
        );

        _tokenIds.increment();

        return token;
    }
}
