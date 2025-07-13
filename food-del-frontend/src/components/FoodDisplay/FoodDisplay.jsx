import React, { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (

    <div className='mx-4'>
        <h2 className='text-center font-bold tracking-wide text-2xl my-4 '>Top Dishes for you</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 my-4'>
            {food_list.map((food, index) => (
                (category === 'All' || food.category === category ?
                <FoodItem food = {food} key={index} />:
                <div key={index}></div>)
            ))}
        </div>
    </div>
  )
}

export default FoodDisplay