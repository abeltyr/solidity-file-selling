// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Token
interface IToken {
    struct Token {
        /// @notice A unique id to identify the room.
        string id;
        /// @notice the mint token number
        uint256 tokenId;
        /// @notice key to decrypt the file related to the room
        string key;
        /// @notice the ipfs is for where te file is located
        string cid;
        /// @notice The owner of the token.
        address owner;
        /// @notice Date of the token mint
        uint256 creationDate;
        /// @notice price of the token.
        uint256 price;
        /// @notice can the token be sell.
        bool onSell;
    }

    /// @dev Emitted on new Room.
    event Room(
        string id,
        uint256 tokenId,
        string cid,
        address owner,
        uint256 creationDate,
        uint256 price,
        bool onSell
    );

    /// @notice fetch a token token price by the mint id
    function tokenPrice(uint256 tokenId) external view returns (uint256);

    /// @notice fetch a token token price by the mint id
    function tokenSelling(uint256 tokenId) external view returns (bool);
}
