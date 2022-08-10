// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//Return the ethereum balance of a given address
async function getBalance(address) {
    const balanceBigInt = await hre.waffle.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

//logs the Ether balances for a list of addresses
async function printBalances(addresses) {
    let idx = 0;
    for (const address of address) {
            console.log(`address ${idx} balances:`, await getBalance(address));
    idx++;
    }
}
//logs the memos stored on chain from coffee purchases
async function printMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;
        console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
    }
}


async function main() {
// Get the example accounts 
const [owner, tipper, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

//Get the contract to deploy and actually deploy
const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
await BuyMeACoffee.deployed();
console.log("BuyMeACoffee deployed to", BuyMeACoffee.address );

//check balances before the coffee purchases 
const addresses = [owner.address, tipper.address, buyMeACoffee.address];
    console.log("== start ==");
    await printBalances(addresses);

//Buy the owner a few coffees 
const tip = {value: hre.ethers.utils.parseEther("1")};
await buyMeACoffee.connect(tipper).buyCoffee("Carolina", "You are the best!", tip)
await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "amazing teacher", tip);
await buyMeACoffee.connect(tipper3).buyCoffee("Kay", "I love my proof of knowledge nft", tip);

//check balances after coffee purchases 
console.log("== bought coffee ==");
await printBalances(addresses);

//withdraw funds 
await buyMeACoffee.connect(owner).withdrawTips();

//check balances after withdraw 
console.log("== withdrawTips ==");
await printBalances(addresses);
//Read all the memos left for the owner 
console.log("== memos ==");
    const memos = await buyMeACoffee.getMemos();
    printMemos(memos); 

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
