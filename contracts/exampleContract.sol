// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract exampleContract {
    uint public num;
    string public str;

    function exec(uint _num, string memory _str) public {
        num = _num;
        str = _str;
    }

    function exec2() public {
        num++;

    }
    // Helper function to generate calldata for 'exec'
    function getExecCalldata(uint _num, string memory _str) public pure returns (bytes memory) {
        return abi.encodeWithSignature("exec(uint256,string)", _num, _str);
    }
}