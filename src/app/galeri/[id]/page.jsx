'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'

const EditGallery = (ctx) => {
    const CLOUD_NAME = 'dqtnjtoby'
    const UPLOAD_PRESET = 'gunes_blog'

    const [title, setTitle] = useState("")
    const [photo, setPhoto] = useState("")
    const [imageUrl, setImageUrl] = useState(''); // New state for image URL
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchGallery() {
            const res = await fetch(`http://localhost:3000/api/gallery/${ctx.params.id}`)

            const gallery = await res.json()

            setTitle(gallery.title)
            setImageUrl(gallery.imageUrl)
        }
        fetchGallery()
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

        if(title === ''){
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
            }

            if(imageUrl != null){
                body.imageUrl = imageUrl
            }
            
            const res = await fetch(`http://localhost:3000/api/gallery/${ctx.params.id}`, {
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

            router.push(`/`)
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
    const handleDelete = async(ctx) => {
        try {
            const confirmModal = confirm('Olum bah emin misin?')
    
            if(confirmModal){
                const res = await fetch(`http://localhost:3000/api/gallery/${ctx.params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${session?.user?.accessToken}`
                    },
                    method: 'DELETE'
                })
                if(res.ok){
                    router.push('/')
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    }


    return (
<div>
<div className='lg:w-[30%] w-[90%] shadow-lg h-fit mx-auto my-16 bg-[#F4F2DE] pt-5'>
    <h2 className='text-lg font-bold text-center mb-5'>Edit Photo</h2>
    <Image className='h-60 w-44 rounded-md mx-auto' src={imageUrl} width={200} height={200} alt='images' />
    <form className='' onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center'>
        <input className='mt-8 mb-4' value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
        <label className='border-[1px] border-white cursor-pointer bg-[#C7D3D1] text-white w-[40%] text-center mb-6 p-1 rounded-md' htmlFor='image'>Upload Image </label>
        <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <div className='w-[60%] flex justify-between mx-auto items-center pb-6 '>
        <button className='bg-white border-[1px] border-black text-black p-1 w-20 rounded-md'>Edit</button>
        <Link href={'/galeri'}><button className='bg-red-700 text-white border-[1px] border-white p-1 rounded-md w-20'>Cancel</button></Link>
        </div>
    </form>
    </div>
</div>

    )
}

export default EditGallery;