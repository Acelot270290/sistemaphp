import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import DefaultLayout from "../layouts/Default";
import { GlobalStyleDefault } from "../layouts/Default/global";

export function PrivateRoute({ children }) {
  const authUser = useAppSelector((state) => state.auth.userData);

  const Layout = DefaultLayout;
  const GlobalStyle = GlobalStyleDefault;

  if (!authUser?.token) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </>
  );
}
