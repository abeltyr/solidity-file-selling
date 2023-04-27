// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IRoomToken.sol";

contract RoomToken is IRoomToken {
    mapping(uint256 => RoomToken) public _roomTokens;

    /// @notice Registers the nft and creates a new listing.
    /// @dev Should fail if startDate is in the past. Should fail if endDate is older the startDate.
    function createToken(
        string memory id,
        uint256 tokenId,
        string memory key,
        string memory cid
    ) internal returns (RoomToken memory) {
        uint256 _startDate = block.timestamp;
        address _owner = msg.sender;

        RoomToken memory _roomToken = RoomToken({
            id: id,
            tokenId: tokenId,
            key: key,
            cid: cid,
            owner: payable(_owner),
            creationDate: _startDate
        });
        _roomTokens[tokenId] = _roomToken;

        emit Room(
            _roomToken.id,
            _roomToken.tokenId,
            _roomToken.cid,
            _roomToken.owner,
            _roomToken.creationDate
        );

        return _roomToken;
    }

    /// @notice Fetch the room token.
    /// @param tokenId The mint id used for the RoomToken association.
    function fetchToken(
        uint256 tokenId
    ) external view override returns (RoomToken memory) {
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken;
    }

    /// @notice Fetch the room key.
    /// @param tokenId The mint id used for the RoomToken association.
    function fetchKey(
        uint256 tokenId
    ) external view override returns (string memory) {
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken.key;
    }

    /// @notice Fetch the room cid.
    /// @param tokenId The mint id used for the RoomToken association.
    function fetchCid(
        uint256 tokenId
    ) external view override returns (string memory) {
        RoomToken memory _roomToken = _roomTokens[tokenId];
        return _roomToken.cid;
    }
}
