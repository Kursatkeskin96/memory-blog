'use client'
import GalleryCard from '@/components/galleryCard/GalleryCard';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import galeri from '@/assets/Images/galeri.jpg';
import { useSession } from 'next-auth/react';


export async function fetchGalleries(){

  if (typeof window !== 'undefined') {
    var currentURL = window.location.href;
    var urlParts = currentURL.split("/");
    var domain = urlParts[1];
  }

  const api = domain;

  try {
    const res = await fetch(`${api}/api/gallery`, {cache: 'no-store'});
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return [];
  }
}

export default function Galeri() {
  const [galleries, setGalleries] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  }, [status]);



  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGalleries();
      setGalleries(data);
    };

    fetchData();
  }, []);
  return (
    <div className=''>
    <div className='bg-[#C7D3D1] lg:h-80 md:h-80 h-screen w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
           <div className=' mx-auto mt-14'>
        <Image src={galeri} width={200} alt='blog'/>
      </div>
      <div className='lg:ml-30 lg:mt-20 md:mt-16 text-center lg:text-left md:text-center mb-24 lg:max-w-[85%]'>
        <h1 className='text-2xl font-bold'>Güneş'in Galerisine Hoş Geldiniz</h1>
        <p className='my-2'>Bu sayfa, Güneş'in gelişimini görebileceğiniz görseller ile dolu. Fotoğraf açıklamalarını görmek için tek yapmanız gereken mouse'u fotoğrafın üzerine getirmek veya fotoğrafa tıklamak!</p>
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
