// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./TokenShare.sol";

contract Recording is TokenShare {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseURI;

    event BaseURIUpdated(string uri);

    constructor() ERC721("RecordingToken", "RT") {}

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
    ) public returns (Token memory) {
        // Todo check the give signature match and if the user is allowed to mint

        _checkRecordingId(id);

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        bool inPlatformSell = price > 0;
        Token memory token = createToken(
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

    /// @notice Fetch the room token cid allowed status.
    /// @param tokenId The mint id used for the Token association.
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);
        Token memory _token = fetchToken(tokenId);

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, _token.cid))
                : _token.cid;
    }
}
