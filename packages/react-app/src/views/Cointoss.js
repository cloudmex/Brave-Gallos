import React, { useEffect, useState } from "react";
import { useContractExistsAtAddress, useContractLoader } from "eth-hooks";
function Cointoss({
  customContract,
  account,
  gasPrice,
  signer,
  provider,
  name,
  show,
  price,
  blockExplorer,
  chainId,
  contractConfig,
}) {
  const contracts = useContractLoader(provider, contractConfig, chainId);

  const addressContract = account;
  const currentAccount = customContract;

  const Cointoss_init = async () => {
    console.log("🪲 ~ file: Cointoss.js:17 ~ contracts", contractConfig);
  };
  useEffect(() => {
    Cointoss_init();
  }, []);

  return (
    <>
      <div>
        <label>ERC20 Contract: {addressContract}</label>
        <label>token totalSupply:</label>
        <label my={4}>ClassToken in current account:</label>
      </div>
    </>
  );
}

export default Cointoss;
