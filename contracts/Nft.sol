// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RoomToken.sol";

contract Nft is ERC721, Ownable, RoomToken {
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
        string memory cid
    ) public returns (RoomToken memory) {
        // Todo check the give signature match and if the user is allowed to mint

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        RoomToken memory token = createToken(id, newItemId, key, cid);

        _tokenIds.increment();

        return token;
    }
}
