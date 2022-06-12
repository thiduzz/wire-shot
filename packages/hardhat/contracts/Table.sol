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

    uint256 private id;
    string private name;
    TableStatus private status;
    Restaurant public restaurant;
    Order private order;
    address private ownerAddress;
   
    address[] private orderHistory;
    event NotEnoughFund(uint256 amount, uint256 price);
    event test_value(uint256 price, uint256 value);
    

    modifier IsRestaurant() {
        require(
            msg.sender == address(restaurant),
            "You do not have the permission to perform this action."
        );
        _;
    }

    modifier IsTable() {
        require(
            msg.sender == address(this),
            "You do not have the permission to perform this action."
        );
        _;
    }

    modifier IsCurrentOrder() {
        require(
            msg.sender == address(order),
            "You do not have the permission to perform this action."
        );
        _;
    }

    constructor(address _ownerAddress, address _restaurantAddress, uint256 _id, string memory _name) {
        ownerAddress = _ownerAddress;
        restaurant = Restaurant(payable(_restaurantAddress));
        id = _id;
        name = _name;
        status = TableStatus.Free;
        ORDER_IDS.increment();
    }

    
    function checkIn() public returns (bool success) {
        if(status == TableStatus.Free) {
        uint256 currentId = ORDER_IDS.current();
        order = new Order(
            payable(address(restaurant)),
            msg.sender, 
            currentId
        );
        orderHistory.push(address(order));
        ORDER_IDS.increment();
        setTableAsBusy();
        return true;
        } else {
            return false;
        }
    }
    /* IsRestaurant */
    function setTableAsClosed() public {
        status = TableStatus.Closed;
        restaurant.updateTableList(id, TableStatus.Closed);
    }

    function setTableAsBusy() internal {
        status = TableStatus.Busy;
        restaurant.updateTableList(id, TableStatus.Busy);
    }

    /* IsCurrentOrder IsRestaurant */
    /* Need to check if its current order */
    function setTableAsFree() public {
        status = TableStatus.Free;
        restaurant.updateTableList(id, TableStatus.Free);
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function getCurrentOrderAddress() public view returns (address) {
        return address(order);
    }

    function getDetails() public view returns (uint256,  string memory,  string memory){
        string memory tableStatus = "Free";
        if(status == TableStatus.Busy) {
            tableStatus = "Busy";
        } else if (status == TableStatus.Closed){
            tableStatus = "Closed";
        }
        string memory tableName = name;
        return (id, tableName, tableStatus);
    }


}