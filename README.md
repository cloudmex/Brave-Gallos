# Brave Galos 🐔  X  🏗 Scaffold-ETH

> everything you need to build and deploy on BNB! 🚀

# 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

🚨 If you are using a version < v18 you will need to remove `openssl-legacy-provider` from the `start` script in `package.json`

> clone/fork Brave Galos 🐔 :

```bash
git clone https://github.com/cloudmex/Brave-Gallos.git
```

> install and start your own local 👷‍ Hardhat chain:

```bash
cd brave-galos 
yarn install
yarn chain
```

> in a second terminal window, start the 📱 frontend:

```bash
cd brave-galos 
yarn start
```
📱 Open http://localhost:3000 to see the app

> in a third terminal window, 🛰 deploy your contract:

```bash
cd brave-galos 
yarn deploy
```

🔏 Edit / Create smart contracts  in `packages/hardhat/contracts`

📝 Edit the frontend `App.jsx` in `packages/react-app/src`

💼 Edit the deployment script in `packages/hardhat/deploy`

🌍 You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

📣 Make sure you update the `InfuraID` before you go to production. Huge thanks to [Infura](https://infura.io/) for our special account that fields 7m req/day!

# 🏃💨 Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.
