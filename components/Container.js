import * as fcl from "@onflow/fcl"
import { useState } from "react"
import ReadHelloWorld from '../cadence/scripts/ReadHelloWorld.cdc'
import UpdateHelloWorld from '../cadence/transactions/UpdateHelloWorld.cdc'
import elementStyles from '../styles/Elements.module.css'
import containerStyles from '../styles/Container.module.css'

export default function Container() {
  const [chainGreeting, setChainGreeting] = useState('?')
  const [userGreetingInput, setUserGreetingInput] = useState('')
  const [transactionStatus, setTransactionStatus] = useState('N/A')

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
      args: (arg, t) => [arg(userGreetingInput, t.String)]
    })

    fcl.tx(transactionId).subscribe(res => {
      setTransactionStatus(res.statusString)

      // Query for new chain string again if status is sealed
      if (res.status === 4) { // 4: 'SEALED'
        queryChain()
      }
    })
  }

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
        <h4>Latest Transaction Status: { transactionStatus }</h4>
        <form onSubmit={mutateGreeting}>
          <label>
            <input
              type="text"
              placeholder="New Greeting"
              value={userGreetingInput}
              onChange={e => setUserGreetingInput(e.target.value)}
              className={elementStyles.input}
            />
          </label>
          <input type="submit" value="Submit" className={elementStyles.button} />
        </form>
      </div>
    </div>
  )
}