import { useReducer, useContext, useEffect, createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
  CLEAR_CART,
  REMOVE,
  DECREASE,
  INCREASE,
  LOADING,
  DISPLAY,
} from "./action";
import { getTotal } from "./utilities";

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

const initialState = {
  isLoading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotal(state.cart);

  // clear all cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  //  remove single cart
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  // increase cart
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };
  return (
    <AppContext.Provider
      value={{ ...state, clearCart, remove, increase, decrease, totalAmount,totalCost}}
    >
      {children}
    </AppContext.Provider>
  );
};
