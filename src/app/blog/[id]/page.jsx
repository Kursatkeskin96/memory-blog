'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'


export default function BlogDetails(ctx) {

    if (typeof window !== 'undefined') {
        var currentURL = window.location.href;
        var urlParts = currentURL.split("/");
        var domain = urlParts[1];
      }
    
      const api = domain

const [blogDetails, setBlogDetails]= useState('')
const {data: session} = useSession()
const router = useRouter()

useEffect(() => {
    async function fetchBlog(){
    const res = await fetch(`${api}/api/blog/${ctx.params.id}`, {cache: 'no-store'})
    const blog = await res.json()

    setBlogDetails(blog)
}
    session && fetchBlog()
}, [session])

const handleDelete = async() => {
    try {
        const confirmModal = confirm('Olum bah emin misin?')

        if(confirmModal){
            const res = await fetch(`${api}api/blog/${ctx.params.id}`, {
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
    <>
    <div className='w-[80%] mb-10 flex justify-between items-start gap-4 mx-auto flex-wrap shadow-md mt-20 px-4'>
            <div className=''>
            <Image src={blogDetails?.imageUrl} width={300} height={500} alt='image'/>
            </div>
            <div className='max-w-[60%]'>
            <div className='text-2xl rounded-md text-white font-bold text-center bg-gradient-to-r from-[#f89e21] to-[#f8d199]'>{blogDetails?.title}</div>
            <div className='pt-8'>{blogDetails?.desc}</div>
            <div className='flex justify-between items-center mt- text-xs text-gray-400 pt-6'>
            <div><span>Paylasan: </span>{blogDetails?.authorId?.username}</div>
            <div><span>Tarih: </span>{format(blogDetails?.createdAt)}</div>
            </div>
            {blogDetails?.authorId?._id.toString() === session?.user?._id.toString() && (
                <div className='flex justify-end items-center gap-10 my-4'>
                   <Link href={`/blog/edit-blog/${blogDetails?._id}`}><button className=' border-[1px] border-black p-1 w-20 rounded-md'>Edit</button></Link>
                    <button className='bg-red-500 text-white p-1 w-20 rounded-md' onClick={handleDelete}>Delete</button>
                </div>
            )}
            </div>
    </div>
    </>
  )
}
