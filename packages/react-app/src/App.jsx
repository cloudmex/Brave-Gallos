//import { Button, Col, Menu, Row } from "antd";

import { Button, Input, Stack, Flex, Text, Select, Container, Heading } from "@chakra-ui/react";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  //useGasPrice,
  // useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useCallback, useEffect, useState } from "react";

import {
  Account,
  // Contract,
  // Faucet,
  // GasGauge,
  Header,
  // Ramp,
  ThemeSwitch,
  NetworkDisplay,
  //FaucetHint,
  NetworkSwitch,
  // Contract,
} from "./components";
import { NETWORKS, ALCHEMY_KEY } from "./constants";
import externalContracts from "./contracts/external_contracts";
// contracts
import deployedContracts from "./contracts/hardhat_contracts.json";
import { getRPCPollTime, Web3ModalSetup } from "./helpers";
//import { Home, ExampleUI, Hints, Subgraph } from "./views";
// eslint-disable-next-line
//import Cointoss from "./views/Cointoss";
import { useStaticJsonRPC } from "./hooks";
import Swal from "sweetalert2";
import cointoss_g from "./assets/coin.gif";

const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.binanceTestnet; // <------- select your target frontend network (localhost, goerli, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = true; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [
  "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
  `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  "https://rpc.scaffoldeth.io:48544",
];

function App(props) {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, "mainnet", "goerli"];
  const [wagetInputs, setWagertInputs] = useState({
    face: "",
    tokenAddress: "",
    tokenAmount: 0,
  });
  const [Bankbalance, setBankbalance] = useState({
    value: "0x00",
    label: "BNB",
    balance: 0,
  });
  const [bet_Info, setBet_Info] = useState({
    resolve: "",
    won: "",
  });
  // eslint-disable-next-line
  const [tokensaddress, setTokensaddress] = useState([
    {
      id: 0,
      value: "0x0000000000000000000000000000000000000000",
      label: "BNB",
    },
  ]);
  // eslint-disable-next-line
  const [coinortail, setCoinortail] = useState([
    {
      id: 0,
      value: 0,
      label: "TAIL",
    },
    {
      id: 1,
      value: 1,
      label: "HEAT",
    },
  ]);

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  //const location = useLocation();

  const targetNetwork = NETWORKS[selectedNetwork];

  // 🔭 block explorer URL
  const blockExplorer = targetNetwork.blockExplorer;

  // load all your providers
  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  ]);

  const mainnetProvider = useStaticJsonRPC(providers, localProvider);

  // Sensible pollTimes depending on the provider you are using
  const localProviderPollingTime = getRPCPollTime(localProvider);
  const mainnetProviderPollingTime = getRPCPollTime(mainnetProvider);

  //if (DEBUG) console.log(`Using ${selectedNetwork} network`);

  // 🛰 providers
  // if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider, mainnetProviderPollingTime);
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
  const userSigner = userProviderAndSigner.signer;

  /**
   * * PlayWager *
   * ? this method is used to play the Cointoss game ?
   * TODO Review how to use the methods from the ABI *
   */
  const PlayWager = async () => {
    // * recover the ABI from the JSON
    let Coincontract = contractConfig.deployedContracts[selectedChainId].bnbTestnet.contracts["CoinToss"];
    // * Get the current provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // * Create a new instance of the contract from the ABI,address and the provider
    let cointossContract = new ethers.Contract(Coincontract.address, Coincontract.abi, provider);
    // * get the current signer
    let signer = provider.getSigner();
    // * connect the contract and the signer
    let cointossContractWithSigner = cointossContract.connect(signer);
    // * use the instance connected with the signer to call the wager method.
    /**
     * @param wagetInputs.face : is the value for coin(1) or tail(0)
     * @param wagetInputs.tokenAddress : is the token's address
     * @param wagetInputs.tokenAmount: is the amount for the bet
     * */
    let res = await cointossContractWithSigner
      .wager(wagetInputs.face, wagetInputs.tokenAddress, wagetInputs.tokenAmount * 10 ** 18, {
        value: wagetInputs.tokenAmount * 10 ** 18,
        gasLimit: 2e7,
      })
      .then(response => {
        console.log("🪲 ~ file: App.jsx:172 ~ PlayWager ~ response", response);

        Swal.fire({
          background: "#0a0a0a",
          position: "center",
          imageUrl: "https://www.bravegallos.com/wp-content/uploads/2022/12/Sin-titulo-2.gif",
          title: "Flipping the coin",
          showConfirmButton: false,
          timer: 3500,
        });
        setTimeout(async () => {
          let result = await cointossContractWithSigner
            .getLastUserBets(address, 1)
            .then(response => {
              console.log("🪲 ~ file: App.jsx:168 ~ result ~ response:", response[0].bet);

              setBet_Info({ ...bet_Info, resolve: response[0].bet?.resolved, won: response[0].bet?.haswon });
              let tempbet = response[0].bet.haswon;
              let temp = tempbet ? "You has won! " : "You has lose!";

              Swal.fire({
                icon: "Bet result",
                title: temp,
                background: "#0a0a0a",
              });
              GetBankBalance();

              setTimeout(() => {
                Swal.close();
              }, 5000);
              return;
            })
            .catch(error => {
              console.log("Oh, no! We encountered an error: ", error);
            });
          console.log("🪲 ~ file: App.jsx:175 ~ result ~ result:", result);
        }, 5000);
      })
      .catch(error => {
        console.log("Oh, no! We encountered an error: ", error);
      });

    console.log("🪲 ~ file: App.jsx:168 ~ result ~ Account:", address);
  };

  const GetBankBalance = async () => {
    console.clear();
    // * recover the ABI from the JSON
    let Bankcontract = contractConfig.deployedContracts[selectedChainId].bnbTestnet.contracts["Bank"];
    // * Get the current provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // * Create a new instance of the contract from the ABI,address and the provider
    let BankContract = new ethers.Contract(Bankcontract.address, Bankcontract.abi, provider);
    // * get the current signer
    let signer = provider.getSigner();
    // * connect the contract and the signer
    let BankContractWithSigner = BankContract.connect(signer);
    // * use the instance connected with the signer to call the wager method.

    console.log("🪲 ~ file: App.jsx:219 ~ GetBankBalance ~ BankContractWithSigner:", tokensaddress[0].value);

    let result = await BankContractWithSigner.getBalance(tokensaddress[0].value)
      .then(response => {
        console.log("🪲 ~ file: App.jsx:168 ~ result ~ response:", response, parseInt(response._hex, 16));

        setBankbalance({ ...Bankbalance, balance: ethers.utils.formatEther(parseInt(response._hex, 16).toString()) });
        return;
      })
      .catch(error => {
        console.log("Oh, no! We encountered an error: ", error);
      });
  };
  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  // const tx = Transactor(userSigner, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address, localProviderPollingTime);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address, mainnetProviderPollingTime);

  // const contractConfig = useContractConfig();

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };

  //console.log("🪲 ~ file: App.jsx:154 ~ App ~ contractConfig", contractConfig);
  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);

  // If you want to call a function on a new block
  // useOnBlock(mainnetProvider, () => {
  //   console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  // });

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(
    mainnetContracts,
    "DAI",
    "balanceOf",
    ["0x34aA3F359A9D614239015126635CE7732c18fDF3"],
    mainnetProviderPollingTime,
  );

  // keep track of a variable from the contract in the local React state:
  //const purpose = useContractReader(readContracts, "YourContract", "purpose", [], localProviderPollingTime);

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:", addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts &&
      mainnetContracts
    ) {
      // console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      // console.log("🌎 mainnetProvider", mainnetProvider);
      // console.log("🏠 localChainId", localChainId);
      // console.log("👩‍💼 selected address:", address);
      // console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      // console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      // console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      // console.log("📝 readContracts", readContracts);
      // console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      // console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
      // console.log("🔐 writeContracts", writeContracts);
      GetBankBalance();
    }
  }, []);

  const loadWeb3Modal = useCallback(async () => {
    //const provider = await web3Modal.connect();
    const provider = await web3Modal.requestProvider();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      //  console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      //  console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      //console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    //automatically connect if it is a safe app
    const checkSafeApp = async () => {
      if (await web3Modal.isSafeApp()) {
        loadWeb3Modal();
      }
    };
    checkSafeApp();
  }, [loadWeb3Modal]);

  // const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

  return (
    <div className="App" bg="tomato">
      {/* ✏️ Edit the header and change the title to your project name */}
      <Header>
        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flex: 1 }}>
            {USE_NETWORK_SELECTOR && (
              <div style={{ marginRight: 20 }}>
                <NetworkSwitch
                  networkOptions={networkOptions}
                  selectedNetwork={selectedNetwork}
                  setSelectedNetwork={setSelectedNetwork}
                />
              </div>
            )}
            <Account
              useBurner={USE_BURNER_WALLET}
              address={address}
              localProvider={localProvider}
              userSigner={userSigner}
              mainnetProvider={mainnetProvider}
              price={price}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              blockExplorer={blockExplorer}
            />
          </div>
          <ThemeSwitch />
        </div>
      </Header>
      {/* {yourLocalBalance.lte(ethers.BigNumber.from("0")) && (
        <FaucetHint localProvider={localProvider} targetNetwork={targetNetwork} address={address} />
      )}   */}
      <NetworkDisplay
        NETWORKCHECK={NETWORKCHECK}
        localChainId={localChainId}
        selectedChainId={selectedChainId}
        targetNetwork={targetNetwork}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
      />
      <div bg="tomato" width="100%">
        <Container>
          <div>
            <Heading>Cointoss</Heading>

            <Flex spacing={3}>
              <Text>Bank {Bankbalance.label} Balance: </Text>
              <Text> {Bankbalance.balance} </Text>
            </Flex>
            <Flex width="100%" alignItems="center" gap={2}>
              <Stack spacing={3}>
                <Select
                  height={16}
                  width={60}
                  placeholder="Select asset"
                  value={wagetInputs.tokenAddress}
                  onChange={e => {
                    setWagertInputs({ ...wagetInputs, tokenAddress: e.target.value });
                  }}
                >
                  {tokensaddress.map(op => {
                    return <option value={op.value}>{op.label}</option>;
                  })}
                </Select>

                <Select
                  height={16}
                  width={60}
                  placeholder="Select Coin or Tail"
                  value={wagetInputs.face}
                  onChange={e => {
                    setWagertInputs({ ...wagetInputs, face: e.target.value });
                  }}
                >
                  {coinortail.map(op => {
                    return <option value={op.value}>{op.label}</option>;
                  })}
                </Select>
              </Stack>
              <Stack spacing={3}>
                <Input
                  type="number"
                  placeholder="bet amount"
                  height={16}
                  width={60}
                  onChange={e => {
                    setWagertInputs({ ...wagetInputs, tokenAmount: e.target.value });
                  }}
                />
                <Button
                  height={16}
                  width={60}
                  bgGradient="linear(to-r, teal.500, green.500)"
                  _hover={{
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                  }}
                  onClick={PlayWager}
                >
                  {" "}
                  Play{" "}
                </Button>
              </Stack>
            </Flex>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
