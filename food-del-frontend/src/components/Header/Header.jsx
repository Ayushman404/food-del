import React from 'react'
import { assets } from '../../assets/frontend_assets/assets.js'

const Header = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] bg-cover bg-center rounded-2xl overflow-hidden my-6 mx-auto max-w-[1400px]" style={{ backgroundImage: "url('/header_img.png')" }}>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />

  {/* Content */}
  <div className="relative z-20 flex flex-col justify-center h-full px-6 md:px-12 lg:px-24 gap-6 max-w-[900px]">
    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]">
      Satisfy Your Cravings,<br />One Bite at a Time.
    </h1>

    <p className="text-gray-200 text-base md:text-xl lg:text-2xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
      Discover mouth-watering meals, crafted with love and delivered fresh to your doorstep. It's not just food — it's an experience.
    </p>

    <button className="w-fit mt-2 px-6 py-3 bg-gradient-to-tr from-orange-500 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-2xl">
      View Menu 🍽️
    </button>
  </div>

  {/* Decorative Blur Shape (Optional) */}
  <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-orange-400/30 rounded-full blur-[100px] z-0" />
</div>

  )
}

export default Header