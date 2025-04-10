import { BLOCK_EXPLORER_URLS } from "../constants";

export const createExplorerTransactionLink = ({ flowNetwork, transactionId }) =>
  `${BLOCK_EXPLORER_URLS[flowNetwork]}/transaction/${transactionId}`;
