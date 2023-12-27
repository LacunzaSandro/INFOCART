import { useLoaderData, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import style from "../../pages/cart/CartView.module.css";

const CartView = () => {
  const { cartState, dispatch } = useCart();
  const loader = useLoaderData();
  const navigate = useNavigate();

  const getProductById = (productId) => {
    return loader.find((product) => product.id === productId);
  };
  const handleCheckoutClick = () => {
    navigate("/checkout");
  };
  const calcularTotal = () => {
    let total = 0;
    cartState.items.forEach((itemId) => {
      const product = getProductById(itemId.id);
      if (product && product.price) {
        total += product.price * itemId.quantity;
      }
    });
    return total;
  };
  const handleAddUnit = (itemId) => {
    dispatch({ type: "ADD_ITEM", payload: itemId });
  };

  const handleRemoveUnit = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  };
  return (
    <div className={style.Order}>
      <div className={style.CartContainer}>
        <div className={style.Products}>
          {cartState.items.length === 0 ? (
            <div className={style.emptyContainer}>
              <img className={style.EmptyCartImg} src="cart-empty.png"></img>
              <p className={style.EmptyCartText}>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <h1>Your Cart</h1>
              <ul>
                <li className={style.HeaderItem}>
                  <div className={style.Item}>
                    <p>Quantity</p>
                    <p className={style.productoTitle}>Product</p>
                    <p>Price</p>
                    <p>Actions</p>
                    <p>Total</p>
                  </div>
                </li>

                {cartState.items.map((itemId) => {
                  const product = getProductById(itemId.id);
                  console.log(product);
                  return (
                    <li key={itemId.id}>
                      {product && (
                        <div className={style.Item}>
                          <p className={style.CartText}>{itemId.quantity}</p>
                          <p className={style.CartTexttitle}>{product.title}</p>
                          <p className={style.CartText}>${product.price}</p>
                          <p className={style.CartText}>
                            <button
                              className={style.btnAddOrMinQuantity}
                              onClick={() => handleRemoveUnit(itemId.id)}
                            >
                              -
                            </button>
                            {itemId.quantity}
                            <button
                              className={style.btnAddOrMinQuantity}
                              onClick={() => handleAddUnit(itemId.id)}
                            >
                              +
                            </button>
                          </p>
                          <p className={style.CartText}>
                            ${product.price * itemId.quantity}
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <div className={style.SummaryContainer}>
          {cartState.items.length > 0 && (
            <div className={style.Summary}>
              <h3>Order Summary</h3>
              <div className={style.summaryDetails}>
                <p>
                  <strong>Subtotal:</strong>
                </p>
                <p>${calcularTotal()}</p>
              </div>
              <div className={style.summaryDetails}>
                <p>
                  <strong>Shipping</strong>
                </p>
                <p>This article has free shipping</p>
              </div>
              <div className={style.Separate}></div>
              <div className={style.summaryDetails}>
                <p>
                  <strong>Total</strong>
                </p>
                <p>${calcularTotal()}</p>
              </div>
              <button
                className={style.BtnCheckout}
                onClick={() => handleCheckoutClick()}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartView;
