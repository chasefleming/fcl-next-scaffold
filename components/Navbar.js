import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <button className={styles.button}>Log In With Wallet</button>
    </div>
  )
}