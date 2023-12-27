import style from "./ProductCard.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/CartContext.jsx";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product, onDelete }) => {
  const { isAuthenticated, role } = useAuthContext();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const defaultImage =
    "https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6-300x188.png.webp";

  const handleViewClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  const handleAddProductoCart = (productId) => {
    if (isAuthenticated) {
      dispatch({ type: "ADD_ITEM", payload: productId });
    } else {
      navigate("/login");
    }
  };
  return (
    <li key={product.id}>
      <div className={style.card}>
        <img src={product.images[0] || defaultImage} alt={product.title} />
        <div className={style.cardContent}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className={style.price}>${product.price}</p>

          {isAuthenticated && role === "admin" ? (
            <div className={style.buttonContainer}>
              <Link
                to={`/product/${product.id}/edit`}
                state={product}
                className={style.a}
              >
                <button>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    beat
                    style={{ color: "#fff", animation: "none" }}
                  />
                </button>
              </Link>
              <button
                className={style.button}
                onClick={() => onDelete(product.id)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  beat
                  style={{ color: "#fff", animation: "none" }}
                />
              </button>
              <button
                className={style.button}
                onClick={() => handleViewClick(product.id)}
                title="Ver"
              >
                <FontAwesomeIcon
                  icon={faEye}
                  beat
                  style={{ color: "#fff", animation: "none" }}
                />
              </button>
            </div>
          ) : (
            <button
              className={style.buttonRight}
              onClick={() => handleViewClick(product.id)}
              title="Ver"
            >
              <FontAwesomeIcon
                icon={faEye}
                beat
                style={{ color: "#fff", animation: "none" }}
              />
            </button>
          )}
          <button
            className={style.fullWidthButton}
            onClick={() => handleAddProductoCart(product.id)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
