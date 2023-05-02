// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./interfaces/IAccountSigners.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract AccountSigners is IAccountSigners, Ownable {
    mapping(address => AccountSigners) private _accountSigners;

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkAccountAccess() internal view virtual {
        AccountSigners memory _accountSigner = _accountSigners[msg.sender];
        require(
            owner() == msg.sender || _accountSigner.accepted,
            "AccountSigners: account isn't a signer"
        );
    }

    /// @notice Fetch the room token selling allowed status.
    /// @param _v The mint id used for the Token association.
    /// @param _r The mint id used for the Token association.
    /// @param _s The mint id used for the Token association.
    /// @param _hashedMessage The mint id used for the Token association.
    function _verifySignature(
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) internal view virtual {
        address signer = ecrecover(_hashedMessage, _v, _r, _s);
        AccountSigners memory _accountSigner = _accountSigners[signer];
        require(
            _accountSigner.accepted || owner() == msg.sender,
            "AccountSigners: The give signature is an invalid one"
        );
    }

    /// @notice Add account to signers
    /// @param signerAddress The mint id used for the Token association.
    function addAccountSigner(address signerAddress) external override {
        _checkAccountAccess();
        AccountSigners memory _accountSigner = AccountSigners({
            signerAddress: signerAddress,
            accepted: true
        });
        _accountSigners[signerAddress] = _accountSigner;
    }

    /// @notice Remove account from signers
    /// @param signerAddress The signer address
    function removeAccountSigner(address signerAddress) external override {
        _checkAccountAccess();
        AccountSigners memory _accountSigner = AccountSigners({
            signerAddress: signerAddress,
            accepted: false
        });
        _accountSigners[signerAddress] = _accountSigner;
    }
}
