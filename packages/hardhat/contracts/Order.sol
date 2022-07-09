// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Restaurant.sol";
import "./Table.sol";

contract Order {
    struct OrderItem {
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

    Restaurant public restaurant;
    Table public table;
    address private customerAddress;
    uint256[] private orderItems;
    uint256 private id;
    uint256 private paidPrice;
    OrderStatus private status;

    event ClosedOrder(
        address orderAddress,
        uint256[] orderItems,
        uint256 price
    );

    modifier IsCustomer() {
        require(
            msg.sender == customerAddress,
            "You do not have the permission to perform this action."
        );
        _;
    }

    modifier IsTable() {
        require(
            msg.sender == address(table),
            "You do not have the permission to perform this action."
        );
        _;
    }

    modifier IsRestaurant() {
        require(
            msg.sender == address(restaurant),
            "You do not have the permission to perform this action."
        );
        _;
    }

    constructor(
        address payable _restaurantAddress,
        address _customerAddress,
        uint256 _id
    ) payable {
        restaurant = Restaurant(payable(_restaurantAddress));
        table = Table(payable(msg.sender));
        customerAddress = _customerAddress;
        id = _id;
        status = OrderStatus.Open;
    }

    fallback() external payable {}

    /* IsCustomer */
    function addMenuItem(uint256[] memory _orderIds)
        public
        returns (bool success)
    {
        if (_orderIds.length > 0) {
            for (uint256 i = 0; i < _orderIds.length; i++) {
                orderItems.push(_orderIds[i]);
            }
            status = OrderStatus.Pending;
            return true;
        } else {
            return false;
        }
    }

    /* IsCustomer IsTable IsRestaurant */
    function getOrderItems() public view returns (uint256[] memory) {
        return orderItems;
    }

    function calculatePrice() public view returns (uint256) {
        uint256 price = restaurant.calculatePrice(orderItems);
        return price;
    }

    /* IsCustomer IsTable IsRestaurant */
    /* Not sure if we need to wait until payment is confirmed?  */
    function payOrder() public payable returns (bool success) {
        uint256 price = restaurant.calculatePrice(orderItems);
        require(msg.value >= (price * 1e18), "Your value does not cover the price");
        closeOrder(price);
        transferFundsToRestaurant();
        table.setTableAsFree();
        return true;
    }

    function getCustomerAddress() external view returns (address) {
        return customerAddress;
    }

    function transferFundsToRestaurant() internal {
        payable(address(restaurant)).transfer(address(this).balance);
    }

    function closeOrder(uint256 _price) internal {
        status = OrderStatus.Closed;
        paidPrice = _price;
        emit ClosedOrder(address(this), orderItems, _price);
    }
}
