import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'

export default function useCurrentUser() {
  const [user, setUser] = useState({ loggedIn: null })

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  return user
}