import React, { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginModel = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState('Sign Up') 
    
    
    const handleSumbit = async (e) => {
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
    }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm'>
        <div className='bg-white w-96 flex flex-col gap-4 items-center justify-center rounded-2xl shadow-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 p-5'>
            <div className='rounded flex w-full items-center justify-between '>
                <h2 className='text-2xl font-bold'>{currentState === 'Sign Up' ? ' Sign Up' : ' Log In'}</h2>
                <img src={assets.cross_icon} className='cursor-pointer' onClick={()=>setShowLogin(prev => !prev)}/>
            </div>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleSumbit}>
                    <div className='flex flex-col gap-2' style={{display: currentState === 'Log In' ? 'none' : 'block'}}>
                        <label htmlFor="name" className='font-semibold'>Full Name</label>
                        <input type="text" id='name' placeholder='Enter your full name' className='w-full border-2 border-slate-200 rounded-lg p-2 focus:outline-none focus:border-orange-500' style={{display: currentState === 'Log In' ? 'none' : 'block'}}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input type="email" id='email' placeholder='Enter your email' className='border-2 border-slate-200 rounded-lg p-2 focus:outline-none focus:border-orange-500'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input type="password" id='password' placeholder='Enter your password' className='border-2 border-slate-200 rounded-lg p-2 focus:outline-none focus:border-orange-500'/>
                    </div>
                    <button type='submit' className='bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200'>{currentState === 'Sign Up' ? 'Create account' : 'Log In'}</button>
                </form>

            <div>
                <p className='text-sm text-slate-600'>{currentState === 'Sign Up' ? 'Already have an account? Login now ' : "Don't have an account? Create Now"} <span className='text-orange-500 cursor-pointer underline font-semibold' onClick={()=>setCurrentState(prev => prev === 'Sign Up' ? 'Log In' : 'Sign Up')}>{currentState === 'Sign Up' ? ' Log In' : ' Sign Up'}</span></p>
            </div>
    </div>
    </div>
  )
}

export default LoginModel