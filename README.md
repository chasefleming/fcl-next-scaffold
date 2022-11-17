This is a scaffold for an FCL NextJS Dapp on the Flow Blockchain.

This scaffold provides:

- FCL setup and configuration for all networks
- Discovery for wallet integration (including Emulator)
- Flow.json loading for contract placeholders
- Authentication
- CDC file loader
- Custom hooks

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