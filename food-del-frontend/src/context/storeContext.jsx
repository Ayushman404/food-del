import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (foodId) => {
    if (!cartItems[foodId]) {
      setCartItems((prev) => ({ ...prev, [foodId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [foodId]: prev[foodId] + 1 }));
    }
  };

  const removeFromCart = (foodId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[foodId] === 1) {
        delete updatedCart[foodId];
      } else {
        updatedCart[foodId] -= 1;
      }

      return updatedCart;
    });
  };

  const getCartValue = (cartItems, food_list) => {
    let total = 0;
    for(const item in cartItems){
      let itemInfo = food_list.find((u)=> u._id === item);
      total += itemInfo.price * cartItems[item]
    }

    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartValue,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
