import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import navbarStyles from '../styles/Navbar.module.css'
import elementStyles from '../styles/Elements.module.css'

export default function Navbar() {
  const user = useCurrentUser()

  return (
    <div className={navbarStyles.navbar}>
      {!user.loggedIn && 
        <button 
          onClick={fcl.authenticate} 
          className={elementStyles.button}>
          Log In With Wallet
        </button>
      }
      {user.loggedIn && 
        (
          <>
            <div className={navbarStyles.address}>{ user?.addr }</div>
            <button 
              onClick={fcl.unauthenticate} 
              className={elementStyles.button}>
              Log Out
            </button>
          </>
        )
      }
    </div>
  )
}