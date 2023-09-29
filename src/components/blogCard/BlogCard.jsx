'use client'
import Image from 'next/image';
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format } from 'timeago.js';
const BlogCard = ({ blog: { title, desc, imageUrl, authorId, _id, createdAt } }) => {
    const { data: session } = useSession();
    const shortDesc = desc.split(' ').slice(0, 20).join(' ');
    const shortTittle = title.split(' ').slice(0, 20).join(' ');
  
    return (
<Link href={`/blog/${_id}`}>
<div className="w-[300px] h-[300px] rounded-lg hover:scale-105 transition-transform transform "
    style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.327), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        zIndex: -1
      }}>
    <div className=''>
     <h5 className="mb-2 pt-2 text-xl font-bold text-center text-white uppercase">{shortTittle}</h5>
     </div>
     <div>
        <p className="text-sm font-normal mt-16 text-center max-w-[90%] mx-auto h-40 text-gray-200 dark:text-gray-400">{shortDesc}...</p>
        </div>
        <div className='flex justify-between text-xs text-[#CDC2AE] px-2'>
          <p>Author: {authorId?.username}</p>
          <p>Posted: <span>{format(createdAt)}</span></p>
        </div>
    
</div>
</Link>
    );
  };
  
  export default BlogCard;