'use client'

import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineFileImage } from 'react-icons/ai'

function Panel() {
  const CLOUD_NAME = 'dqtnjtoby'
  const UPLOAD_PRESET = 'gunes_blog'
  const router = useRouter();
  const { data: session, status } = useSession(); // Include status

  useEffect(() => {
    // Check if the session is still loading
    if (status === 'loading') {
      return; // Do nothing and wait for the session to load
    }
    if (!session) {
      // Redirect the user to the login page if there's no session (user not logged in)
      router.push('/login');
    } else if (session.user.role !== 'admin') {
      // Redirect the user to another page if they don't have the 'admin' role
      router.push('/');
    }
  }, [session, status]); // Include session and status as dependencies

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
      const res = await fetch('http://localhost:3000/api/register', {
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
      
      const res = await fetch(`http://localhost:3000/api/kelime`, {
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
    
    const res = await fetch(`http://localhost:3000/api/gallery`, {
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
      <h1>Kullanici Olustur</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <select value={role} id="roles" onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        </select>

        <button>Olustur</button>
      </form>

      <form onSubmit={handleKelime}>
        <input type="text" placeholder='Kelime' onChange={(e) => setKelime(e.target.value)} />
        <input type="text" placeholder='Anlami' onChange={(e) => setDesc(e.target.value)} />
        <button>Olustur</button>
      </form>

      <div>
            <div>
                <h2>Create Photo</h2>
                <form onSubmit={handleGallery}>
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                  <button>Create</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    </div>
  );
}

export default Panel;
