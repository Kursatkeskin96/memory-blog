'use client'
import Image from 'next/image';
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format } from 'timeago.js';
const BlogCard = ({ gallery: { title, imageUrl, authorId, _id, createdAt } }) => {
    const { data: session } = useSession()
  
  
    return (
      <div>
        <div>
          <Image src={imageUrl} width={200} height={200} alt="image" />
          <h3>{title}</h3>
          <p>
            Posted by; {authorId?.username}
          </p>
          <div>Posted: <span>{format(createdAt)}</span></div>
        </div>
        {authorId?._id.toString() === session?.user?._id.toString() && (
                <div>
                   <Link href={`/galeri/${_id}`}><button>Edit</button></Link>
                    
                </div>
            )}
      </div>
    );
  };
  
  export default BlogCard;