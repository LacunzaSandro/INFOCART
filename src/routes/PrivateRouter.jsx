// import { Navigate, Outlet } from "react-router-dom";
// import { LOGIN } from "../config/paths";
// import { useAuthContext } from "../context/AuthContext";

// export default function PrivateRoute() {
//   const { isAuthenticated } = useAuthContext();

//   if (!isAuthenticated) {
//     return <Navigate to={LOGIN} />;
//   }

//   return (
//     <div>
//       <Outlet />
//     </div>
//   );
// }
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "../config/paths";
import { useAuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ requiredRoles = [], ...props }) {
  const { isAuthenticated, role } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return <Outlet {...props} />;
}
