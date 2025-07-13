import React, { useState } from 'react'
import {assets, url} from '../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';




const Add = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:'',
    description: '',
    price: '',
    category: 'Salad'
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if(response.data.success){
          setData({
        name:'',
        description: '',
        price: '',
        category: 'Salad'
      })
      setImage(false)

      toast.success('Food Added successfully!');
    }else{
      toast.error('Food not added!');
    }
    
}



  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-5 p-5'>
      <form className='w-[500px] p-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <p>Upload Image</p>
          <label htmlFor="image" className='cursor-pointer'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='w-[200px] h-[100px] rounded-xl required' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' className='hidden' />
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-slate-800'>Product Name</p>
          <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter product name' />
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-slate-800'>Product Price</p>
          <input type="number" value={data.price}  onChange={(e) => setData({...data, price: e.target.value})} className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter product price' required />
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-slate-800'>Product Description</p>
          <textarea value={data.description} onChange={(e) => setData({...data, description: e.target.value})} className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter product description' required></textarea>
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-slate-800'>Product Category</p>
          <select value={data.category} onChange={(e) => setData({...data, category: e.target.value})} className='border border-gray-300 rounded-md p-2 w-full'>
            <option value="">Select category</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>  

        <button type='submit' className='bg-orange-500 w-full px-3 py-2 rounded-md text-white font-semibold hover:bg-orange-600 cursor-pointer transition duration-300'>Add Item</button>

      </form>
    </div>
  )
}

export default Add