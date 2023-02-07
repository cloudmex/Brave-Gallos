import { Card } from "antd";
import { useContractExistsAtAddress, useContractLoader } from "eth-hooks";

import React, { useMemo, useState } from "react";
import { Button, Input, Stack, Flex, Text } from "@chakra-ui/react";
// eslint-disable-next-line
const { ethers } = require("ethers");
// import Address from "../Address";
// import Balance from "../Balance";
// import DisplayVariable from "./DisplayVariable";
// import FunctionForm from "./FunctionForm";

// const noContractDisplay = (
//   <div>
//     Loading...{" "}
//     <div style={{ padding: 32 }}>
//       You need to run{" "}
//       <span
//         className="highlight"
//         style={{ marginLeft: 4, /* backgroundColor: "#f1f1f1", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
//       >
//         yarn run chain
//       </span>{" "}
//       and{" "}
//       <span
//         className="highlight"
//         style={{ marginLeft: 4, /* backgroundColor: "#f1f1f1", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
//       >
//         yarn run deploy
//       </span>{" "}
//       to see your contract here.
//     </div>
//     <div style={{ padding: 32 }}>
//       <span style={{ marginRight: 4 }} role="img" aria-label="warning">
//         ☢️
//       </span>
//       Warning: You might need to run
//       <span
//         className="highlight"
//         style={{ marginLeft: 4, /* backgroundColor: "#f1f1f1", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
//       >
//         yarn run deploy
//       </span>{" "}
//       <i>again</i> after the frontend comes up!
//     </div>
//   </div>
// );

const isQueryable = fn => (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length === 0;

export default function Contract({
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
  userAddress,
}) {
  const [wagetInputs, setWagertInputs] = useState({
    face: "",
    tokenAddress: "",
    tokenAmount: 0,
  });

  const contracts = useContractLoader(provider, contractConfig, chainId);
  let contract;
  if (!customContract) {
    contract = contracts ? contracts[name] : "";
    console.log("🪲 ~ file: Cointoss.js:64 ~ contracts[name]", contracts[name]);
  } else {
    contract = customContract;
  }

  const address = contract ? contract.address : "";
  const contractIsDeployed = useContractExistsAtAddress(provider, address);

  const displayedContractFunctions = useMemo(() => {
    const results = contract
      ? Object.entries(contract.interface.functions).filter(
          fn => fn[1]["type"] === "function" && !(show && show.indexOf(fn[1]["name"]) < 0),
        )
      : [];
    return results;
  }, [contract, show]);

  //const [refreshRequired, triggerRefresh] = useState(false);
  const contractDisplay = displayedContractFunctions.map(contractFuncInfo => {
    const contractFunc =
      contractFuncInfo[1].stateMutability === "view" || contractFuncInfo[1].stateMutability === "pure"
        ? contract[contractFuncInfo[0]]
        : contract.connect(signer)[contractFuncInfo[0]];

    if (typeof contractFunc === "function") {
      if (isQueryable(contractFuncInfo[1])) {
        // If there are no inputs, just display return value
        return (
          <></>
          // <DisplayVariable
          //   key={contractFuncInfo[1].name}
          //   contractFunction={contractFunc}
          //   functionInfo={contractFuncInfo[1]}
          //   refreshRequired={refreshRequired}
          //   triggerRefresh={triggerRefresh}
          //   blockExplorer={blockExplorer}
          // />
        );
      }

      // If there are inputs, display a form to allow users to provide these
      return (
        // <FunctionForm
        //   key={"FF" + contractFuncInfo[0]}
        //   contractFunction={contractFunc}
        //   functionInfo={contractFuncInfo[1]}
        //   provider={provider}
        //   gasPrice={gasPrice}
        //   triggerRefresh={triggerRefresh}
        // />
        <></>
      );
    }
    return null;
  });

  /**
   * * PlayWager *
   * ? this method is used to play the Cointoss game ?
   * TODO Review how to use the methods from the ABI *
   */
  const PlayWager = async () => {
    console.log("🪲 ~ file: Cointoss.js:135 ~ PlayWager ~ provider", provider);
    const gasprice = await provider.getGasPrice();
    console.log("🪲 ~ file: Cointoss.js:134 ~ PlayWager ~ gasprice", gasprice);
    const signer = await provider.getSigner();
    console.log("🪲 ~ file: Cointoss.js:138 ~ PlayWager ~ signer", signer);
    console.log("🪲 ~ file: Cointoss.js:149 ~ PlayWager ~ contract", contract);

    // * this varaible contains the contract signeb by the user
    //  const contractFunc = contract.connect(signer)[contractFuncInfo[0]];

    // console.log("wei", ethers.utils.parseEther(wagetInputs.tokenAmount).toString());

    // let tx = await contract
    //   .connect(signer)
    //   .wager(wagetInputs.face, wagetInputs.tokenAddress, ethers.utils.parseEther(wagetInputs.tokenAmount), {
    //     value: ethers.utils.parseEther(wagetInputs.tokenAmount),
    //   });
    // console.log("🪲 ~ file: Cointoss.js:145 ~ PlayWager ~ tx", tx);

    // const tx = {
    //   from:userAddress,
    //   to:contract.address,

    // }
  };
  return (
    <div style={{ margin: "auto", width: "70vw" }}>
      <Card
        title={
          <div style={{ fontSize: 24 }}>
            {name}
            <div style={{ float: "right" }}>
              {/* <Address value={address} blockExplorer={blockExplorer} />
              <Balance address={address} provider={provider} price={price} /> */}
            </div>
          </div>
        }
        size="large"
        style={{ marginTop: 25, width: "100%" }}
        loading={contractDisplay && contractDisplay.length <= 0}
      >
        {contractIsDeployed ? contractDisplay : null}
        console.log("🪲 ~ file: Cointoss.js:173 ~ contractIsDeployed", contractIsDeployed)
      </Card>
      <div>
        <h1>Wager</h1>
        <Flex width="100%" alignItems="center">
          <Stack spacing={3}>
            <Input
              type="bool"
              placeholder="Coin or tail"
              size="lg"
              onChange={e => {
                setWagertInputs({ ...wagetInputs, face: e.target.value });
              }}
            />
            <Input
              type="text"
              placeholder="Token Address"
              size="lg"
              onChange={e => {
                setWagertInputs({ ...wagetInputs, tokenAddress: e.target.value });
              }}
            />
          </Stack>
          <Stack spacing={3}>
            <Input
              type="number"
              placeholder="bet amount"
              size="lg"
              onChange={e => {
                setWagertInputs({ ...wagetInputs, tokenAmount: e.target.value });
              }}
            />
            <Button colorScheme="teal" size="lg" onClick={PlayWager}>
              {" "}
              Play{" "}
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Text>BET RESUME: </Text>
            <Text>FACE: {wagetInputs.face} </Text>
            <Text>Token: {wagetInputs.tokenAddress} </Text>
            <Text>Token amount: {wagetInputs.tokenAmount} </Text>
          </Stack>
        </Flex>
      </div>
    </div>
  );
}
