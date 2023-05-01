This is a scaffold for an FCL NextJS Dapp on the Flow Blockchain.

## Features Provided

- FCL setup and configuration
- Wallet Discovery (including Dev Wallet on Emulator)
- CLI private key separation for security
- Flow.json loading for contract placeholders
- Authentication
- CDC file loader
- Custom hooks
- Deployment 

## Featues TODO

- Mainnet deployment
- JS Testing

## Running the App

First run:

```
npm install
```

### Local with Flow Dev, the Emulator, and Dev Wallet

Run the following to run Flow Dev, the Emulator, and Dev Wallet:

```bash
npm run dev:local
```

Note: Flow Dev will will automatically create new accounts and deploy for you while developing. Your flow.json will be updated automatically. Committing these changes for local development is unncessary.

### Testnet

If you haven't yet created a testnet account, in the CLI run:

```
flow accounts create
```

Follow the steps and select testnet. This will create a `testnet-account.private.json` file.

Then in `flow.json`, add your testnet address prefixed with an `0x` as an alias for `testnet` just like `emulator`.

You'll also need to add your new testnet account to your flow.json:

```
// Inside of "accounts"
"testnet-account": {
	"fromFile": "./testnet-account.private.json"
}
```

And add a deployment for this account:

```
// Inside of "deployments"
"testnet": {
  "testnet-account": [
    "HelloWorld"
  ]
}
```

Then run:

```
npm run dev:testnet:deploy
``` 

Whenever you need to redeploy changed contracts to Testnet, you can run:

```
npm run dev:testnet:update
```