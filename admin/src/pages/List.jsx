import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);

  const getList = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/list`);
    console.log(response)
    if(response.data.success){
      setList(response.data.data);
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  const removeItem = async (id) => {
    // console.log(id);
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/food/remove`, {
      data: {id}
    }).then((res) => {
      if(res.data.success){
        toast.success(res.data.message);
        getList();
      }else{
        toast.error(res.data.message);
      }
    }).catch((err)=>{
      console.log(err);
    })
   
  }

  useEffect(() => {
    getList();
  },[]);


  return (
    <div className='min-h-screen w-full p-4 flex flex-col gap-4 '>
      <h2 className='text-center tracking-wide leading-1.5 text-3xl my-4 font-serif'>Items Listed</h2>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-5 gap-4 items-center bg-gray-200 p-2 rounded-lg'>
          <p className='font-semibold'>Image</p>
          <p className='font-semibold'>Name</p>
          <p className='font-semibold'>Category</p>

          <p className='font-semibold'>Price</p>
          <p className='font-semibold'>Actions</p>
        </div>

        <div className='flex flex-col gap-4'>
          {list.map((item, index) => (
            <div key={index} className='grid grid-cols-5 gap-4 items-center bg-white p-2 rounded-lg shadow-lg'>
              <img src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.image}`} className='w-25 h-12' alt={item.name} />
              <p className='font-semi-bold text-slate-800'>{item.name}</p>
              <p className='font-semi-bold text-slate-800'>{item.category}</p>
              <p className='font-semi-bold text-slate-800'>{item.price}</p>
              <button onClick={(e)=>removeItem(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default List