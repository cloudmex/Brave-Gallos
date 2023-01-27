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
  let LINK_ETH_FEEDADDRESS="0xdc530d9457755926550b59e8eccdae7624181557" //verificar que el link sea el correcto
  let bgtoken="0x8d9aCc9f7C23B4121AadB356D43cD1Cf46EB8565";
  let bnbAddress="0x0000000000000000000000000000000000000000";
  let keyhash="0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314"
  let GAME_ROLE="0x6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa88"
  let subscription_id=2166;
  let Bank=null;

  // * Step by step to deploy successfully the Bg cointoss
 
  /**
   * * 1- deploy the bank *
   * !  *
   * ?  *
   * TODO *
   * @param *
   */
  await deploy("Bank", {from: deployer, args: [ treasuryWalllet,teamWallet ],  log: true, waitConfirmations: 5, });
  /**
   * * 2- Recover the bank address deployed *
   * TODO This is used to interact with the contract with JS *
   */
  Bank = await ethers.getContract("Bank", deployer);
  /**
   * * 3- deploy the Cointoss *
   * ? This method will deploy the Cointoss contract throght Ethers *
   * @param Bank.address to get the bank's address deployed*
   * @param CHAINLINKCOORDINATORADDRESS the address of the blockchain coordinator *
   * @param LINK_ETH_FEEDADDRESS The address price of the link / eth*
   */
  await deploy("CoinToss", { from: deployer, args: [Bank.address,CHAINLINKCOORDINATORADDRESS,LINK_ETH_FEEDADDRESS], log: true,waitConfirmations: 5, });
  
  /**
   * * 4- Recover the cointoss address deployed *
   * ? This is used to interact with the contract with JS *
   */
  const Coin = await ethers.getContract("CoinToss", deployer);
 /**
   * * 5- Grant Game Role to the cointoss in  the bank *
   * ! It's already deployed *
   * ? Grant a game contract as GAMe in the Bank *
   * @param role - byte32 : GAME_ROLE is 0x6a64baf327d646d1bca72653e2a075d15fd6ac6d8cbd7f6ee03fc55875e0fa88*
   * @param account - address : Game address to be granted as GAME_ROLE *
 */
 //await Bank.grantRole(GAME_ROLE,Coin.address,{  gasLimit: 3e7});
/**
   * * 6- Set the chainlink basic confing in the Cointoss  *
   * ! It's already deployed *
   * ? Set the basic's variables of the chainlink *
   * @param requestConfirmations - uint16 :  *
   * @param keyHash - bytes32 : The keyhas providen by chainlink by network  *
   * @param gasAfterCalculation - uint256 :  *
 */
//await Coin.setChainlinkConfig(3,keyhash,49780,{  gasLimit: 1e7})

/**
   * * 7- Add the cointoss contract as Consumer in VRF UI  *
   * ! It's already done *
   * @param subId - uint64 :  Your subscription id for us is 2166 *
   * @param consumer - address : The Cointoss address as consumer *
 */
/**
   * * 8- Add token  *
   * ! It's already deployed *
   * ? Add BNB as a valid token for us
    * @param token - address : The bnb address for us  *
 */
//await Bank.addToken(bnbAddress,{  gasLimit: 1e7});
/**
   * * 9- setAllowedToken *
   * ! It's already deployed *
   * ? Set alowance for a token *
   * @param token - address : The bnb address  for us *
   * @param allowed - bool : true or falce   *
 */
//await Bank.setAllowedToken(bnbAddress,true,{  gasLimit: 1e7});

/**
   * * 10- setBalanceRisk *
   * ! It's already deployed *
   * ? Set the balance risk for a token *
   * @param token - address : The bnb address  for us *
   * @param balanceRisk - uint16 : true or falce   *
 */
//await Bank.setBalanceRisk(bnbAddress,200,{  gasLimit: 1e7});

/**
   * * 11- setTokenVRFSubId *
   * ! It's already deployed *
   * ? Set the balance risk for a token *
   * TODO *
   * @param token - address : The bnb address  for us *
   * @param balanceRisk - uint64 : true or falce   *
 */
//await Bank.setTokenVRFSubId(bnbAddress,subscription_id,{  gasLimit: 1e7});

/**
   * * 12- setHouseEdge  *
   * ! It's already deployed *
   * ? Set the house edge for the cointoss*
   * @param token - address :  *
   * @param houseEdge - uint16 :    *
  */
//await Coin.setHouseEdge(bnbAddress,300,{  gasLimit: 1e7})

/**
   * * 13- setVRFCallbackGasLimit  *
   * ! It's already deployed *
   * ? Set the house edge for the cointoss*
   * @param token - address :  *
   * @param callbackGasLimit - uint32 :    *
  */
//await Coin.setVRFCallbackGasLimit(bnbAddress,170000,{  gasLimit: 1e7})

/**
   * * 14- setHouseEdgeSplit *
   * ! It's already deployed *
   * ? Set the house split for a token *
   * @param token - address : The bnb address  for us *
   * @param bank - uint16 :    *
   * @param dividend - uint16 :    *
   * @param partner - uint16 :    *  
   * @param _treasury - uint16 :    *
   * @param team - uint16 :    *
 */
//await Bank.setHouseEdgeSplit(bnbAddress,4000,3000,0,2000,1000,{  gasLimit: 1e7});

/**
   * * 14- Deposit *
   * ! It's already deployed *
   * ? Deposit the initial bnb balance *
   * @param token - address : The bnb address  for us *
   * @param amount - uint256 :    *
 */
//await Bank.deposit(bnbAddress,0,{ value:BigInt(100000000000000000),gasLimit: 1e7});


/**
   * * 14- Wager *
    * ! It's already deployed *
   * ? Play the first wager in cointoss *
   * @param face - bool : The bnb address  for us *
   * @param token - address :    *
   * @param tokenAmount - uint256 :    *
 */
   const transaction =await Coin.wager(1,bnbAddress,BigInt(1000000000000000),{  value:BigInt(1000000000000000),gasLimit: 3e7})



  
   
 
   
  const data = Promise.resolve(transaction)
    data.then(value => {

          console.log(value)

      });
  
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
