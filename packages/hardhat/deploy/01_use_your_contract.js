// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "97";


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


  console.log("01")
   /**
   * * 1- Recover the bank address deployed *
   * TODO This is used to interact with the contract with JS *
   */
  Bank = await ethers.getContract("Bank", deployer);
 
  /**
   * * 2- Recover the cointoss address deployed *
   * ? This is used to interact with the contract with JS *
   */
  const Coin = await ethers.getContract("CoinToss", deployer);
 
/**
   * * 3- Deposit *
   * ! It's already deployed *
   * ? Deposit the initial bnb balance *
   * @param token - address : The bnb address  for us *
   * @param amount - uint256 :    *
 */
//await Bank.deposit(bnbAddress,0,{ value:BigInt(100000000000000000),gasLimit: 1e7});


/**
   * * 4- Wager *
   * ! It's already deployed *
   * ? Play the first wager in cointoss *
   * @param face - bool : The bnb address  for us *
   * @param token - address :    *
   * @param tokenAmount - uint256 :    *
 */
  //   const transaction =await Coin.wager(1,bnbAddress,BigInt(1000000000000000),{  value:BigInt(1000000000000000),gasLimit: 3e7})

  // const data = Promise.resolve(transaction)
  //   data.then(value => {

  //         console.log(value)

  //     });
  

   let result = await Coin.getLastUserBets(deployer,1);
   console.log("🪲 ~ file: 01_use_your_contract.js:66 ~ module.exports= ~ deployer:", deployer)
   console.log("🪲 ~ file: 01_use_your_contract.js:66 ~ module.exports= ~ result",typeof result ,result );


   let  tx = result[0].bet;

    console.log("🪲 ~ file: 01_use_your_contract.js:70 ~ module.exports= ~ tx", typeof tx,
    {idhex:tx.id._hex,idstr:tx._idstr})




    
    
  //    let fulfillRandomWords_RES = Coin.fulfillRandomWords(tx._idstr,[tx._idstr])
  //    console.log("🪲 ~ file: 01_use_your_contract.js:76 ~ module.exports= ~ fulfillRandomWords_RES", fulfillRandomWords_RES)
  //   // let result2 = await Coin.bets(tx._idstr)   ;
  //   // console.log("🪲 ~ file: 01_use_your_contract.js:75 ~ module.exports= ~ result2", result2)





  //  const data2 = Promise.resolve(result)
  //   data2.then(value => {

  //         console.log(value)

  //     });
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
