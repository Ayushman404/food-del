import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-6 w-full mt-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
            QE
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            Quick<span className="text-orange-400">Eats</span>
          </h1>
        </div>

        {/* Center Info */}
        <div className="text-center text-sm leading-snug">
          <p className="text-gray-300">© {new Date().getFullYear()} QuickEats. All rights reserved.</p>
          <p className="text-xs text-gray-500">Made with ❤️ by Ayushman</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#" className="text-gray-400 hover:text-orange-400 transition-all duration-200">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-400 transition-all duration-200">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-400 transition-all duration-200">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};


export default Footer