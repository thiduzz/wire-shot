// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Restaurant.sol";
import "./Table.sol";

contract Order {

    struct OrderItem{
        uint256 _id;
        uint256 price;
        uint256 quantity;
    }

    enum OrderStatus {
        Open,
        Pending,
        Closed
    }

    event PaidOrder(uint256 price, uint256[] orderItems);

    Restaurant private restaurant;
    uint256 msgValue;
    Table private table;
    uint256 private id;
    address payable private tableAddress;
    address private customerAddress;
    uint256[] private orderItems;
    OrderStatus private status;
    
    event ClosedOrder(address orderAddress,uint256[] orderItems, uint256 price);

    modifier IsCustomer(){
        require(
            msg.sender == customerAddress,
            "Only restaurant or customer can access the order."
        );
        _;
    }

    modifier IsTable(){
        require(
            msg.sender == tableAddress,
            "Only Table can close order."
        );
        _;
    }

    modifier IsRestaurant(){
        require(
            msg.sender == restaurant.getAddress(),
            "Only restaurant or customer can access the order."
        );
        _;
    }

    constructor(address _restaurantAddress, address _customerAddress, uint256 _id) payable {
        restaurant = Restaurant(payable(_restaurantAddress));
        tableAddress = payable(msg.sender);
        table = Table(payable(msg.sender));
        customerAddress = _customerAddress;
        id = _id;
        status = OrderStatus.Open;
    }

    fallback() external payable {}

    function _addItem(uint256[] memory _orderIds) public returns (bool success){
        if(_orderIds.length > 0) {
            for (uint i=0; i < _orderIds.length; i++) {
                orderItems.push(_orderIds[i]);
            }
            status = OrderStatus.Pending;
            return true;
        } else {
            return false;
        }
    }

    function _getOrderItems() public view returns (uint256[] memory) {
        return orderItems;
    }

    function _calculatePrice() public view returns (uint256) {
        uint256 price = restaurant._calculatePrice(orderItems);
        return price;
    }

    /* Not sure if we need to wait until payment is confirmed?  */
    function _payAndCloseOrder() payable public {
        uint256 price = restaurant._calculatePrice(orderItems);
        require(msg.value >= price, "Your value does not cover the price");
        _closeOrder(price);
        _transferFundsToTable();
        table._setTableAsFree();
    }

    function _transferFundsToTable() internal {
        tableAddress.transfer(address(this).balance);
    }

    function _closeOrder(uint256 _price) internal {
        status = OrderStatus.Closed;
        emit ClosedOrder(address(this), orderItems, _price);
    }

    function _getBalanceOrder() public view returns (uint256) {
        return address(this).balance;
    }

    function _getCustomerAddress() public view returns (address) {
        return customerAddress;
    }

    function _getOrderAddress() public view returns (address) {
        return address(this);
    }
}