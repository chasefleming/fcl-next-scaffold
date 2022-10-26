import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  const { user } = useCurrentUser()

  return (
    <div className={styles.navbar}>
      {!user.loggedIn && 
        <button 
          onClick={fcl.authenticate} 
          className={styles.button}>
          Log In With Wallet
        </button>
      }
      {user.loggedIn && 
        (
          <>
            <div className={styles.address}>{ user?.addr }</div>
            <button 
              onClick={fcl.unauthenticate} 
              className={styles.button}>
              Log Out
            </button>
          </>
        )
      }
    </div>
  )
}