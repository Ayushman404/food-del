import React, { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (

    <div className="px-4 py-8 max-w-[1400px] mx-auto">
  {/* Header */}
  <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 tracking-wide relative mb-8">
    Top Dishes for You
    <span className="block mx-auto mt-2 w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></span>
  </h2>

  {/* Grid of Dishes */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-6">
    {food_list.filter(food => category === 'All' || food.category === category)
      .map((food, index) => (
        <div key={index} className="transition-transform hover:scale-[1.015] duration-200">
          <FoodItem food={food} />
        </div>
      ))}
  </div>

  {/* Optional: Message when no items in selected category */}
  {food_list.filter(food => category === 'All' || food.category === category).length === 0 && (
    <p className="text-center text-slate-500 font-medium mt-10">
      No dishes found for <span className="font-semibold text-orange-500">{category}</span>.
    </p>
  )}
</div>

  )
}

export default FoodDisplay