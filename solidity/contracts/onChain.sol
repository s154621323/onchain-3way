// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract OnChain {
    event Received(address Sender, uint256 Value);
    event FallBack(address Sender, uint256 Value, bytes Data);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit FallBack(msg.sender, msg.value, msg.data);
    }
}