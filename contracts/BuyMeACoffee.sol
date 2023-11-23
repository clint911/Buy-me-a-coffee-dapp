//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//store your contract address here
//Example contract address: 0xef587C1A92e5Bd8a8906F1686A8078eb98A03108

import "hardhat/console.sol";
error BuyMeACoffee__NotEnoughEth();

contract BuyMeACoffee {
  //Event to emit when a memo is created
  event NewMemo (
        address indexed from,
        uint256 timestamp,
        string name,
        string message
  );

  //memo struct
  struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
  }
//address of deployer contract we withdraw to this contract later
  address payable owner;
    //list of all memos received from coffee purchases
  Memo[] memos;


    //Deploy logic--keeping track of it
    constructor() {
        owner = payable(msg.sender);
    }
   /**
    *fetching all the stored memos
    */
  function getMemos() public view returns (Memo[] memory) {
    return memos;
  }

   /**
    @dev buy a coffee for the contract owner
    @param _name name of the coffee buyer
    @param _message a nice message from the coffee buyer
    */
   function buyCoffee(string memory _name, string memory _message) public payable {
       //use revert and store an error message
       require(msg.value > 0, "cant buy coffee with zero ethereum");
       if(msg.value <= 0) {
revert BuyMeACoffee__NotEnoughEth();
       }

       //add the memos to storage
    memos.push(Memo(
        msg.sender,
        block.timestamp,
        _name,
        _message
        ));

            //emit a log event when a new memo is created
           emit NewMemo (
                msg.sender,
                block.timestamp,
                _name,
                _message
           );
   }
   //implementing two critical functions
/**
*@dev send the entire balance stored in this contract to the owner */
   function withdrawTips() public {
        require(owner.send(address(this).balance));
   }
   /**
     *@dev retreive all the memos received and stored on the blockchain
     */

}


