// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

contract exampleContract {

    uint public num;

    constructor(){
        num = 1;
    }

    function exec() public {
        num++;
    }
}