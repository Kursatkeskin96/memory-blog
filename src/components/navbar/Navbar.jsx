"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {RxHamburgerMenu} from 'react-icons/rx'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const isAdmin = session?.user?.role === 'Admin';

  return (
    <nav className='bg-[#116A7B] h-14 text-white flex-between w-full pt-3'>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex ml-auto mr-5 gap-3 md:gap-5'>
            <div className="p-1 hover:border-b-2 border-[#fdb44b] ">
              <Link href='/'>Ana Sayfa</Link>
            </div>
            <div className="p-1 hover:border-b-2 border-[#fdb44b] ">
              <Link href='/blog'>Blog</Link>
            </div>
            <div className="p-1 hover:border-b-2 border-[#fdb44b] ">
              <Link href='/kelime'>Kelime</Link>
            </div>
            <div className="p-1 hover:border-b-2 border-[#fdb44b] ">
              <Link href='/galeri'>Galeri</Link>
            </div>
            {session?.user?.role === 'admin' ? (
            <div className="p-1 hover:border-b-2 border-[#fdb44b]">
              <Link href='/panel'>Admin Panel</Link>
            </div>
          ) : null}
            <div className="bg-[#f59f26] p-1 rounded-md">
            <button type='button' onClick={signOut} className='outline_btn'>
            Çıkış Yap
            </button>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex ml-auto">
                <div className="mx-5 justify-center items-center hover:border-b-2 border-[#fdb44b]">
                  <Link href="/">
                    Ana Sayfa
                  </Link>
                </div>
                    <div className='mr-8 hover:border-b-2 border-[#fdb44b]'>
                    <button onClick={signIn} type='button'>
                    Giriş Yap
                    </button>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative bg-[#116A7B]'>
        {session?.user ? (
          <div>
            <RxHamburgerMenu className="ml-5 cursor-pointer" onClick={() => setToggleDropdown(!toggleDropdown)} />
            {toggleDropdown && (
              <div className='dropdown ease-in duration-500 ml-2 mt-4 text-center'>
                <div>
                <Link
                  href='/'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                 Ana Sayfa
                </Link>
                </div>

                <div className="my-2">
                <Link
                  href='/blog'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  Blog
                </Link>
                </div>

                <div>
                <Link
                  href='/kelime'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                 Kelime
                </Link>
                </div>
                
                <div className="my-2">
                <Link
                  href='/galeri'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  Galeri
                </Link>
                </div>
                {session?.user?.role === 'admin' ? (
                <div className="mb-2">
                  <Link href='/panel'>Panel</Link>
                </div>
              ) : null}
                <div className="mb-2 p-1 text-[#fdb44b] rounded-md">
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='dropdown_link'
                >
                  Çıkış Yap
                </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex justify-center items-center mx-auto">
                <div className="mx-3 hover:border-b-2 border-[#fdb44b]">
                <Link
                  href='/'
                  onClick={() => setToggleDropdown(false)}>
                 Ana Sayfa
                </Link>
                </div>
                
                <div className="mx-3 hover:border-b-2 border-[#fdb44b]">
                <Link href='/login?callbackUrl=https%3A%2F%2Fgunesozdemir.vercel.app%2F'>
                <button
                  type='button'
                >
                  Giriş Yap
                </button>
                </Link>
                </div>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;