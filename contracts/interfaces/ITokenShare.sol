// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IToken.sol";

/// @title Token Share
interface ITokenShare is IToken {
    struct TokenShareHolder {
        /// @notice The owner of the token.
        address shareHolder;
        /// @notice Date of the token mint
        uint256 buyingDate;
        /// @notice Buying price of the token.
        uint256 buyingPrice;
        /// @notice bought status
        bool bought;
    }

    /// @dev Emitted on token share holder is added.
    event TokenShared(
        address shareHolder,
        address tokenOwner,
        uint256 tokenId,
        uint256 buyingPrice
    );

    /// @notice check if the the user own a share of the the token
    /// @param tokenId The mint id used for the Token association.
    /// @param shareHolder the address of the shareholder
    function checkTokenShare(
        uint256 tokenId,
        address shareHolder
    ) external view returns (bool);

    /// @notice get the token share data
    /// @param tokenId The mint id used for the Token association.
    /// @param shareHolder the address of the shareholder
    function getTokenShare(
        uint256 tokenId,
        address shareHolder
    ) external view returns (TokenShareHolder memory);

    /// @notice buy token share
    /// @param tokenId The mint id used for the Token association.
    function buyTokenShare(
        uint256 tokenId
    ) external payable returns (Token memory, TokenShareHolder memory);

    /// @notice fetch a token data by the mint id
    function getToken(uint256 tokenId) external view returns (Token memory);

    /// @notice fetch a token key by the mint id
    function tokenKey(uint256 tokenId) external view returns (string memory);
}
