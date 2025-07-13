import React from 'react'
import { assets } from '../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className = 'flex justify-between items-center px-5'>
        <img className='h-[60px] max-w-[15%]' src={assets.logo} alt="" />
        <img className='h-[50px] w-[50px]' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar