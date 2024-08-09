# Storage and increment app on Fuel Blockchain
 
This is a simple dapp which implements the Storage Counter contract 

This is a simple dapp that allows users to increment the current value of the storage variable and assign a new value to the storage variable.

There is no CSS implemented in this app since this app mostly explains how the functions and methods are implemented in javascript

## Smart contract writing process
First, I wrote the smart contract in solidity and then used the transpiler provided in the Sway playground to convert it into its corresponding sway code and then deployed it on the testnet using my Fuel Wallet.

The reason I merged the Storage and Counter contracts and created one single contract which does both is so that we can understand how to call a parameterized and non-parameterized function

## Getting started
1. Clone the repository
   ```sh
   git clone https://github.com/Shoydon/Storage-increment-app-on-Fuel-Blockchain.git
   ```
2. Install the required libraries
   ```sh
   npm i
   ```
3. Run the app
   ```sh
   npm start
   ```

    `Note: There is some error in the latest versions of the node modules @fuels/connectors and @fuels/react.`

    `We need to strictly install @fuels/connectors@0.5.0 and @fuels/react@0.20.0`

* Required npm modules 
  ```sh
  fuels 
  @fuels/connectors@0.5.0 
  @fuels/react@0.20.0 
  @tanstack/react-query
  ```

## Working of the App:
The app is pretty straightforward. 

The App.js contains the entire logic of the application.

`contract` folder contains the solidity contract and its sway equivalent code

`contract.json` contains the abi and address of the contract deployed on the Fuel Testnet

### There is 1 input field and 3 buttons:

#### 1. Input field: `Input the value which you want to store`

#### 2. Store Value button: `Calls the set_value function to store the new value`

#### 3. Increment Value button: `Calls the increment_value function to increment the current value`

#### 4. Retrieve Value button: `Calls the get_value function to display the current value`

## Built with
- [ReactJs](https://react.dev/) - JavaScript library for building user interfaces.
- [Solidity](https://docs.soliditylang.org/en/v0.8.23/) - Solidity is a programming language used to build smart contracts on EVM based blockchains.
- [Hardhat](https://hardhat.org/) - Development environment for building and deploying smart contracts on testnets.
- [Sway playground](https://www.sway-playground.org/) - Sway Playground is an online environment for experimenting with and learning the Sway programming language.
- [Fuel Wallet](https://wallet.fuel.network/docs/install/) - With the Fuel Wallet, you can explore DApps on Fuel and manage your crypto assets,
all in one place.
- [Typescript SDK](https://docs.fuel.network/docs/fuels-ts/) - The Fuel TypeScript SDK provides methods and utilities in TypeScript, for developing on or interacting with the Fuel network and its ecosystem.
- [Wallet SDK](https://docs.fuel.network/docs/wallet/install/) - The Fuel Wallet SDK provides methods and utilities to connect with the wallets compatible with the Fuel network and its ecosystem.