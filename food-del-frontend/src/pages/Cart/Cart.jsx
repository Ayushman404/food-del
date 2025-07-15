import React, { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

const cartTitles = ["Items", "Title", "Price", "Quantity", "Total", "Remove"];

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getCartValue } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
   <div className="w-full flex flex-col min-h-[81vh] px-4 md:px-10 py-6 mt-[7vh] gap-6">
  {/* Cart Header Titles */}
  <div className="hidden md:grid grid-cols-6 gap-6 w-full text-slate-700 font-bold text-lg px-2">
    {cartTitles.map((title, index) => (
      <p key={index}>{title}</p>
    ))}
  </div>
  <hr className="hidden md:block border-slate-300" />

  {/* Cart Items */}
  <div className="w-full flex flex-col gap-4 overflow-y-auto">
    {Object.keys(cartItems).length === 0 ? (
      <div className="flex justify-center items-center min-h-[40vh] text-xl font-semibold text-slate-600">
        Your Cart is Empty
      </div>
    ) : (
      Object.keys(cartItems).map((foodId, index) => {
        const foodItem = food_list.find((item) => item._id === foodId);
        if (!foodItem) return null;

        return (
          <div
            key={foodId}
            className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center bg-white shadow-md p-4 rounded-xl"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/${foodItem.image}`}
              alt={foodItem.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <p className="font-semibold text-slate-800">{foodItem.name}</p>
            <p className="font-semibold text-slate-700 hidden md:block">₹{foodItem.price.toFixed(2)}</p>
            <p className="font-semibold text-slate-700 hidden md:block">{cartItems[foodId]}</p>
            <p className="font-semibold text-slate-700 hidden md:block">
              ₹{(foodItem.price * cartItems[foodId]).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(foodId)}
              className="text-red-500 font-medium border border-red-200 px-3 py-1 rounded-md hover:bg-red-100 transition"
            >
              Remove
            </button>
          </div>
        );
      })
    )}
  </div>

  {/* Totals & Promo Section */}
  <div className="flex flex-col lg:flex-row justify-between gap-6 mt-6 w-full">
    {/* Pricing Summary */}
    <div className="w-full lg:w-2/3 xl:w-1/2 bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-bold text-orange-600 mb-2">Order Summary</h2>
      <div className="flex justify-between border-b py-2 text-slate-700 font-medium">
        <span>Total Items</span>
        <span>
          {Object.keys(cartItems).reduce(
            (total, foodId) => total + cartItems[foodId],
            0
          )}
        </span>
      </div>
      <div className="flex justify-between border-b py-2 text-slate-700 font-medium">
        <span>Total Price</span>
        <span>₹{getCartValue(cartItems, food_list)}</span>
      </div>
      <div className="flex justify-between border-b py-2 text-slate-700 font-medium">
        <span>Delivery Fee</span>
        <span>₹{Object.keys(cartItems).length === 0 ? 0 : 20}</span>
      </div>
      <div className="flex justify-between py-2 text-lg text-slate-900 font-bold">
        <span>Final Price</span>
        <span>
          $
          {Object.keys(cartItems).length === 0
            ? 0
            : getCartValue(cartItems, food_list) + 20}
        </span>
      </div>

      <button
        onClick={() => navigate("/placeorder")}
        className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition mt-4"
      >
        Proceed to Checkout
      </button>
    </div>

    {/* Promo Code Section */}
    <div className="w-full lg:w-1/3 xl:w-1/4 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-800">Have a Promo Code?</h2>
      <input
        type="text"
        placeholder="Enter Promo Code"
        className="border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-slate-400 text-sm"
      />
      <button className="bg-orange-500 text-white font-medium py-2 rounded-md hover:bg-orange-600 transition">
        Apply
      </button>
    </div>
  </div>
</div>

  );
};

export default Cart;
