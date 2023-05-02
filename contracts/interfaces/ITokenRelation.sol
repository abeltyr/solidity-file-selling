// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Token Relation
interface ITokenRelation {
    struct TokenRelation {
        /// @notice the mint token number
        uint256 tokenId;
        /// @notice is the value used.
        bool used;
    }

    /// @notice fetch a token id by the room id
    function getTokenId(string memory id) external view returns (uint256);

    /// @notice check if the given id exist
    function checkRecordingId(string memory id) external view returns (bool);
}
