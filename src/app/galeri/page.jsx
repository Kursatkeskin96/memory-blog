import GalleryCard from '@/components/galleryCard/GalleryCard'
import React from 'react'

export async function fetchGalleries(){
  const res = await fetch('http://localhost:3000/api/gallery', {cache: 'no-store'})
  return res.json()
}

export default async function Galeri() {
  const galleries = await fetchGalleries()

  return (
    <div>
        <div>
            {galleries.map((gallery) => (
                <GalleryCard key={gallery._id} gallery={gallery} />
            ))}
        </div>
    </div>
  )
}
