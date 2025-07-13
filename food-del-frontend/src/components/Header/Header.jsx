import React from 'react'
import { assets } from '../../assets/frontend_assets/assets.js'

const Header = () => {
  return (
    <div className={`header w-[80vw] h-[65vh] relative bg-[url(/header_img.png)] bg-cover bg-center bg-no-repeat rounded-2xl mx-auto my-8 flex justify-center items-center fade-in`}>
        <div className={`rounded-2xl w-[80vw] h-[65vh] bg-cover bg-center bg-linear-to-t from-black/70 to-orange-50/20`}>
        <div className='absolute bottom-[10%] left-[5%] flex flex-col gap-4 items-start'>
            <h2 className='text-slate-50 font-bold text-3xl md:text-6xl text-shadow-xl'>Order your favourite food here</h2>
            <p className='text-gray-100 font-semibold text-md md:text-xl md:w-[50%] text-shadow-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, a corrupti, provident eaque vitae aut totam blanditiis dolorum doloribus rem asperiores! Excepturi, earum.</p>
            <button className='py-3 px-4 rounded-2xl bg-white text-black font-semibold text-center cursor-pointer hover:scale-105 transition duration-200'>View Menu</button>
        </div>
        </div>
    </div>
  )
}

export default Header