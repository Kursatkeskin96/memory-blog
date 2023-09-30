'use client'
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const BlogCard = ({ gallery: { title, imageUrl, authorId, _id, createdAt } }) => {
    const { data: session } = useSession()
  
    return (
      <div className="group h-60 w-44 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0">
          <Image className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" width={300} height={200} src={imageUrl} alt="gunes" />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        </div>
      </div>
      {session?.user?.role === 'admin' && (
                <div className='flex justify-center items-center mt-4'>
                   <Link href={`/galeri/${_id}`}><button className='w-20 bg-[#C7D3D1] text-black p-1 rounded-md border-[1px] border-white mx-auto'>Edit</button></Link>
                </div>
            )}
    </div>
    );
  };
  
  export default BlogCard;