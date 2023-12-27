import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";


const MY_AUTH_APP = "MY_AUTH_APP";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    window.localStorage.getItem(MY_AUTH_APP)
  );

  const [role, setRole] = useState(
    () => window.localStorage.getItem("role") || "user"
  );
  const [user, setUser] = useState(
    () => JSON.parse(window.localStorage.getItem("user")) || "user"
  );
  const login = useCallback(function (user) {
    window.localStorage.setItem(MY_AUTH_APP, true);
    window.localStorage.setItem("token", user.token);
    window.localStorage.setItem("refresh_token", user.refresh_token);
    window.localStorage.setItem("role", user.role || "user");
    window.localStorage.setItem("user", JSON.stringify(user.user) || "user");
    setIsAuthenticated(true);
    setRole(user.role || "user");
    setUser(user.user || "Unknow");
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_AUTH_APP);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refresh_token");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("user");
    setIsAuthenticated(false);
    setRole("user");
    setUser("");
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      role,
      user,
    }),
    [isAuthenticated, login, logout, role, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
