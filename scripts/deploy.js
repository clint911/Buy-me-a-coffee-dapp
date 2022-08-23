//here goes our deployment script
const hre = require('hardhat');

async function main() {
    //Get the contract to deploy and deploy 
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();

    await buyMeACoffee.deployed();

    console.log("BuyMeACoffee deployed to", buyMeACoffee.address);
}

//We recommend this pattern to be able to use async/await eveverywhere
main() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

/**
 * @dev to deploy run :
 * npx hardhat run scripts/deploy.js --network goerli
 * note this should match the network specified in the hardhatconfig 
 */

