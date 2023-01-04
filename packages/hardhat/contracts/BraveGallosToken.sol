// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";

/// @title BraveGallosToken ERC20 token
/// @author Dokxo (DanielMora)
contract BraveGallosToken is ERC20, Ownable, Multicall {
    constructor() ERC20("Brave Gallos Token ", "BGT") {
        _mint(msg.sender, 100_000_000_000 ether);
    }

    /**
     * @dev This function is here to ensure BEP-20 compatibility
     */
    function getOwner() external view returns (address) {
        return owner();
    }
}
