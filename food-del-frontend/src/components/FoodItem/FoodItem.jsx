import React, { useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/storeContext'
import { FaPlus, FaMinus } from 'react-icons/fa'

const FoodItem = ({food}) => {


    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);



  return (
    <div className="group flex flex-col w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
      {/* Image Container */}
      <div className="relative">
        <img 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" 
          src={`${import.meta.env.VITE_BACKEND_URL}/images/${food.image}`} 
          alt={food.name} 
        />
        
        {/* Cart Controls */}
        <div className="absolute bottom-3 right-3">
          {!cartItems[food._id] ? (
            <button 
              onClick={() => addToCart(food._id)}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-orange-500 text-orange-500 hover:text-white transition-all duration-300"
              aria-label="Add to cart"
            >
              <FaPlus />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow-md">
              <button 
                onClick={() => removeFromCart(food._id)} 
                className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
                aria-label="Remove from cart"
              >
                <FaMinus />
              </button>
              <p className="font-semibold text-gray-800 tabular-nums">{cartItems[food._id]}</p>
              <button 
                onClick={() => addToCart(food._id)} 
                className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300"
                aria-label="Add one more"
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
          <img src={assets.rating_starts} alt="Rating" className="w-20" />
        </div>
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">{food.description}</p>
        <p className="text-xl font-semibold text-orange-600 mt-auto">₹{food.price}</p>
      </div>
    </div>
  )
}

export default FoodItem