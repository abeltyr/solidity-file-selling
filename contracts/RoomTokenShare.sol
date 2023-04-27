// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IRoomToken.sol";

import "./RoomToken.sol";

abstract contract RoomTokenShare is RoomToken {
    mapping(uint256 => mapping(address => bool)) public _roomTokenShares;

    /// @notice Fetch the room cid.
    /// @param tokenId The mint id used for the RoomToken association.
    function checkOwner(
        uint256 tokenId,
        address shareHolder
    ) external view returns (bool) {
        _requireMinted(tokenId);
        return _roomTokenShares[tokenId][shareHolder];
    }

    /// @notice Registers the nft and creates a new listing.
    /// @dev Should fail if startDate is in the past. Should fail if endDate is older the startDate.
    function BuyTokenShare(uint256 tokenId) public payable returns (bool) {
        _requireMinted(tokenId);

        RoomToken memory _roomToken = fetchToken(tokenId);
        require(
            msg.value == _roomToken.price,
            "RoomTokenShare: Insufficient fund"
        );
        // require(msg.sender != _roomToken.owner, "insufficient fund");

        (bool success, ) = payable(_roomToken.owner).call{value: msg.value}("");
        // RoomToken memory _roomToken = RoomToken({
        //     id: id,
        //     tokenId: tokenId,
        //     key: key,
        //     cid: cid,
        //     owner: payable(_owner),
        //     creationDate: _startDate
        // });
        // _roomTokens[tokenId] = _roomToken;

        // emit Room(
        //     _roomToken.id,
        //     _roomToken.tokenId,
        //     _roomToken.cid,
        //     _roomToken.owner,
        //     _roomToken.creationDate
        // );

        return success;
    }

    // /// @notice Fetch the room token.
    // /// @param tokenId The mint id used for the RoomToken association.
    // function fetchToken(
    //     uint256 tokenId
    // ) external view override returns (RoomToken memory) {
    //     RoomToken memory _roomToken = _roomTokens[tokenId];
    //     return _roomToken;
    // }

    // /// @notice Fetch the room key.
    // /// @param tokenId The mint id used for the RoomToken association.
    // function fetchKey(
    //     uint256 tokenId
    // ) external view override returns (string memory) {
    //     RoomToken memory _roomToken = _roomTokens[tokenId];
    //     return _roomToken.key;
    // }
}
