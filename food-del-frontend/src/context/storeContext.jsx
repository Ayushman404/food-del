import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (foodId) => {
    if (!token) {
      toast.error("No token found, user not authenticated");
      return;
    }

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, { itemId: foodId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      }).then((response) => {
        if(response.data.success){
          toast.success(response.data.messsage);
        }
        else{
          toast.error(response.data.messsage);
        }
      }).catch((error) => {
        console.error("Error adding to cart:", error);
      })


    if (!cartItems[foodId]) {
      setCartItems((prev) => ({ ...prev, [foodId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [foodId]: prev[foodId] + 1 }));
    }
  };

  const removeFromCart = async (foodId) => {

    if(!token){
      return console.error("No token found, user not authenticated");
    }

    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, { itemId: foodId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if(response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    }).catch((error) => {
      console.error("Error removing from cart:", error);
    });


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

  const loadCartItems = async () => {
    if (!token) {
      console.error("No token found, user not authenticated");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.data);
      } else {
        console.error("Error fetching cart items:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  

  const fetchFoodList = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/food/list`);
      setFoodList(response.data.data);
      console.log("Food List:", response.data.data[0]);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    fetchFoodList();
    loadCartItems();
  }, []);

    const getCartValue = (cartItems, food_list) => {
    let total = 0;
    for(const item in cartItems){
      let itemInfo = food_list.find((u)=> u._id === item);
      if(!itemInfo) continue; // Skip if item not found in food_list
      total += itemInfo.price * cartItems[item]
    }

    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    token,
    setToken,
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
