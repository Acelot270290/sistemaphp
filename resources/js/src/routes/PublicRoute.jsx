import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import AuthLayout from "../layouts/Auth";
import { GlobalStyleAuth } from "../layouts/Auth/global";

export function PublicRoute({ children }) {
  const authUser = useAppSelector((state) => state.auth.userData);

  const Layout = AuthLayout;
  const GlobalStyle = GlobalStyleAuth;

  if (authUser && authUser?.token) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </>
  );
}
