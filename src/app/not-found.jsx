import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div>Boyle bir sayfa bulunamadi.</div>
        <div className='mt-2'>Ana Sayfaya donmek icin <span className='underline cursor-pointer text-blue-400'><Link href='/'>tikla</Link></span></div>
    </div>
  )
}