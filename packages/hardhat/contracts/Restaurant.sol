// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


import "@openzeppelin/contracts/utils/Counters.sol";
import "./Table.sol";

/**
 * @title Restaurant
 * @dev Implements voting process along with vote delegation
 */
contract Restaurant {

    using Counters for Counters.Counter;

    string public name;
    address public owner;
    address[] private tableAddresses;
    TableReference[] public tableList;
    mapping(uint256 => MenuItem) public menu;
    Counters.Counter public MENU_ITEM_IDS;
    Counters.Counter private TABLE_IDS;

    struct MenuItem {
        uint256 id;
        string name;
        uint price;
    }

    struct TableReference {
        string name;
        address tableAddress;
        Table.TableStatus status;
    }

    constructor(address _owner, string memory _name) payable {
        owner = _owner;
        name = _name;
        MENU_ITEM_IDS.increment();
        TABLE_IDS.increment();
    }

    modifier IsOwner(){
        require(
            msg.sender == owner,
            "Only owner can create item."
        );
        _;
    }

    fallback() external payable {}
    function deposit() payable public {
    }

    function addMenuItem(string memory _name, uint256 _price) public IsOwner returns (bool success) {
        uint256 currentId = MENU_ITEM_IDS.current();
        menu[currentId] = MenuItem(
            currentId,
            _name,
            _price
        );
        MENU_ITEM_IDS.increment();
        return true;
    }

    function calculatePrice(uint256[] memory _orderItemIds) public view returns (uint) {
        uint price = 0;
        for (uint i=0; i < _orderItemIds.length; i++) {
               price += menu[_orderItemIds[i]].price;
        }
        return price;
    }

    function addTable(string memory _name) public IsOwner returns (bool success) {
        uint256 currentId = TABLE_IDS.current();
        Table table = new Table(
            owner,
            address(this),
            currentId,
            _name
        );
        tableAddresses.push(address(table));
        tableList.push(TableReference(_name, address(table), Table.TableStatus.Free));
        TABLE_IDS.increment();
        return true;
    }

    function updateTableList(uint256 _id, Table.TableStatus _status) external {
        uint index = _id - 1; 
        tableList[index].status = _status;
    }

    function getNumberOfFreeTables() public view returns (uint256) {
        uint freeTables = 0;
        for (uint i=0; i < tableList.length; i++) {
            if(tableList[i].status == Table.TableStatus.Free)
               freeTables += 1;
        }
        return freeTables;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function getBalance() public IsOwner view returns (uint256) {
        return address(this).balance;
    }

    function getMenuItem(uint256 _id) public view returns (uint256 itemId,  string memory itemName,  uint256 itemPrice) {
        require(_id < MENU_ITEM_IDS.current(), "There is no item for this id");
        return (menu[_id].id, menu[_id].name, menu[_id].price);
    }

    function getAllTableAddresses() public view returns (address[] memory values) {
        values = new address[](tableAddresses.length);
        for (uint256 i = 0; i < tableAddresses.length; i++) {
            values[i] = tableAddresses[i];
        }
        return values;
    }

}