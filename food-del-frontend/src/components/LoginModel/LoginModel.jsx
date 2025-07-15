import React, { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const LoginModel = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState('Sign Up') 
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentState === 'Sign Up') {
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            // Handle sign up logic here
            console.log('Sign Up:', { name, email, password });

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
                name,
                email,
                password
            }).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    toast.success(response.data.message);
                    localStorage.setItem('token', response.data.token);
                }
                else{
                    toast.error(response.data.message);
                }
            })
        }
        else{
            const email = e.target.email.value;
            const password = e.target.password.value;

            // console.log(currentState, {email, password});

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                email,
                password
            }).then((response) => {
                // console.log(response.data);
                if(response.data.success){
                    toast.success(response.data.message);
                    localStorage.setItem('token', response.data.token);
                }
                else{
                    toast.error(response.data.message);
                }
            }).catch((error) => {
                console.error('Login error:', error);
                toast.error('Login failed. Please try again.');
            });
        }
        setShowLogin(false);
        window.location.href = '/';
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-fade-in">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-800">
            {currentState === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <FaTimes
            className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer transition"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name (Only for Sign Up) */}
          {currentState === 'Sign Up' && (
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none text-slate-800 placeholder:text-slate-400 transition duration-150"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none text-slate-800 placeholder:text-slate-400 transition duration-150"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none text-slate-800 placeholder:text-slate-400 transition duration-150"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md"
          >
            {currentState === 'Sign Up' ? 'Create Account' : 'Log In'}
          </button>
        </form>

        {/* Toggle link */}
        <div className="mt-6 text-sm text-center text-slate-600">
          {currentState === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                className="text-orange-500 font-semibold cursor-pointer underline"
                onClick={() => setCurrentState('Log In')}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                className="text-orange-500 font-semibold cursor-pointer underline"
                onClick={() => setCurrentState('Sign Up')}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModel