import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import Provider from '@/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Güneş Özdemir',
  description: "Bu site, Güneş Özdemir'in ani defteridir. ",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Provider>
        <Navbar />
        {children}
        </Provider>
        <Footer />
      </body>
    </html>
  )
}
