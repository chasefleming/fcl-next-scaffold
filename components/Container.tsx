import { useState, useEffect } from "react";
import {
  useFlowQuery,
  useFlowMutate,
  useFlowTransaction,
  useFlowConfig,
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

  const isEmulator = (network: string) =>
    network !== "mainnet" && network !== "testnet";

  const {
    data: chainGreeting,
    refetch: refetchGreeting,
    isLoading: isQueryLoading,
  } = useFlowQuery({
    cadence: ReadHelloWorld,
    enabled: true,
  });

  const {
    mutate,
    isPending: isMutating,
    data: transactionId,
    error: mutationError,
  } = useFlowMutate();

  const { transactionStatus } = useFlowTransaction(transactionId || "");

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

  return (
    <div className={containerStyles.container}>
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
    </div>
  );
}
