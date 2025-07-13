import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'

const Menu = ({category, setCategory}) => {
  return (
    <div className="menu flex flex-col gap-3 justify-center items-center" id='menu'>
        <h1 className='border-b-3 border-b-orange-500 text-3xl font-bold tracking-wide text-center'>Explore Menu</h1>
        <p className='text-center text-xl'><span className='border-l-3 border-l-orange-500 pl-3'>Choose</span> form diverse menu featuring a delectable array Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque minima voluptatem adipisci.</p>

        <div className='explore-menu flex overflow-x-scroll gap-4 max-w-full p-4 justify-evenly my-2 text-center'>
            {menu_list.map((item, index) =>(
                <div key = {index} 
                className={`shadow-md flex flex-col items-center justify-center gap-3 p-3 rounded-xl min-w-[150px] min-h-[200px] ${category === item.menu_name ? 'border-2 border-orange-500 shadow-orange-500/60' : ""}`}
                onClick={() => category === item.menu_name ? setCategory('All') : setCategory(item.menu_name)}
                >

                    <img src={item.menu_image} className='w-[120px] rounded-full cursor-pointer' alt="" />
                    <p className='text-slate-800 font-semibold'>{item.menu_name}</p>
                </div>
            ))

            }
        </div>
            <hr className='w-[80%] border-2 border-slate-500' />
    </div>
  )
}

export default Menu