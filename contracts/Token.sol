// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IToken.sol";
import "./TokenRelation.sol";

abstract contract Token is IToken, ERC721, Ownable, TokenRelation {
    mapping(uint256 => Token) private _tokens;

    /// @notice Registers the nft and creates a new listing.
    function createToken(
        string memory id,
        uint256 tokenId,
        string memory key,
        string memory cid,
        uint256 price,
        bool inPlatformSell
    ) internal returns (Token memory) {
        uint256 _startDate = block.timestamp;

        Token memory _token = Token({
            id: id,
            tokenId: tokenId,
            key: key,
            cid: cid,
            owner: msg.sender,
            creationDate: _startDate,
            price: price,
            inPlatformSell: inPlatformSell
        });
        _tokens[tokenId] = _token;
        createRecordingToken(id, tokenId);

        emit Room({
            id: _token.id,
            tokenId: _token.tokenId,
            cid: _token.cid,
            owner: _token.owner,
            creationDate: _token.creationDate,
            price: _token.price,
            inPlatformSell: _token.inPlatformSell
        });

        return _token;
    }

    /// @notice Fetch the room token.
    /// @param tokenId The mint id used for the Token association.
    function fetchToken(uint256 tokenId) internal view returns (Token memory) {
        Token memory _token = _tokens[tokenId];
        return _token;
    }

    /// @notice Fetch the room token price.
    /// @param tokenId The mint id used for the Token association.
    function tokenPrice(
        uint256 tokenId
    ) external view override returns (uint256) {
        _requireMinted(tokenId);
        Token memory _token = _tokens[tokenId];
        return _token.price;
    }

    /// @notice Fetch the room token selling allowed status.
    /// @param tokenId The mint id used for the Token association.
    function tokenSelling(
        uint256 tokenId
    ) external view override returns (bool) {
        _requireMinted(tokenId);
        Token memory _token = _tokens[tokenId];
        return _token.inPlatformSell;
    }
}
