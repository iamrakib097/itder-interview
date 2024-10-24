import React, { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      if (state.cartItems.length > 0) {
        toast.error("You can only add one course to the cart at a time!");
        return state;
      }
      return {
        ...state,
        cartItems: [{ ...action.payload, quantity: 1 }],
      };
    case "REMOVE_COURSE":
      return {
        ...state,
        cartItems: [],
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addCourseToCart = (course) => {
    dispatch({ type: "ADD_COURSE", payload: course });
  };

  const removeCourseFromCart = () => {
    dispatch({ type: "REMOVE_COURSE" });
  };

  const updateCourseQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addCourseToCart,
        removeCourseFromCart,
        updateCourseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
