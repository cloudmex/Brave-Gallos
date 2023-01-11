// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "97";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let treasuryWalllet= "0xc627Cbc4027E1B2C392Cd4FD204dbD55483561f2";
  let teamWallet ="0xb6A2f9b8fd10E7AfBac15b3DB96828B018A909d7"
  let CHAINLINKCOORDINATORADDRESS="0x6a2aad07396b36fe02a22b33cf443582f682c82f"
  let LINK_ETH_FEEDADDRESS="0xdc530d9457755926550b59e8eccdae7624181557"
  let player="0x766a5882B53bAF0EFa8F7c99Fe4944A8C7c1102c";
  // await deploy("YourContract", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   // args: [ "Hello", ethers.utils.parseEther("1.5") ],
  //   log: true,
  //   waitConfirmations: 5,
  // });

  await deploy("BraveGallosToken", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    //args: [ "BraveGallosToken" ],
    log: true,
    waitConfirmations: 5,
  });
  await deploy("Bank", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ treasuryWalllet,teamWallet ],
    log: true,
    waitConfirmations: 5,
  });

  
  // Getting a previously deployed contract
 // const YourContract = await ethers.getContract("YourContract", deployer);
  const Bank = await ethers.getContract("Bank", deployer);
  const BGToken = await ethers.getContract("BraveGallosToken", deployer);
 

  //Listing our ERC20 at the bank
  //await Bank.addToken(BGToken.address);

  console.log(Bank.address)
 // Deploy cointoss
  await deploy("CoinToss", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [Bank.address,CHAINLINKCOORDINATORADDRESS,LINK_ETH_FEEDADDRESS],
    log: true,
    waitConfirmations: 5,
  });

  const Coin = await ethers.getContract("CoinToss", deployer);

  
   console.log(await Coin.bank());

   Coin.wager(1,player,10000000000000000,20000000000000000)
  /*  await YourContract.setPurpose("Hello");
  
    // To take ownership of yourContract using the ownable library uncomment next line and add the 
    // address you want to be the owner. 
    
    await YourContract.transferOwnership(
      "ADDRESS_HERE"
    );

    //const YourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       constructorArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["YourContract"];
