// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Table {


    enum TableStatus {
        Busy,
        Free,
        Closed
    }

    uint256 public id;
    string public name;
    TableStatus public status;
    address public restaurant;

    constructor(address _restaurant, uint256 _id, string memory _name) {
        restaurant = _restaurant;
        id = _id;
        name = _name;
        status = TableStatus.Free;
    }

    function _getAddress() public view returns (address) {
        return address(this);
    }

}