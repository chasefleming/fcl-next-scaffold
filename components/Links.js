import styles from '../styles/Home.module.css'

export default function Links() {
  return (
    <div className={styles.grid}>
      <a href="https://developers.flow.com/tools/fcl-js/tutorials/flow-app-quickstart" className={styles.card}>
        <h2>FCL Quickstart &rarr;</h2>
        <p>Get up and running.</p>
      </a>

      <a href="https://developers.flow.com/tools/fcl-js/reference/api" className={styles.card}>
        <h2>API Docs &rarr;</h2>
        <p>Dig deeper into FCL.</p>
      </a>

      <a
        href="https://developers.flow.com/tools/fcl-js/reference/discovery"
        className={styles.card}
      >
        <h2>Wallet Discovery &rarr;</h2>
        <p>Integrate wallets.</p>
      </a>

      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        <h2>Scaffold Repo &rarr;</h2>
        <p>
          View the repo.
        </p>
      </a>
    </div>
  )
}