'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signIn } from 'next-auth/react'
import gunes3 from '@/assets/Images/gunes3.jpeg'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        if (password === '' || username === '') {
            toast.error("Fill all fields!")
            return
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return
        }

        try {
            const res = await signIn('credentials', { username, password, redirect: false })

            if (res?.error == null) {
                router.push("/")
            } else {
                toast.error("Error occured while logging")
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
              <section className="bg-ct-blue-600 mt-10 min-h-screen">
        <div className="mx-auto py-5 flex justify-center items-center">
          <div className="bg-white"></div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 max-w-6xl">
    <div className="flex justify-center items-center">
      <Image
        src={gunes3}
        width={300}
        height={300}
        className="mx-auto rounded-md"
        alt="Picture of the author"
        priority={true}
      />
    </div>
    <div className="">
      <form onSubmit={handleSubmit} className="h-[400px] lg:w-[400px] shadow-lg p-10">
        <div className="mb-6">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            required
                        className={`${input_style}`}
           type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Şifre</label>
  <input type="password" placeholder='Password...' className={`${input_style}`} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button
          type="submit"
           style={{ backgroundColor: loading ? "#ccc" : "#fdb44b" }}
          className="inline-block px-7 mt-5 py-4 text-white font-medium text-sm leading-snug uppercase rounded shadow-md active:shadow-lg transition duration-150 ease-in-out w-full"
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  </div>
            </div>
                  
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      </section>
        
    )
}

export default Login