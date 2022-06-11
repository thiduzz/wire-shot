// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Order.sol";
import "./Restaurant.sol";

contract Table {

    using Counters for Counters.Counter;

    enum TableStatus {
        Busy,
        Free,
        Closed
    }

    Counters.Counter private ORDER_IDS;

    uint256 public id;
    string public name;
    TableStatus public status;
    Restaurant public restaurant;
    address public restaurantAddress;
    address public currentOrder;
    address[] private ORDER_HISTORY;
    event NotEnoughFund(uint256 amount, uint256 price);
    event test_value(uint256 price, uint256 value);
    
    constructor(address _restaurantAddress, uint256 _id, string memory _name) payable {
        restaurant = Restaurant(payable(_restaurantAddress));
        restaurantAddress = _restaurantAddress;
        id = _id;
        name = _name;
        status = TableStatus.Free;
        ORDER_IDS.increment();
    }

    fallback() external payable {}
    
    function _checkIn() public returns (bool success) {
        if(status == TableStatus.Free) {
        uint256 currentId = ORDER_IDS.current();
        Order order = new Order(
            restaurantAddress,
            msg.sender, 
            currentId
        );
        currentOrder = order._getOrderAddress();
        ORDER_HISTORY.push(currentOrder);
        ORDER_IDS.increment();
        return true;
        } else {
            return false;
        }
    }

    function _setTableAsFree() external {
        status = TableStatus.Free;
    }

    function _getBalanceTable() public view returns (uint256) {
        return address(this).balance;
    }

    function _getAddress() public view returns (address) {
        return address(this);
    }
}