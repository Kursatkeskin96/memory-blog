'use client'

import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Panel() {
  const { data: session, status } = useSession();
  const CLOUD_NAME = 'dqtnjtoby'
  const UPLOAD_PRESET = 'gunes_blog'
  const router = useRouter();




  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username === '' || password === '') {
      toast.error('Fill all fields');
      return;
    }
  
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
  
    try {
      if (typeof window !== 'undefined') {
        var currentURL = window.location.href;
        var urlParts = currentURL.split("/");
        var domain = urlParts[1];
      }
    
      const api = domain;
      const res = await fetch(`${api}/api/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username, role, password }),
      });
  
      if (res.ok) {
        toast.success('Successfully registered');
        return;
      } else {
        toast.error('Error while registering');
        return;
      }
    } catch (error) {
      // Handle the error
    }
  };

  const [kelime, setKelime] = useState('')
  const [desc, setDesc] = useState('')

  const handleKelime = async (e) => {
    e.preventDefault()

    if(!kelime || !desc){
        toast.error("All fields are required")
        return
    }

    try {
      if (typeof window !== 'undefined') {
        var currentURL = window.location.href;
        var urlParts = currentURL.split("/");
        var domain = urlParts[1];
      }
    
      const api = domain;
      const res = await fetch(`${api}/api/kelime`, {
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${session?.user?.accessToken}` 
        },
        method: 'POST',
        body: JSON.stringify({kelime,desc,authorId: session?.user?._id})
      })

      if(!res.ok){
        throw new Error("Error occured")
      }

    } catch (error) {
        console.log(error)
    }
}

const [title, setTitle] = useState('')
const [photo, setPhoto] = useState('')

const handleGallery = async (e) => {
  e.preventDefault()

  if(!photo || !title){
      toast.error("All fields are required")
      return
  }

  try {
    const imageUrl = await uploadImage()
    if (typeof window !== 'undefined') {
      var currentURL = window.location.href;
      var urlParts = currentURL.split("/");
      var domain = urlParts[1];
    }
  
    const api = domain;
    
    const res = await fetch(`${api}/api/gallery`, {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${session?.user?.accessToken}` 
      },
      method: 'POST',
      body: JSON.stringify({title,imageUrl,authorId: session?.user?._id})
    })

    if(!res.ok){
      throw new Error("Error occured")
    }

  } catch (error) {
      console.log(error)
  }
}

const uploadImage = async () => {
  if (!photo) return

  const formData = new FormData()

  formData.append("file", photo)
  formData.append("upload_preset", UPLOAD_PRESET)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    const imageUrl = data['secure_url']

    return imageUrl
  } catch (error) {
      console.log(error)
  }
}
  return (
    <div>
<div className='bg-[#F4F2DE] flex flex-col justify-center items-center w-[70%] mx-auto mt-10 mb-10 rounded-md shadow-lg py-4'>
  <div>
    <h1 className='text-lg mb-4'>Kullanici Olustur</h1>
  </div>
  <div className='flex flex-col justify-center items-center'>
    <form onSubmit={handleSubmit}>
      <input className='rounded-md pl-2 w-52 block' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
      <input className='rounded-md pl-2 w-52 block my-4' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <select className='rounded-md pl-2 w-52 block mx-auto' value={role} id="roles" onChange={(e) => setRole(e.target.value)} >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

    <div className='flex justify-center items-center mt-6'>
      <button className='w-20 mx-auto bg-[#C7D3D1] text-black p-1 rounded-md border-[1px] border-white'>Olustur</button>
      </div>
    </form>
  </div>
</div>

<div className='bg-[#F4F2DE] flex flex-col justify-center items-center w-[70%] mx-auto mt-10 mb-10 rounded-md shadow-lg py-4'>
  <div>
  <h1 className='text-lg mb-4'>Kelime Olustur</h1>
  </div>
      <form onSubmit={handleKelime}>
        <input className='rounded-md pl-2 block w-52 ' type="text" placeholder='Kelime' onChange={(e) => setKelime(e.target.value)} />
        <input className='rounded-md pl-2 block my-4 w-52 ' type="text" placeholder='Anlami' onChange={(e) => setDesc(e.target.value)} />
        <button className='block mt-2 w-20 mx-auto bg-[#C7D3D1] text-black p-1 rounded-md border-[1px] border-white' >Olustur</button>
      </form>
      </div>

      <div>
      <div className='bg-[#F4F2DE] flex flex-col justify-center items-center w-[70%] mx-auto mt-10 mb-10 rounded-md shadow-lg py-4'>
      <h1 className='text-lg mb-4'>Fotograf Olustur</h1>
                <form onSubmit={handleGallery}>
                    <input className='block w-52 rounded-md pl-2' type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <label className='block text-center w-32 mx-auto bg-[#E9B384] text-white rounded-md p-1 cursor-pointer my-4' htmlFor='image'>
                        Upload Image
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                    <button className='block mt-2 w-20 mx-auto bg-[#C7D3D1] text-black p-1 rounded-md border-[1px] border-white'>Olustur</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    </div>
  );
}

export default Panel;
