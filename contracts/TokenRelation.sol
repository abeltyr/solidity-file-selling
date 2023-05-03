// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./interfaces/ITokenRelation.sol";

abstract contract TokenRelation is ITokenRelation {
    mapping(string => TokenRelation) private _recordTokens;

    /// @notice Registers the nft and creates a new listing.
    function createRecordingToken(
        string memory id,
        uint256 tokenId
    ) internal returns (TokenRelation memory) {
        TokenRelation memory _recordingToken = TokenRelation({
            tokenId: tokenId,
            used: true
        });
        _recordTokens[id] = _recordingToken;

        return _recordingToken;
    }

    /// @notice Fetch the mint token.
    /// @param id the recording id
    function fetchRecordingToken(
        string memory id
    ) internal view returns (TokenRelation memory) {
        TokenRelation memory _recordToken = _recordTokens[id];
        return _recordToken;
    }

    /// @notice Fetch the mint tokenId
    /// @param id the recording id
    function getTokenId(
        string memory id
    ) external view override returns (uint256) {
        TokenRelation memory _recordToken = _recordTokens[id];
        require(
            _recordToken.used,
            "RecordingTokenRelation: The given id is invalid"
        );

        return _recordToken.tokenId;
    }

    /// @notice check if there is a mint tokenId under this id
    /// @param id the recording id
    function checkRecordingId(
        string memory id
    ) external view override returns (bool) {
        TokenRelation memory _recordToken = _recordTokens[id];

        return _recordToken.used;
    }

    /**
     * @dev Throws if the id is already being used.
     */
    function _checkRecordingId(string memory id) internal view virtual {
        TokenRelation memory _recordToken = _recordTokens[id];
        require(
            !_recordToken.used,
            "Recording Token: the id given is already being used"
        );
    }
}
