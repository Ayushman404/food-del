import React, { useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/storeContext'

const FoodItem = ({food}) => {


    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);



  return (
    <div className='flex flex-col gap-5 shadow-md rounded-xl p-3 border-2 border-slate-200/50'>
        <div className='relative flex flex-col justify-center items-center w-[100%]'>
            <img className="object-fill rounded-xl" src={food.image} alt="" />

            {!cartItems[food._id]
                ? <img className="absolute bottom-1 right-1" src={assets.add_icon_white} onClick = {()=>addToCart(food._id)}/>
                :<div className = "flex justify-between items-center gap-2 absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md">
                    <img src={assets.remove_icon_red} onClick = {() => removeFromCart(food._id)} />
                    <p>{cartItems[food._id]}</p>
                    <img src={assets.add_icon_green} onClick = {() => addToCart(food._id)} />
                </div>}
        </div>
        
        <div>
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold'>{food.name}</h3>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='text-sm text-slate-600 my-2'>{food.description}</p>
            <p className='text-lg text-orange-600'>${food.price}</p>
        </div>
    </div>
  )
}

export default FoodItem