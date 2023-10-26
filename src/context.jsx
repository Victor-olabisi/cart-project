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

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();



export const useGlobalContext = () => useContext(AppContext);

const initialState = {
  isLoading: false,
  cart: new Map(),
};
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCart = async () => {
    dispatch({type:LOADING})
    const resp = await fetch(url)
    if (!resp.ok) {
      throw new Error('invalid url')
      return
    } 
    const response = await resp.json()
    dispatch({type:DISPLAY, payload:{cart:response}})
  }

  useEffect(() => {
    fetchCart()
  },[])

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
    // decrese cart
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
