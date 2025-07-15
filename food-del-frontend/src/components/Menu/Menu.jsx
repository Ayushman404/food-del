import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'

const Menu = ({category, setCategory}) => {
  return (
    <div className="menu flex flex-col gap-6 items-center px-4 py-6 w-full" id="menu">
  <h1 className="text-4xl font-extrabold tracking-wide text-center text-slate-800 relative inline-block">
    Explore Menu
    <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></span>
  </h1>

  <p className="text-center text-lg md:text-xl max-w-3xl text-gray-600 leading-relaxed">
    <span className="pl-3 border-l-4 border-orange-500 font-semibold text-slate-800">Choose</span> from a diverse menu featuring a delectable array of dishes. Explore exciting flavors crafted to satisfy every palate.
  </p>

  <div className="explore-menu flex gap-4 w-full px-2 py-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide md:justify-center">
    {menu_list.map((item, index) => (
      <div
        key={index}
        onClick={() =>
          category === item.menu_name
            ? setCategory("All")
            : setCategory(item.menu_name)
        }
        className={`flex-shrink-0 snap-start shadow-md flex flex-col items-center justify-center gap-3 p-4 rounded-2xl min-w-[140px] min-h-[200px] transition-transform duration-200 cursor-pointer hover:scale-105 ${
          category === item.menu_name
            ? "border-2 border-orange-500 bg-orange-50 shadow-orange-300"
            : "bg-white"
        }`}
      >
        <img
          src={item.menu_image}
          className="w-24 h-24 rounded-full object-cover shadow-sm"
          alt={item.menu_name}
        />
        <p className="text-slate-700 font-medium text-base text-center">
          {item.menu_name}
        </p>
      </div>
    ))}
  </div>

  <hr className="w-4/5 border-t-2 border-slate-400 mt-4" />
</div>

  )
}

export default Menu