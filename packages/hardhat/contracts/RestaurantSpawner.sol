// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Restaurant.sol";

/**
 * @title RestaurantSpawner
 */
contract RestaurantSpawner {

    address[] private restaurantList;
    mapping(address => address[]) public restaurants;


    constructor() {}


    event RestaurantCreated(address restaurantAddress, string name);

    function addRestaurant(string memory _name) public returns (address) {
        Restaurant restaurant = new Restaurant(
            msg.sender,
            _name
        );
        address restaurantAddress = restaurant.getAddress();
        restaurants[msg.sender].push(restaurantAddress);
        restaurantList.push(restaurantAddress);
        emit RestaurantCreated(restaurantAddress, _name);
        return restaurantAddress;
    }

    function paginateRestaurants(uint256 cursor, uint256 howMany) public view returns (address[] memory values, uint256 newCursor)
    {
        uint256 length = howMany;
        if (length > restaurantList.length - cursor) {
            length = restaurantList.length - cursor;
        }

        values = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            values[i] = restaurantList[cursor + i];
        }

        return (values, cursor + length);
    }

    function getRestaurants(address _owner) external view returns (address[] memory ownerRestaurants) {
        return restaurants[_owner];
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
}