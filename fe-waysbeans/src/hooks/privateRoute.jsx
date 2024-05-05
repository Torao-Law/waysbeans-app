import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../stores/userContext";

export const PrivateRoute = () => {
  const [state] = useContext(UserContext);

  if (!state.isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export function PrivateRouteUser() {
  const [state] = useContext(UserContext);

  if (state?.user?.status === "admin") {
    return <Navigate to="/product-admin" />;
  }
  return <Outlet />;
}

export function PrivateRouteAdmin() {
  const [state] = useContext(UserContext);

  if (state?.user?.status !== "admin") {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
}
