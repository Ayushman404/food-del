import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex justify-center items-start min-h-screen w-[170px] md:w-[250px] bg-orange-500/20'>
        <div className='grid grid-cols-1 justify-center items-center gap-4 w-[80px] h-[80px] sm:w-full p-4'>
            <NavLink to='/add' className={({isActive}) => (`mid-w-[50px] p-3 rounded-xl cursor-pointer text-xs sm:text-sm md:text-md  shadow-md font-semibold ${isActive ? ' bg-orange-500/90 text-white' : 'bg-white/90'} text-lg flex justify-between items-center gap-4`)}>
                <img className='w-5 md:w-7' src={assets.add_icon} alt="" />
                <span className='hidden sm:flex'>Add Item</span>
            </NavLink>
            <NavLink to='/list' className={({isActive}) => (` p-3 rounded-xl cursor-pointer text-xs sm:text-sm md:text-md  shadow-md font-semibold ${isActive ? 'bg-orange-500/90 text-white' : 'bg-white/90'} text-lg flex justify-between items-center gap-4`)}>
                <img className='w-5 md:w-7' src={assets.order_icon} alt="" />
                <span className='hidden sm:flex text-xs sm:text-sm'>List Item</span>
            </NavLink>
            <NavLink to='/orders' className={({isActive}) => (` p-3 rounded-xl cursor-pointer text-xs sm:text-sm md:text-md  shadow-md font-semibold ${isActive ? 'bg-orange-500/90 text-white' : 'bg-white/90'} text-lg flex justify-between items-center gap-4`)}>
                <img className='w-5 md:w-7' src={assets.order_icon} alt="" />
                <span className='hidden sm:flex'>Orders</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar