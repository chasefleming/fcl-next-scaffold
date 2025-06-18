import { useState, useEffect } from "react";
import {
  useFlowQuery,
  useFlowMutate,
  useFlowTransactionStatus,
  useFlowConfig,
  useFlowRevertibleRandom,
} from "@onflow/kit";
import ReadHelloWorld from "../cadence/scripts/ReadHelloWorld.cdc";
import UpdateHelloWorld from "../cadence/transactions/UpdateHelloWorld.cdc";
import elementStyles from "../styles/Elements.module.css";
import containerStyles from "../styles/Container.module.css";
import { createExplorerTransactionLink } from "../helpers/links";

export default function Container() {
  const [userGreetingInput, setUserGreetingInput] = useState("");
  const [lastTransactionId, setLastTransactionId] = useState<string>();
  const { flowNetwork } = useFlowConfig();

  // Section: Hello World Query
  const {
    data: chainGreeting,
    refetch: refetchGreeting,
    isLoading: isQueryLoading,
  } = useFlowQuery({
    cadence: ReadHelloWorld,
    query: { enabled: true },
  });

  const {
    mutate,
    isPending: isMutating,
    data: transactionId,
    error: mutationError,
  } = useFlowMutate();

  const { transactionStatus } = useFlowTransactionStatus({
    id: transactionId || "",
  });

  // Refetch greeting after transaction seals
  useEffect(() => {
    if (transactionId && transactionStatus?.status === 4) {
      refetchGreeting();
    }
  }, [transactionStatus?.status, transactionId, refetchGreeting]);

  const mutateGreeting = (event: React.FormEvent) => {
    event.preventDefault();
    if (!userGreetingInput.length) {
      alert("Please add a new greeting string.");
      return;
    }
    mutate({
      cadence: UpdateHelloWorld,
      args: (arg, t) => [arg(userGreetingInput, t.String)],
    });
    setLastTransactionId(transactionId);
  };

  const openExplorerLink = () => {
    if (lastTransactionId) {
      window.open(
        createExplorerTransactionLink({
          flowNetwork,
          transactionId: lastTransactionId,
        }),
        "_blank",
      );
    }
  };

  const {
    data: randomResults,
    refetch: refetchRandom,
    isLoading: isRandomLoading,
    error: randomError,
  } = useFlowRevertibleRandom({ max: "100", count: 3 });

  const isEmulator = (network: string) =>
    network !== "mainnet" && network !== "testnet";

  return (
    <div className={containerStyles.container}>
      {/* Query the Chain */}
      <h2>Query the Chain</h2>
      <div>
        <button
          onClick={() => refetchGreeting()}
          className={elementStyles.button}
        >
          Query Greeting
        </button>
        <h4>
          Greeting on Chain:{" "}
          {isQueryLoading ? "Loading..." : String(chainGreeting ?? "?")}
        </h4>
      </div>

      <hr />

      {/* Mutate the Chain */}
      <div>
        <h2>Mutate the Chain</h2>
        {!isEmulator(flowNetwork) && lastTransactionId && (
          <h4>
            Latest Transaction ID:{" "}
            <a className={elementStyles.link} onClick={openExplorerLink}>
              {lastTransactionId}
            </a>
          </h4>
        )}
        <h4>
          Latest Transaction Status:{" "}
          {transactionStatus?.statusString || "No transaction yet"}
        </h4>
        <form onSubmit={mutateGreeting}>
          <label>
            <input
              type="text"
              placeholder="New Greeting"
              value={userGreetingInput}
              onChange={(e) => setUserGreetingInput(e.target.value)}
              className={elementStyles.input}
            />
          </label>
          <input
            type="submit"
            value={isMutating ? "Submitting..." : "Submit"}
            className={elementStyles.button}
            disabled={isMutating}
          />
        </form>
        {mutationError && (
          <p style={{ color: "red" }}>Error: {mutationError.message}</p>
        )}
      </div>

      <hr />

      {/* Random UInt256 Test */}
      <h2>Random Number Test</h2>
      <button onClick={refetchRandom} className={elementStyles.button}>
        Generate 3 Random Numbers
      </button>

      {isRandomLoading && <p>Loading random numbers…</p>}
      {randomError && (
        <p style={{ color: "red" }}>Error: {randomError.message}</p>
      )}

      {!isRandomLoading && !randomError && (
        <ul>
          {randomResults?.map((r, idx) => (
            <li key={idx}>
              <strong>#{idx + 1}</strong>: value = {r.value}, blockHeight = 
              {r.blockHeight}
            </li>
          )) ?? <li>No results</li>}
        </ul>
      )}
    </div>
  );
}
