import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'

export default function useConfig() {
  const [network, setNetwork] = useState()

  useEffect(() => {
    async function getConfig() {
      const flowNetwork = await fcl.config.get('flow.network')
      setNetwork(flowNetwork)
    }
    getConfig()
  }, [])

  return { network }
}