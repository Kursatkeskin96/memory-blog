import WordCard from '@/components/wordCard/WordCard'
import React from 'react'
import Image from 'next/image'
import books from '@/assets/images/books.png'
import Link from 'next/link'

export async function fetchWords(){
  const res = await fetch('http://localhost:3000/api/kelime', {cache: 'no-store'})
  return res.json()
}


export default async function Kelime() {
  const words = await fetchWords()

  return (
      <div className=''>
      <div className='bg-[#EEE9DA] lg:h-80 md:h-80 h-screen w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
             <div className='mix-blend-multiply mx-auto mt-14'>
          <Image src={books} width={300} alt='blog'/>
        </div>
        <div className='lg:ml-30 lg:mt-20 md:mt-16 text-center lg:text-left md:text-center mb-24 max-w-[85%]'>
          <h1 className='text-2xl font-bold'>Gunes'in Sozlugune Hos Geldiniz</h1>
          <p className='my-2'>Bu sayfada, Gunes'in ilk kelimelerini gorebilirsiniz. Anlamlarini gormek icin yapmaniz gereken tek sey, kartin uzerine tiklamak!</p>
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
