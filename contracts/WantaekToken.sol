// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract WantaekToken is ERC20PresetMinterPauser("Wantaek Token", "WTC") {
}