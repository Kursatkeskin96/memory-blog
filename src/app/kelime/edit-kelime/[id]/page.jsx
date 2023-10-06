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
            if (typeof window !== 'undefined') {
                var currentURL = window.location.href;
                var urlParts = currentURL.split("/");
                var domain = urlParts[1];
              }
            
              const api = domain;
            const res = await fetch(`${api}/api/kelime/${ctx.params.id}`)

            const word = await res.json()

            setKelime(word.kelime)
            setDesc(word.desc)
        }
        fetchWord()
    }, [])

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
            if (typeof window !== 'undefined') {
                var currentURL = window.location.href;
                var urlParts = currentURL.split("/");
                var domain = urlParts[1];
              }
            
              const api = domain;
            
            const res = await fetch(`${api}/api/kelime/${ctx.params.id}`, {
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

            <div className='h-screen'>
            <div className='lg:w-[50%] w-[90%] shadow-lg h-fit mx-auto my-16 bg-[#F1F0E8] pt-5'>
                <h2 className='text-lg font-bold text-center mb-5'>Kelime Düzenle</h2>
                <form className='' onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center items-center'>
                    <input className=' w-[60%] mb-6 mt-4 rounded-md text-center' value={kelime} type="text" placeholder='Kelime' onChange={(e) => setKelime(e.target.value)} />
                    <input className=' w-[60%] rounded-md text-center mb-10' value={desc} placeholder='Anlamı' onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className='w-[60%] flex justify-between mx-auto items-center pb-6 '>
                    <button className='bg-[#96B6C5] border-[1px] border-white text-white p-1 w-20 rounded-md'>Kaydet</button>
                    <Link href={'/kelime'}><button className='bg-red-700 text-white border-[1px] border-white p-1 rounded-md w-20'>İptal</button></Link>
                    </div>
                </form>
                </div>
            </div>

    )
}

export default Edit