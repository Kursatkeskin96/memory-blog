import BlogCard from '@/components/blogCard/BlogCard'
import React from 'react'
import Image from 'next/image'
import blog from '@/assets/Images/blog1.jpg'
import Link from 'next/link'

export async function fetchBlogs(){
  const res = await fetch('https://gunesozdemir.vercel.app/api/blog', {cache: 'no-store'})
  return res.json()
}


export default async function Blog() {
  const blogs = await fetchBlogs()


  return (
    <>
    <div className=''>
      <div className='bg-[#C2DED1] lg:h-80 md:h-80 h-screen w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
             <div className='mix-blend-multiply mx-auto'>
          <Image src={blog} width={300} alt='blog'/>
        </div>
        <div className='lg:ml-20 lg:mt-16 md:mt-16 text-center lg:text-left md:text-center mb-24'>
          <h1 className='text-2xl font-bold'>Gunes'in Ani Defterine Hos Geldiniz</h1>
          <p className='my-2'>Bu sayfada, Gunes'in ileride okuyacagi metinler yazabilir, istediginiz zaman duzenleyebilirsiniz.</p>
          <p className=' text-sm'>Soz ucar, yazi kalir. Burada paylasilan her sey, Gunes'e unutulmaz hatira kalir.</p>
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
