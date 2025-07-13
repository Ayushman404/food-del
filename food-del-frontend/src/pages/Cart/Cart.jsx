import React, { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

const cartTitles = ["Items", "Title", "Price", "Quantity", "Total", "Remove"];

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getCartValue } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col min-h-[81vh]">
      <div className="grid grid-cols-6 gap-6 w-full items-center p-2 overflow-y-scroll">
        {cartTitles.map((title, index) => (
          <p key={index} className="text-slate-700 text-lg font-semibold">
            {title}
          </p>
        ))}
      </div>
      <hr />

      <div>
        {Object.keys(cartItems).length === 0 ? (
          <div className="flex items-center justify-center">
            <h1>Your Cart is Empty</h1>
          </div>
        ) : (
          Object.keys(cartItems).map((foodId, index) => {
            const foodItem = food_list.find((item) => item._id === foodId);
            if (!foodItem) return null; // Skip if food item not found

            return (
              <div
                key={foodId}
                className="grid grid-cols-6 gap-6 p-2 items-center"
              >
                <img
                  src={foodItem.image}
                  alt={index + 1}
                  className="w-20 h-15 object-cover rounded-lg"
                />
                <p className="text-slate-700 text-lg font-semibold">
                  {foodItem.name}
                </p>
                <p className="text-slate-700 text-lg font-semibold">
                  ${foodItem.price.toFixed(2)}
                </p>
                <p className="text-slate-700 text-lg font-semibold">
                  {cartItems[foodId]}
                </p>
                <p className="text-slate-700 text-lg font-semibold">
                  ${(foodItem.price * cartItems[foodId]).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(foodId)}
                  className="px-2 py-1 border w-fit rounded-lg text-red-500 hover:bg-red-500/20 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-10 items-center justify-evenly">
        <div className="w-[40vw] bg-orange-500/10 flex flex-col gap-4 rounded-2xl p-3">
          <div className="flex justify-between px-4 border-b">
            <p className="text-slate-700 text-lg font-semibold">Total Items:</p>
            <p className="text-slate-700 text-lg font-semibold">
              {" "}
              {Object.keys(cartItems).reduce((total, foodId) => (
                total + cartItems[foodId]
              ),0)}
            </p>
          </div>
          <div className="flex justify-between px-4 border-b">
            <p className="text-slate-700 text-lg font-semibold">
              {" "}
              Total Price:{" "}
            </p>
            <p className="text-slate-700 text-lg font-semibold">
              $
              {getCartValue(cartItems, food_list)}
            </p>
          </div>
          <div className="flex justify-between px-4 border-b">
            <p className="text-slate-700 text-lg font-semibold">Delivery Fee:</p>
            <p className="text-slate-700 text-lg font-semibold">${Object.keys(cartItems).length == 0 ? 0 : 20}</p>
          </div>
          <div className="flex justify-between px-4 border-b">
            <p className="text-slate-700 text-lg font-semibold">Final Price:</p>
            <p className="text-slate-700 text-lg font-semibold">
              $
              {Object.keys(cartItems).length == 0 ? 0 : getCartValue(cartItems, food_list) + 20}
            </p>
          </div>

          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mt-2 cursor-pointer"
            onClick = { ()=> navigate('/placeorder')}>
            Checkout
          </button>
        </div>

        <div className="w-[30vw] border flex gap-4 rounded-2xl p-3">
          <h1 className="text-slate-700 text-lg font-semibold ">
            Apply Promo Code
          </h1>
          <input
            type="text"
            placeholder="Enter Promo Code"
            className="border p-2 rounded-lg w-[20vw] text-slate-700"
          />
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 mt-2">
            Apply   
          </button>

        </div>
      </div>
    </div>
  );
};

export default Cart;
