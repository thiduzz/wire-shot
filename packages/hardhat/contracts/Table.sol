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
    event NotEnoughFund(uint amount, uint price);

    constructor(address _restaurantAddress, uint256 _id, string memory _name) payable {
        restaurant = Restaurant(_restaurantAddress);
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

    /* This could be on restaurant level */
    function _collectMoneyAndRelease(address _orderAddress, uint256[] memory _orderItems) public payable
    {
        if(_orderItems.length > 0) {
            uint price = restaurant._calculatePrice(_orderItems);
            require(msg.value == price, "The selected amount does not add to the price");
            emit NotEnoughFund(msg.value, price);
            _receive(msg.value);
            _checkOut(_orderAddress,price,_orderItems);
        }
        _checkOut(_orderAddress,0,_orderItems);
    }

    function _receive(uint _amount) public payable returns (bool success) {
         address payable receiver = payable(address(this));
         receiver.transfer(_amount);
         return true;
    }

    function _checkOut(address _orderAddress, uint256 _price, uint256[] memory _orderItems) private {
        Order order = Order(_orderAddress);
        order._closeOrder(_price,_orderItems);
        status = TableStatus.Free;
    }

    function _getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _getAddress() public view returns (address) {
        return address(this);
    }


}