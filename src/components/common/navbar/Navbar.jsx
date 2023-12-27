import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import style from "./Navbar.module.css";
import { useAuthContext } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import "./active.css"

const NavBar = () => {
  const { isAuthenticated } = useAuthContext();
  const { cartState } = useCart();
  const { items } = cartState;
  
  return (
    <header className={style.appHeader}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/login" state={{ from: location.pathname }}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" state={{ from: location.pathname }}>
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          {/* Opcionalmente, también puedes mostrar otros elementos según el estado de autenticación del usuario */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/private/logout">Logout</NavLink>
              </li>
              <li
                className={
                  items.length === 0 ? style.cart : style.cartWithProduct
                }
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  beat
                  size="xl"
                  style={{ color: "#ccc", animation: "none" }}
                />
                <div>{items?.length || 0}</div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
