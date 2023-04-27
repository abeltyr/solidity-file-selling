// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IRoomToken.sol";

abstract contract RoomToken is IRoomToken, ERC721, Ownable {
    mapping(uint256 => RoomToken) private _roomTokens;

    /// @notice Registers the nft and creates a new listing.
    /// @dev Should fail if startDate is in the past. Should fail if endDate is older the startDate.
    function createToken(
        string memory id,
        uint256 tokenId,
        string memory key,
        string memory cid,
        uint256 price,
        bool inPlatformSell
    ) internal returns (RoomToken memory) {
        uint256 _startDate = block.timestamp;
        address _owner = msg.sender;

        RoomToken memory _roomToken = RoomToken({
            id: id,
            tokenId: tokenId,
            key: key,
            cid: cid,
            owner: payable(_owner),
            creationDate: _startDate,
            price: price,
            inPlatformSell: inPlatformSell
        });
        _roomTokens[tokenId] = _roomToken;

        emit Room(
            _roomToken.id,
            _roomToken.tokenId,
            _roomToken.cid,
            _roomToken.owner,
            _roomToken.creationDate,
            _roomToken.price,
            _roomToken.inPlatformSell
        );

        return _roomToken;
    }

    /// @notice Fetch the room token.
    /// @param tokenId The mint id used for the RoomToken association.
    function fetchToken(
        uint256 tokenId
    ) internal view returns (RoomToken memory) {
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken;
    }

    /// @notice Fetch the room token.
    /// @param tokenId The mint id used for the RoomToken association.
    function getToken(
        uint256 tokenId
    ) external view override returns (RoomToken memory) {
        _requireMinted(tokenId);

        RoomToken memory _roomToken = _roomTokens[tokenId];
        require(
            owner() == msg.sender || _roomToken.owner == msg.sender,
            "RoomToken: only owner of the token and contract can fetch it"
        );
        return _roomToken;
    }

    /// @notice Fetch the room key.
    /// @param tokenId The mint id used for the RoomToken association.
    function tokenKey(
        uint256 tokenId
    ) external view override returns (string memory) {
        _requireMinted(tokenId);
        RoomToken memory _roomToken = _roomTokens[tokenId];
        require(
            owner() == msg.sender || _roomToken.owner == msg.sender,
            "RoomToken: only owner of the token and contract can fetch it"
        );
        return _roomToken.key;
    }

    /// @notice Fetch the room token price.
    /// @param tokenId The mint id used for the RoomToken association.
    function tokenPrice(
        uint256 tokenId
    ) external view override returns (uint256) {
        _requireMinted(tokenId);
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken.price;
    }

    /// @notice Fetch the room token selling allowed status.
    /// @param tokenId The mint id used for the RoomToken association.
    function tokenSelling(
        uint256 tokenId
    ) external view override returns (bool) {
        _requireMinted(tokenId);
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken.inPlatformSell;
    }

    /// @notice Fetch the room token cid allowed status.
    /// @param tokenId The mint id used for the RoomToken association.
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken.cid;
    }
}
