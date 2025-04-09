import Navbar from "../components/Navbar";
import { FlowProvider, FlowNetwork } from "@onflow/kit";
import { ACCESS_NODE_URLS } from "../constants";
import flowJSON from "../flow.json";

const flowNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK as FlowNetwork;

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowProvider
      config={{
        flowNetwork,
        accessNodeUrl: ACCESS_NODE_URLS[flowNetwork],
        appDetailTitle: "FCL Next Scaffold", // optional
        appDetailIcon: "https://avatars.githubusercontent.com/u/62387156?v=4", // optional
        appDetailUrl: "https://yourapp.com", // optional
        appDetailDescription: "Your app description", // optional
      }}
      flowJson={flowJSON}
    >
      <Navbar />
      <main>{children}</main>
    </FlowProvider>
  );
}
