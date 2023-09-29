'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'
import Image from 'next/image'

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
            <div>
                <h2>Edit Photo</h2>
                <form onSubmit={handleSubmit}>
                <Image src={imageUrl} width={200} height={200} alt="image" />
                    <input value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                    <button>Edit</button>
                </form>
                <button className='bg-red-500 text-white p-1' onClick={handleDelete}>Delete</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditGallery;