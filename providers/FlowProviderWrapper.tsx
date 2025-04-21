"use client";

import React from "react";
import { FlowProvider, FlowNetwork } from "@onflow/kit";
import flowJSON from "../flow.json";
import { ACCESS_NODE_URLS } from "../constants";

const flowNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK as FlowNetwork;

export default function FlowProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowProvider
      config={{
        flowNetwork,
        accessNodeUrl: ACCESS_NODE_URLS[flowNetwork],
        discoveryWallet: `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
        appDetailTitle: "FCL Next Scaffold",
        appDetailIcon: "https://avatars.githubusercontent.com/u/62387156?v=4",
        appDetailUrl: "https://yourapp.com",
        appDetailDescription: "Your app description",
      }}
      flowJson={flowJSON}
    >
      {children}
    </FlowProvider>
  );
}
