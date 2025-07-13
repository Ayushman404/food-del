import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { food_list } from "../../assets/frontend_assets/assets";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const { cartItems, removeFromCart, getCartValue } = useContext(StoreContext);

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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Left: Address Form */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 border rounded"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Full Address"
            className="w-full p-3 border rounded"
            rows={3}
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 border rounded"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full p-3 border rounded"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className=" w-full md:w-1/3 flex flex-col gap-3">
        <div className="w-full bg-white p-6 rounded-xl shadow-md h-[60vh] overflow-y-scroll">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {Object.keys(cartItems).length === 0 ? (
            <div className="flex items-center justify-center h-[50vh]">
              <h1>Your Cart is Empty</h1>
            </div>
          ) : (
            Object.keys(cartItems).map((foodId, index) => {
              const foodItem = food_list.find((item) => item._id === foodId);
              if (!foodItem) return null; // Skip if food item not found

              return (
                <div
                  key={foodId}
                  className="grid grid-cols-5 gap-6 p-2 items-center"
                >
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
          <hr className="my-4" />
        </div>
        <div>
          <div className="flex justify-between text-lg font-medium">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between text-xl font-semibold mt-2">
            <span>Total Price:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold"
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
