import React, { useContext } from 'react'
import {assets} from '../../assets/frontend_assets/assets.js';
import { Link } from "react-router-dom";
import { StoreContext } from '../../context/storeContext.jsx';


const Navbar = ({setShowLogin}) => {

    const [isActive, setIsActive] = React.useState('Home');
    const {cartItems} = useContext(StoreContext)


  return (
    <div className='w-full h-[10vh] flex items-center justify-between p-4 py-2'>
        <div className="logo"><img src={assets.logo} alt="logo" /></div>

        <div className='font-sans text-md hidden sm:flex font-semibold text-slate-800 sm:items-center'>
            <ul className = "flex gap-4">
                <li
                        className={`cursor-pointer ${isActive === 'Home' ? 'text-orange-500' : 'text-slate-800'}`}
                        onClick = {() => setIsActive('Home')}
                    ><Link to='/'>Home</Link></li>
                <li
                        className={`cursor-pointer ${isActive === 'Menu' ? 'text-orange-500' : 'text-slate-800'}`}
                        onClick = {() => setIsActive('Menu')}
                    ><a href='#menu'>Menu</a></li>
                <li
                        className={`cursor-pointer ${isActive === 'Contact' ? 'text-orange-500' : 'text-slate-800'}`}
                        onClick = {() => setIsActive('Contact')}
                    ><a href='#contact'>Contact</a></li>
            </ul>
        </div>

        <div className="nav_right flex gap-6 items-center">
            <div className="nav_search_cart flex gap-6 items-center">
                <span className='cursor-pointer p-1'><img src={assets.search_icon} alt="search_icon" /></span>
                <span className='cursor-pointer relative p-1'>{Object.keys(cartItems).length === 0 ? <></> : <div className='absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-red-500'></div>}<Link to='/cart'><img src={assets.basket_icon} alt="cart_icon" /></Link></span>
            </div>

            <div>
                <button onClick={()=>setShowLogin(prev => !prev)} className='px-3 py-2 border-2 border-orange-500 font-sans text-orange-500 hover:bg-orange-300/20 rounded-xl cursor-pointer'>Sign In</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar