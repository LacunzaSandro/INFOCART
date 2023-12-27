import { Navigate, Outlet, useLocation } from "react-router-dom";
import { HOME, LOGIN } from "../config/paths";
import { useAuthContext } from "../context/AuthContext";

export default function PublicRoute() {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (
    isAuthenticated &&
    (location.pathname === LOGIN || location.pathname === "/register")
  ) {
    return <Navigate to={HOME} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
