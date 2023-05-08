// SPDX-License-Identifier: MITA unique id to identify the room.
pragma solidity ^0.8.18;

/// @title Account Signer
interface IAccountSigners {
    struct AccountSigners {
        /// @notice
        address signerAddress;
        /// @notice user is allow
        bool accepted;
    }

    /// @notice Add account to signers
    /// @param signerAddress The mint id used for the Token association.
    function addAccountSigner(address signerAddress) external;

    /// @notice Remove account from signers
    function removeAccountSigner(address signerAddress) external;

    /// @notice does address have access
    function hasAccountAccess(
        address signerAddress
    ) external view returns (bool);
}
