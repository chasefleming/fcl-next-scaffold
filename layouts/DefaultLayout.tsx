import Navbar from "../components/Navbar";
import FlowProviderWrapper from "../providers/FlowProviderWrapper";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowProviderWrapper>
      <Navbar />
      <main>{children}</main>
    </FlowProviderWrapper>
  );
}
