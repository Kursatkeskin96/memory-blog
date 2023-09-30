
import GalleryCard from '@/components/galleryCard/GalleryCard'
import React from 'react'
import Image from 'next/image'
import galeri from '@/assets/images/galeri.jpg'

export async function fetchGalleries(){
  const res = await fetch('http://localhost:3000/api/gallery', {cache: 'no-store'})
  return res.json()
}

export default async function Galeri() {
  const galleries = await fetchGalleries()

  return (
    <div className=''>
    <div className='bg-[#C7D3D1] lg:h-80 md:h-80 h-screen w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
           <div className=' mx-auto mt-14'>
        <Image src={galeri} width={200} alt='blog'/>
      </div>
      <div className='lg:ml-30 lg:mt-20 md:mt-16 text-center lg:text-left md:text-center mb-24 max-w-[85%]'>
        <h1 className='text-2xl font-bold'>Gunes'in Galerisine Hos Geldiniz</h1>
        <p className='my-2'>Bu sayfa, Gunes'in gelisimini gorebileceginiz gorseller ile dolu. Fotograf aciklamalarini gormek icin tek yapmaniz gereken mouseu fotografin uzerine getirmek veya fotografa tiklamak!</p>
      </div>
    </div>
    <div className='pt-10 pb-20 h-full max-w-[80%] mx-auto mt-10 rounded-md shadow-lg mb-10 bg-[#F4F2DE]'>
      <div className="flex items-center mx-auto justify-center flex-wrap gap-20">
            {galleries.map((gallery) => (
                <GalleryCard key={gallery._id} gallery={gallery} />
            ))}
        </div>
    </div>
    </div>
  )
}
