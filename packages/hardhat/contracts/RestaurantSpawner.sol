// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Restaurant.sol";

/**
 * @title RestaurantSpawner
 */
contract RestaurantSpawner {

    mapping(address => address[]) public restaurants;

    constructor() {}

    function addRestaurant(string memory _name) public returns (bool success) {
        Restaurant restaurant = new Restaurant(
            msg.sender,
            _name
        );
        address restaurantAddress = restaurant._getAddress();
        restaurants[msg.sender].push(restaurantAddress);
        return true;
    }

    function getRestaurants(address _owner) external view returns (address[] memory ownerRestaurants) {
        return restaurants[_owner];
    }

    function _getAddress() public view returns (address) {
        return address(this);
    }
}