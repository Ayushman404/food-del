import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
// import { food_list } from "../../assets/frontend_assets/assets";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const { cartItems, removeFromCart, getCartValue, food_list } = useContext(StoreContext);

  const totalItems = Object.keys(cartItems).reduce(
    (total, foodId) => total + cartItems[foodId],
    0
  );
  const totalPrice = getCartValue(cartItems, food_list) + 20;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    alert("Proceeding to Payment...");
    // Redirect to payment page or handle logic
  };

  return (
    <div className="min-h-[90vh] pt-[12vh] px-4 md:px-12 pb-12 bg-gray-50 flex flex-col md:flex-row gap-8">

  {/* 📦 LEFT: Delivery Form */}
  <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8">
    <h2 className="text-2xl font-bold text-orange-600 mb-6">Delivery Information</h2>
    <form className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-slate-700"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-slate-700"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-slate-700"
        value={formData.phone}
        onChange={handleChange}
      />
      <textarea
        name="address"
        placeholder="Complete Address"
        rows={3}
        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-slate-700"
        value={formData.address}
        onChange={handleChange}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-slate-700"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-slate-700"
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>
    </form>
  </div>

  {/* 🧾 RIGHT: Order Summary */}
  <div className="w-full md:w-[40%] flex flex-col gap-6">
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 h-[60vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Order Summary</h2>

      {Object.keys(cartItems).length === 0 ? (
        <div className="flex items-center justify-center h-full text-lg font-semibold text-slate-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.keys(cartItems).map((foodId) => {
            const foodItem = food_list.find((item) => item._id === foodId);
            if (!foodItem) return null;

            return (
              <div
                key={foodId}
                className="flex justify-between items-center gap-2 text-sm border-b pb-3"
              >
                <div className="flex flex-col w-[40%] text-slate-700 font-medium">
                  <span>{foodItem.name}</span>
                  <span className="text-xs text-slate-500">x{cartItems[foodId]}</span>
                </div>
                <p className="text-slate-600 font-semibold">₹{foodItem.price.toFixed(2)}</p>
                <p className="text-slate-700 font-bold">
                  ₹{(foodItem.price * cartItems[foodId]).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(foodId)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>

    {/* 📊 Totals + CTA */}
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <div className="flex justify-between text-slate-700">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between font-semibold text-slate-800">
        <span>Total Price</span>
        <span>₹{totalPrice}</span>
      </div>

      <button
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
        onClick={handleProceed}
      >
        Proceed to Payment
      </button>
    </div>
  </div>
</div>

  );
};

export default PlaceOrder;
