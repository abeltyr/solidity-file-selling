// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ITokenShare.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

abstract contract TokenFee is Ownable {
    uint8 private _buyingFee = 15;
    address private _feeAcceptor;

    /// @notice update the fee percentage
    /// @param fee the percentage amount of fee
    function updateFee(uint8 fee) public onlyOwner {
        require(fee < 90, "TokenFee: fee can't be greater than 90%");
        _buyingFee = fee;
    }

    /// @notice update the fee acceptor address
    /// @param feeAcceptorAddress the fee amount acceptor address
    function updateFeeAcceptingAddress(
        address feeAcceptorAddress
    ) public onlyOwner {
        _feeAcceptor = feeAcceptorAddress;
    }

    /// @notice Fetch the fee percentage for the public.
    function feePercentage() public view onlyOwner returns (uint8) {
        return _buyingFee;
    }

    /// @notice Fetch the fee percentage for the public.
    function feeAcceptor() public view returns (address) {
        return _feeAcceptor;
    }

    /// @notice Fetch the fee percentage.
    function getFeePercentage() internal view returns (uint8) {
        return _buyingFee;
    }

    /// @notice Fetch the fee acceptor
    function getFeeAcceptor() internal view returns (address) {
        return _feeAcceptor;
    }
}
