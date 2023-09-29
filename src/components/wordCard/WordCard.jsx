'use client'
import Image from 'next/image';
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format } from 'timeago.js';

const BlogCard = ({ word: { kelime, desc, authorId, _id, createdAt } }) => {
    const { data: session } = useSession();
  
    return (
<>
<div className="flex items-center justify-center">
<div className="w-[200px] h-[200px] bg-transparent group perspective my-10">
    <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-[#354259] rounded-md overflow-hidden">
            <div className="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24">
              <h1 className="text-3xl font-semibold text-white">{kelime}</h1>
              <div className=' border-b-2 border-[#fdb44b] w-[80%] flex justify-center items-center pt-2'></div>
              <p className="text-[#ECE5C7] px-6 py-2 italic font-semibold rounded-full absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-20 scale-0 group-hover:scale-125">
                {desc}
              </p>
              <div className=" text-gray-100 flex justify-center gap-7 items-center text-xs py-2 italic font-semibold rounded-full absolute -bottom-10 delay-500 duration-1000 group-hover:bottom-2 scale-0 group-hover:scale-95">
              <p>Ekleyen: {authorId?.username}</p>
             <p><span>{format(createdAt)}</span></p>
              </div>
            </div>
 
          </div>
        </div>
        {authorId?._id.toString() === session?.user?._id.toString() && (
    <div className='bg-slate-100 flex justify-center items-center text-center gap-10 mt-2 '>
      <Link href={`/kelime/${_id}`}><button className=' border-black border-[1px] p-1 w-[200px] rounded-md'>Edit</button></Link>
    </div>
  )}
      </div>
      
      </div>


</>
  );
};
  
  export default BlogCard;