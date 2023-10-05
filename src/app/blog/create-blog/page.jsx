'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'


const CreateBlog = () => {
    const CLOUD_NAME = 'dqtnjtoby'
    const UPLOAD_PRESET = 'gunes_blog'

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [photo, setPhoto] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !desc){
            toast.error("All fields are required")
            return
        }

        try {
          const imageUrl = await uploadImage()
          
          const res = await fetch(`https://gunesozdemir.vercel.app/api/blog`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,desc,imageUrl,authorId: session?.user?._id})
          })

          if(!res.ok){
            throw new Error("Error occured")
          }

          const blog = await res.json()

          router.push(`/blog/${blog?._id}`)
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
        <div className='lg:w-[50%] w-[90%] shadow-lg h-fit mx-auto my-16 bg-[#F1F0E8]'>
            <h2 className='text-lg font-bold text-center'>Creating Post</h2>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center'>
                <input className='rounded-md  mt-6 mb-4 w-[70%] text-center' value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                <textarea className='rounded-md  mt-6 mb-4 w-[70%] text-center h-96 resize-none' value={desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className='w-[70%] mx-auto flex justify-between items-center mt-4'>
                <label className='mb-10 cursor-pointer bg-white rounded-md p-1 border-[1px] border-black' htmlFor='image'>
                    Upload Image 
                </label>
                <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                <button className='bg-[#96B6C5] border-[1px] border-white text-white p-1 w-20 mb-10 rounded-md'>Create</button>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
    )
}

export default CreateBlog