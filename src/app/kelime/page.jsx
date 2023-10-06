'use client'
import WordCard from '@/components/wordCard/WordCard'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import books from '@/assets/Images/books.png'


export async function fetchWords(){

  if (typeof window !== 'undefined') {
    var currentURL = window.location.href;
    var urlParts = currentURL.split("/");
    var domain = urlParts[1];
  }

  const api = domain;
  const res = await fetch(`${api}/api/kelime`, {cache: 'no-store'})
  return res.json()
}


export default function Kelime() {
  const [words, setWords] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWords();
      setWords(data);
    };

    fetchData();
  }, []);


  return (
      <div className=''>
      <div className='bg-[#EEE9DA] lg:h-80 md:h-80 h-screen w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
             <div className='mix-blend-multiply mx-auto mt-14'>
          <Image src={books} width={300} alt='blog'/>
        </div>
        <div className='lg:ml-30 lg:mt-20 md:mt-16 text-center lg:text-left md:text-center mb-24 lg:max-w-[85%]'>
          <h1 className='text-2xl font-bold'>Güneş'in Sözlüğüne Hoş Geldiniz</h1>
          <p className='my-2'>Bu sayfada, Güneş'in ilk kelimelerini görebilirsiniz. Anlamlarını görmek için yapmanız gereken tek şey, kartın üzerine tıklamak!</p>
        </div>
      </div>
        <div className='bg-slate-100 py-10 flex justify-center items-center flex-wrap gap-20'>
            {words.map((word) => (
                <WordCard key={word._id} word={word} />
            ))}
        </div>
    </div>
  )
}
