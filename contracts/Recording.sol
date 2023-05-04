// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./TokenShare.sol";
import "./AccountSigners.sol";

contract Recording is TokenShare, AccountSigners {
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
        uint256 price,
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public returns (Token memory) {
        // check if the id has been used
        _checkRecordingId(id);

        // check if the requester has access to mint by checking the signers message
        _verifySignature({
            _hashedMessage: _hashedMessage,
            _v: _v,
            _r: _r,
            _s: _s
        });

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        // create token data for the mint token id
        Token memory token = createToken(id, newItemId, key, cid, price);

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
