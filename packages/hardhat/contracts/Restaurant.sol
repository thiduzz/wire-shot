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
    address[] public tables;
    TableReference[] public tableList;
    mapping(address => TableReference) public freeTablesDetails;
    mapping(uint256 => MenuItem) public menu;
    Counters.Counter private MENU_ITEM_IDS;
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

    function addItem(string memory _name, uint256 _price) public IsOwner returns (bool success) {
        uint256 currentId = MENU_ITEM_IDS.current();
        menu[currentId] = MenuItem(
            currentId,
            _name,
            _price
        );
        MENU_ITEM_IDS.increment();
        return true;
    }

    function _calculatePrice(uint256[] memory _orderItemIds) public view returns (uint) {
        uint price = 0;
        for (uint i=0; i < _orderItemIds.length; i++) {
               price += menu[_orderItemIds[i]].price;
        }
        return price;
    }

    function _addTable(string memory _name) public IsOwner returns (bool success) {
        uint256 currentId = TABLE_IDS.current();
        Table table = new Table(
            address(this),
            currentId,
            _name
        );
        address tableAddress = table._getTableAddress();
        tables.push(tableAddress);
        tableList.push(TableReference(_name, tableAddress, Table.TableStatus.Free));
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

    /* Adjust this function to collect all money from all tables  */
    function deposit() payable public {
        // nothing else to do!
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function getAllTableAddresses() public view returns (address[] memory values) {
        require(tables.length > 0, "No tables created yet");
        values = new address[](tables.length);
        for (uint256 i = 0; i < tables.length; i++) {
            values[i] = tables[i];
        }
        return values;
    }

}