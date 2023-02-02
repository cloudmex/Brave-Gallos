import { Card } from "antd";
import { useContractExistsAtAddress, useContractLoader } from "eth-hooks";
// eslint-disable-next-line
import React, { useMemo, useState } from "react";
import { Button, Input, Stack, Flex } from "@chakra-ui/react";
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
}) {
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
      </Card>
      <div>
        <h1>Wager</h1>
        <Flex width="100%" alignItems="center">
          <Stack spacing={3}>
            <Input type="bool" placeholder="Coin or tail" size="lg" />
            <Input type="text" placeholder="Token Address" size="lg" />
          </Stack>
          <Stack spacing={3}>
            <Input type="number" placeholder="bet amount" size="lg" />
            <Button colorScheme="teal" size="lg">
              {" "}
              Play{" "}
            </Button>
          </Stack>
        </Flex>
      </div>
    </div>
  );
}
