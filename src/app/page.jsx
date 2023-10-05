'use client'
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Gunes1 from '@/assets/Images/gunes1.jpeg'
import Gunes3 from '@/assets/Images/gunes3.jpeg'
import Image from "next/image";


export default function page() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [home, setHome] = useState([]);


  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);

    })();
  }, []); 

  useEffect(() => {
    const fetchHome = async () => {
      const response = await fetch('/api/home');
      const data = await response.json();
      setHome(data);
    };
      fetchHome();
  }, []);

  return (
    <div className="h-screen">
        {session?.user ? ( 
          <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center max-w-6xl mx-auto">
          <div className="max-w-[90%] p-4 mx-auto">
            <Image
            src={Gunes1}
            className="rounded-md mx-auto"
            height={350}
            alt="Picture of the author"
            />
          </div>
          <div className= "p-4">
          <h1 className="h1gradient mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">Güneş'in dünyasına hoş geldin.</h1>
          <p className="text-lg text-gray-500 lg:text-lg dark:text-gray-400">Artık giriş yaptığına göre içeriklere erişebilirsin.</p>
          <p className="my-5 text-lg text-gray-500 lg:text-lg dark:text-gray-400">Güneş'e ileride okuyacağı notları paylaşabilir, galeri sayfasından Güneş'in her ay nasıl büyüdüğünü görebilirsin.</p>
          <p className="text-lg text-gray-500 lg:text-lg dark:text-gray-400">Aynı zamanda kelime sayfasında da Güneş'in ilk kelimelerini ve hangi anlama geldiğini görebilirsin. Bir nevi Güneş Sözlük!</p>
          <p className="mt-5 text-lg text-gray-500 lg:text-lg dark:text-gray-400">Site henüz geliştirme aşamasında. Önümüzdeki günlerde güncellenerek yeni özellikler eklenecek. Eğer aklında fikir varsa, benimle iletişime geçebilirsin...</p>

          </div>
        </div>
         ) : (  <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="mb-10">
             <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center max-w-6xl mx-auto">
          <div className="max-w-[90%] p-4 mx-auto">
            <Image
            src={Gunes3}
            className="rounded-md mb-10 mx-auto"
            height={350}
            alt="Picture of the author"
            />
          </div>
          <div className= "p-4">
          <h1 className="h1gradient mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl"> Güneş'in dünyasına hoş geldin.</h1>
          <p className="text-lg text-gray-500 lg:text-lg dark:text-gray-400">Bu internet sitesi Güneş'in internetteki anı defteri olarak tasarlanmıştır</p>
          <p className="my-5 text-lg text-gray-500 lg:text-lg dark:text-gray-400">Bu site üzerinden Güneş'e ileride okuyabileceği notlar yazabilir, ilk kelimelerini ve ne anlama geldiğini gösteren sözlüğe göz atabilir, Güneş'in doğumundan beri her ay güncellenen foto galeride gezinebilirsiniz.</p>
          <p className="mt-5 text-lg text-gray-500 lg:text-lg dark:text-gray-400">İçeriklere erişim aile üyeleri ile sınırlıdır. Devam etmek için lütfen giriş yapın.</p>
          <button className=" w-36 bg-gradient-to-br from-[#fdb44b] to-yellow-300  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-white mt-10 flex justify-center mx-auto max-w-[50%] text-cetner items-center p-3 rounded-md text-white" onClick={signIn}>Giris Yap</button>
          </div>
          
        </div>
                </div>
              ))}
          </>
        )}
      </div> 
  )
}