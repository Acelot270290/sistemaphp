import PublicLayout from "../layouts/Public";
import { GlobalStylePublic } from "../layouts/Public/global";

export function PublicDefaultRoute({ children }) {
  const Layout = PublicLayout;
  const GlobalStyle = GlobalStylePublic;

  return (
    <>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </>
  );
}
