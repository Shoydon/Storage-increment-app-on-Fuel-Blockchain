// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Counter {
    uint64 value;

    function get() public view returns (uint64) {
        return value;
    }

    function increment() public {
        value += 1;
    }
    
    function setValue(uint64 _newValue) public {
        value = _newValue;
    }
}