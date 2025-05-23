import Head from "next/head";
import styles from "../styles/Home.module.css";
import Links from "../components/Links";
import Container from "../components/Container";
import { useCurrentFlowUser } from "@onflow/kit";

export default function Home() {
  const { user } = useCurrentFlowUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>FCL Next Scaffold</title>
        <meta
          name="description"
          content="FCL Next Scaffold for the Flow Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://developers.flow.com/tools/fcl-js">FCL</a> Next
          Scaffold
        </h1>

        <p className={styles.description}>For the Flow Blockchain</p>

        {user?.loggedIn && <Container />}

        <Links />
      </main>
    </div>
  );
}
