'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Edit = (ctx) => {
    const [kelime, setKelime] = useState("")
    const [desc, setDesc] = useState("")
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchWord() {
            const res = await fetch(`http://localhost:3000/api/kelime/${ctx.params.id}`)

            const word = await res.json()

            setKelime(word.kelime)
            setDesc(word.desc)
        }
        fetchWord()
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

        if(kelime === '' || desc === ''){
            toast.error("All fields are required")
            return
        }

        try {
    
            const body = {
               kelime, 
                desc,
            }
            
            const res = await fetch(`http://localhost:3000/api/kelime/${ctx.params.id}`, {
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


            router.push('/kelime')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <h2>Edit Word</h2>
                <form onSubmit={handleSubmit}>
                    <input value={kelime} type="text" placeholder='Title...' onChange={(e) => setKelime(e.target.value)} />
                    <input value={desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <button>Edit</button>
                    <Link href={'/kelime'}><button>Cancel</button></Link>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit