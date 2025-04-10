This is a scaffold for an a NextJS App on the Flow Blockchain. It uses `@onflow/kit` which is a React library built on top of [FCL](https://github.com/onflow/fcl-js)

## Features Provided

- `@onflow/kit` setup and configuration
- Wallet Discovery (including Dev Wallet on Emulator)
- CLI private key separation for security
- Flow.json loading for contract placeholders
- Authentication
- CDC file loader
- Custom hooks

## Requirements

- Node.js
- [Flow CLI](https://docs.onflow.org/flow-cli/install/)

## Running the App

First run the Emulator:

```
flow emulator
```

Then run dev wallet for local wallet usage:

```
flow dev-wallet
```

Then run the app:

```
npm run dev:local
```
```
npm run dev:emulator
```

### Running Tesnet

Run the following the Emulator:

```bash
npm run dev:local
```

### Testnet

To run against an already deployed contract on Testnet with a non-dev wallet, you can use the following command:

```
npm run dev:testnet
```

## Learning More

To learn more about Flow, Flow CLI, and front end development on Flow, check out the [Getting Started](https://developers.flow.com/build/getting-started/contract-interaction) guide.
