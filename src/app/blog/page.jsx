'use client'
import BlogCard from '@/components/blogCard/BlogCard'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import blog from '@/assets/Images/blog1.jpg'
import Link from 'next/link'
import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react';

export async function fetchBlogs(){


  if (typeof window !== 'undefined') {
    var currentURL = window.location.href;
    var urlParts = currentURL.split("/");
    var domain = urlParts[1];
  }

  const api = domain;

  try {
    const res = await fetch(`${api}/api/blog`, {cache: 'no-store'});
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return [];
  }
}


export default function Blog() {
  const { data: session, status } = useSession();
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [status]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };

    fetchData();
  }, []);


  return (
    <>
    <div className=''>
      <div className='bg-[#C2DED1] lg:h-80 md:h-80 h-screen w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
             <div className='mix-blend-multiply mx-auto'>
          <Image src={blog} width={300} alt='blog'/>
        </div>
        <div className='lg:ml-20 lg:mt-16 md:mt-16 text-center lg:text-left md:text-center mb-24'>
          <h1 className='text-2xl font-bold'>Güneş'in Anı Defterine Hoş Geldiniz</h1>
          <p className='my-2'>Bu sayfada, Güneş'in ileride okuyacağı metinler yazabilir, istediğiniz zaman düzenleyebilirsiniz.</p>
          <p className=' text-sm'>Söz uçar, yazı kalır. Burada paylaşılan her şey, Güneş'e unutulmaz hatıra kalır.</p>
          <Link href={'/blog/create-blog'}>
          <button className='mt-4 uppercase bg-[#f59f26] w-40 p-1 text-white rounded-md'>Blog Yaz</button>
          </Link>
        </div>
      </div>
      </div>

        <div className='flex justify-center gap-20 flex-wrap items-center mt-10 mb-10'>
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
      </>
  )
}
