import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'
import ReadHelloWorld from '../cadence/scripts/ReadHelloWorld.cdc'
import UpdateHelloWorld from '../cadence/transactions/UpdateHelloWorld.cdc'
import elementStyles from '../styles/Elements.module.css'
import containerStyles from '../styles/Container.module.css'
import useConfig from '../hooks/useConfig'
import { createExplorerTransactionLink } from '../helpers/links'
import { TransactionExecutionStatus } from '@onflow/typedefs'

export default function Container() {
  const [chainGreeting, setChainGreeting] = useState('?')
  const [userGreetingInput, setUserGreetingInput] = useState('')
  const [lastTransactionId, setLastTransactionId] = useState<string>()
  const [transactionStatus, setTransactionStatus] = useState<string>()
  const { network } = useConfig()

  const isEmulator = (network: string) => network !== 'mainnet' && network !== 'testnet'
  const isExecuted = (statusCode: TransactionExecutionStatus) => statusCode === TransactionExecutionStatus.EXECUTED

  useEffect(() => {
    if (lastTransactionId) {
      console.log('Last Transaction ID: ', lastTransactionId)

      fcl.tx(lastTransactionId).subscribe(res => {
        setTransactionStatus(res.statusString)
  
        // Query for new chain string again if status is executed (soft finality)
        // If we require hard finality, we can wait for the transaction to be sealed instead
        if (isExecuted(res.status)) {
          queryChain()
        }
      })
    }
  }, [lastTransactionId])

  const queryChain = async () => {
    const res = await fcl.query({
      cadence: ReadHelloWorld
    })

    setChainGreeting(res)
  }

  const mutateGreeting = async (event) => {
    event.preventDefault()

    if (!userGreetingInput.length) {
      throw new Error('Please add a new greeting string.')
    }

    const transactionId = await fcl.mutate({
      cadence: UpdateHelloWorld,
      args: (arg, t) => [arg(userGreetingInput, t.String)],
    })

    setLastTransactionId(transactionId)
  }
  
  const openExplorerLink = (transactionId, network) => window.open(createExplorerTransactionLink({ network, transactionId }), '_blank')

  return (
    <div className={containerStyles.container}>
      <h2>Query the Chain</h2>
      <div>
        <button onClick={queryChain} className={elementStyles.button}>Query Greeting</button>
        <h4>Greeting on Chain: { chainGreeting }</h4>
      </div>
      <hr />
      <div>
        <h2>Mutate the Chain</h2>
        {!isEmulator(network) && (
          <h4>Latest Transaction ID: <a className={elementStyles.link} onClick={() => {openExplorerLink(lastTransactionId, network)}}>{ lastTransactionId }</a></h4>
        )}
        <h4>Latest Transaction Status: { transactionStatus }</h4>
        <form onSubmit={mutateGreeting}>
          <label>
            <input
              type='text'
              placeholder='New Greeting'
              value={userGreetingInput}
              onChange={e => setUserGreetingInput(e.target.value)}
              className={elementStyles.input}
            />
          </label>
          <input type='submit' value='Submit' className={elementStyles.button} />
        </form>
      </div>
    </div>
  )
}