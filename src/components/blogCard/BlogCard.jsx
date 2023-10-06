'use client'
import Image from 'next/image';
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format, register } from 'timeago.js';
import tr from 'timeago.js/lib/lang/tr';

register('tr', tr);

const BlogCard = ({ blog: { title, desc, imageUrl, authorId, _id, createdAt } }) => {
    const { data: session } = useSession();
    const shortDesc = desc.split(' ').slice(0, 10).join(' ');
    const shortTittle = title.split(' ').slice(0, 10).join(' ');
  
    return (
<Link href={`/blog/${_id}`}>
<div className="w-[300px] h-[300px] flex flex-col py-2 justify-between rounded-lg hover:scale-105 transition-transform transform  "
    style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.327), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        zIndex: -1
      }}>
    <div className=' justify-start items-start'>
     <h5 className="mb-2 pt-2 text-xl font-bold align-top text-center text-white uppercase">{shortTittle}</h5>
     </div>
     <div>
        <p className="text-sm font-normal flex text-center max-w-[90%] mx-auto text-gray-200 dark:text-gray-400">{shortDesc}...</p>
        </div>
        <div className='flex justify-between align-bottom text-xs text-[#CDC2AE] px-2'>
          <p>Paylaşan: {authorId?.username}</p>
          <p>Tarih: <span>{format(createdAt, 'tr')}</span></p>
        </div>
    
</div>
</Link>
    );
  };
  
  export default BlogCard;