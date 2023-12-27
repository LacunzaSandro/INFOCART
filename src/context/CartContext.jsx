import { createContext, useReducer, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext();

const actions = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY", // Agregada la acción para actualizar la cantidad
  CLEAR_CART: "CLEAR_CART",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return { ...state, items: [...state.items] };
      } else {
        return {
          ...state,
          items: [...state.items, { id: action.payload, quantity: 1 }],
        };
      }
    }
    case actions.REMOVE_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          return {
            ...state,
            items: state.items.filter((item) => item.id !== action.payload),
          };
        }
      }
      return { ...state, items: [...state.items] };
    }

    case actions.CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export default function CartProvider({ children }) {
  const { user } = useAuthContext();
  const initial = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || {
    items: [],
  };
  const [cartState, dispatch] = useReducer(cartReducer, initial);

  useEffect(() => {
    const storedCart = user?.id
      ? JSON.parse(localStorage.getItem(`cart_${user.id}`)) || { items: [] }
      : { items: [] };

    if (storedCart) {
      dispatch({ type: actions.RESTORE_CART, payload: storedCart });
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartState));
    }
  }, [cartState, user]);
  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};
