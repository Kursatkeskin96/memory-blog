'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'


export default function WordDetails(ctx) {

const [details, setDetails]= useState('')
const {data: session} = useSession()
const router = useRouter()

useEffect(() => {
    async function fetchWords(){
    const res = await fetch(`/api/kelime/${ctx.params.id}`, {cache: 'no-store'})
    const word = await res.json()

    setDetails(word)
}
    session && fetchWords()
}, [session])

const handleDelete = async() => {
    try {
        const confirmModal = confirm('Olum bah emin misin?')

        if(confirmModal){
            const res = await fetch(`/api/kelime/${ctx.params.id}`, {
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
            <div>{details?.kelime}</div>
            <div>{details?.desc}</div>
            <div>{details?.authorId?.username}</div>
            <div>Posted: <span>{format(details?.createdAt)}</span></div>
            {details?.authorId?._id.toString() === session?.user?._id.toString() && (
                <div>
                   <Link href={`/kelime/edit-kelime/${details?._id}`}><button>Edit</button></Link>
                    <button className='bg-red-500 text-white p-1' onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    </div>
  )
}
