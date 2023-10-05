'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'

const Edit = (ctx) => {
    const CLOUD_NAME = 'dqtnjtoby'
    const UPLOAD_PRESET = 'gunes_blog'

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`/api/blog/${ctx.params.id}`)

            const blog = await res.json()

            setTitle(blog.title)
            setDesc(blog.desc)
        }
        fetchBlog()
    }, [])

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p>
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(title === '' || desc === ''){
            toast.error("All fields are required")
            return
        }

        try {
            let imageUrl = null
            if(photo){
                imageUrl = await uploadImage()
            }

            const body = {
                title, 
                desc,
            }

            if(imageUrl != null){
                body.imageUrl = imageUrl
            }
            
            const res = await fetch(`/api/blog/${ctx.params.id}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method: "PUT",
                body: JSON.stringify(body)
            })

            if(!res.ok){
                throw new Error("Error has occured")
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
                <h2 className='text-lg font-bold text-center'>Edit Post</h2>
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
                    <button className='bg-[#96B6C5] border-[1px] border-white text-white p-1 w-20 mb-10 rounded-md'>Edit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit