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
    mapping(string => TableReference) public tables;
    mapping(uint256 => MenuItem) public menu;
    Counters.Counter private MENU_ITEM_IDS;
    Counters.Counter private TABLE_IDS;

    struct MenuItem {
        uint256 id;
        string name;
        uint256 price;
    }

    struct TableReference {
        string name;
        address tableAddress;
        uint256 id;
    }

    constructor(string memory _name) {
        owner = msg.sender;
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

    function addTable(string memory _name) public IsOwner returns (bool success) {
        uint256 currentId = TABLE_IDS.current();
        Table table = new Table(
            address(this),
            currentId,
            _name
        );
        address tableAddress = table._getAddress();
        tables[_name] = TableReference(
            _name,
            tableAddress,
            currentId
        );
        TABLE_IDS.increment();
        return true;
    }
}