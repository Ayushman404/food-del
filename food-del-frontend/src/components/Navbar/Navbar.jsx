import React, { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets.js";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import { StoreContext } from "../../context/storeContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const [isActive, setIsActive] = React.useState("Home");
  const [profileOpen, setProfileOpen] = React.useState(false);
  const { cartItems, token, setToken } = useContext(StoreContext);

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
            QE
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-black">
            Quick<span className="text-orange-400 text-shadom-md">Eats</span>
          </h1>
        </div>

      {/* Center Nav Links */}
      <div className="hidden sm:flex font-semibold text-slate-800 text-sm md:text-base items-center">
        <ul className="flex gap-6">
          {["Home", "Menu", "Contact"].map((item) => (
            <li
              key={item}
              className={`cursor-pointer hover:text-orange-500 transition ${
                isActive === item ? "text-orange-500 font-bold" : "text-slate-800"
              }`}
              onClick={() => setIsActive(item)}
            >
              {item === "Home" ? (
                <Link to="/">Home</Link>
              ) : (
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Icons + Auth */}
      <div className="flex items-center gap-5 relative">
        {/* Search */}
        <span className="cursor-pointer text-slate-700 hover:text-orange-500 transition">
          <FiSearch size={20} />
        </span>

        {/* Cart */}
        <span className="relative cursor-pointer text-slate-700 hover:text-orange-500 transition">
          {Object.keys(cartItems).length > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
          )}
          <Link to="/cart">
            <FiShoppingCart size={22} />
          </Link>
        </span>

        {/* Profile / Login */}
        {token ? (
          <div className="relative">
            <FiUser
              size={22}
              onClick={() => setProfileOpen((prev) => !prev)}
              className="cursor-pointer text-slate-700 hover:text-orange-500 transition"
            />
            {profileOpen && (
              <div className="absolute top-10 right-0 bg-white rounded-xl shadow-lg p-4 z-50 min-w-[160px]">
                <ul className="flex flex-col gap-3 text-sm">
                  <li
                    className="flex items-center gap-2 text-slate-700 hover:text-orange-500 cursor-pointer"
                    onClick={() => setProfileOpen(false)}
                  >
                    <FiPackage className="text-xl" />
                    <span className="font-semibold">Orders</span>
                  </li>
                  <li
                    className="flex items-center gap-2 text-slate-700 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setToken("");
                      localStorage.removeItem("token");
                    }}
                  >
                    <FiLogOut className="text-xl" />
                    <span className="font-semibold">Log Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLogin((prev) => !prev)}
            className="px-4 py-2 text-orange-500 font-semibold border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-all duration-200"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
