import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import style from "./Checkout.module.css";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user?.id) {
      dispatch({ type: "CLEAR_CART" });
      navigate("/");
    }
  };

  return (
    <div className={style.CheckoutContainer}>
      {user?.id ? (
        <div className={style.CheckoutCard}>
          <p>¡Muchas gracias por tu compra {user.name}! Te esperamos pronto.</p>
          <div className={style.CheckoutButtonContainer}>
            <button className={style.CheckoutButton} onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        </div>
      ) : (
        <div className={style.CheckoutCard}>
          <p>No puede finalizar la compra si no está autenticado.</p>
          <Link to="/login">
            <button className={style.LoginButton}>
              Ir al inicio de sesión
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
