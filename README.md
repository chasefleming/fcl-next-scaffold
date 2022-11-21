This is a scaffold for an FCL NextJS Dapp on the Flow Blockchain.

## Features Provided

- FCL setup and configuration
- Discovery for wallet integration (including Emulator)
- Flow.json loading for contract placeholders
- Authentication
- CDC file loader
- Custom hooks
- Deployment 

## Featues TODO

- Testnet account setup
- Testnet deployment
- Mainnet deployment
- JS Testing

## Running the App

### Local with Dev Wallet and the Emulator

In one terminal, run emulator: 

```bash
flow emulator start
```

Then, in another terminal, run Dev Wallet:

```bash
flow dev-wallet
```

```bash
npm run dev:local:deploy
```

### Testnet

```bash
npm run dev:testnet
```

### Mainnet

```bash
npm run dev:mainnet
```