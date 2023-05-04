// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ITokenShare.sol";
import "./Token.sol";

abstract contract TokenShare is ITokenShare, Token {
    mapping(uint256 => mapping(address => TokenShareHolder))
        public _tokenShareHolders;

    /// @notice check if the shareholder exist for the given token
    /// @param tokenId The mint id used for the Token association.
    function checkTokenShare(
        uint256 tokenId,
        address shareHolder
    ) external view returns (bool) {
        require(
            address(0) != shareHolder,
            "Token Share: address is invalid one"
        );
        _requireMinted(tokenId);
        TokenShareHolder memory _tokenShareHolder = _tokenShareHolders[tokenId][
            shareHolder
        ];
        return _tokenShareHolder.bought;
    }

    /// @notice Fetch the  cid.
    /// @param tokenId The mint id used for the Token association.
    function getTokenShare(
        uint256 tokenId,
        address shareHolder
    ) external view returns (TokenShareHolder memory) {
        require(
            address(0) != shareHolder,
            "Token Share: address is invalid one"
        );
        _requireMinted(tokenId);
        TokenShareHolder memory _tokenShareHolder = _tokenShareHolders[tokenId][
            shareHolder
        ];
        require(
            _tokenShareHolder.bought,
            "TokenShare: give address is not a share holder"
        );
        return _tokenShareHolder;
    }

    /// @notice Registers the nft and creates a new listing.
    /// @dev Should fail if startDate is in the past. Should fail if endDate is older the startDate.
    function buyTokenShare(
        uint256 tokenId
    ) external payable returns (Token memory, TokenShareHolder memory) {
        _requireMinted(tokenId);

        Token memory _token = fetchToken(tokenId);

        require(
            msg.value == _token.price,
            "TokenShare: The provided fund doesn't match"
        );
        require(_token.onSell, "Token: token is not for sell");

        address shareHolder = msg.sender;
        require(
            shareHolder != _token.owner,
            "TokenShare: owner of the token can't buy the shares"
        );

        TokenShareHolder memory _existingTokenShareHolder = _tokenShareHolders[
            tokenId
        ][shareHolder];

        require(
            !_existingTokenShareHolder.bought,
            "TokenShare: you already have access to the token"
        );

        (bool success, ) = payable(_token.owner).call{value: msg.value}("");
        require(success, "Transfer: fund transfer failed");

        uint256 buyingDate = block.timestamp;
        TokenShareHolder memory _tokenShareHolder = TokenShareHolder({
            shareHolder: shareHolder,
            buyingDate: buyingDate,
            buyingPrice: msg.value,
            bought: true
        });
        _tokenShareHolders[tokenId][shareHolder] = _tokenShareHolder;

        emit TokenShared({
            shareHolder: _tokenShareHolder.shareHolder,
            tokenOwner: _token.owner,
            tokenId: _token.tokenId,
            buyingPrice: msg.value
        });

        return (_token, _tokenShareHolder);
    }

    /// @notice Fetch the  token.
    /// @param tokenId The mint id used for the Token association.
    function getToken(
        uint256 tokenId
    ) external view override returns (Token memory) {
        _requireMinted(tokenId);
        Token memory _token = fetchToken(tokenId);
        TokenShareHolder memory _tokenShareHolder = _tokenShareHolders[tokenId][
            msg.sender
        ];

        require(
            owner() == msg.sender ||
                _token.owner == msg.sender ||
                _tokenShareHolder.bought,
            "Token: don't have access to the token"
        );
        return _token;
    }

    /// @notice Fetch the token key.
    /// @param tokenId The mint id used for the Token association.
    function tokenKey(
        uint256 tokenId
    ) external view override returns (string memory) {
        _requireMinted(tokenId);

        Token memory _token = fetchToken(tokenId);
        TokenShareHolder memory _tokenShareHolder = _tokenShareHolders[tokenId][
            msg.sender
        ];

        require(
            owner() == msg.sender ||
                _token.owner == msg.sender ||
                _tokenShareHolder.bought,
            "Token: don't have access to the token"
        );
        return _token.key;
    }
}
