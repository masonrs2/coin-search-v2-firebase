import { Inter } from '@next/font/google'
import AboutUs from '../components/AboutUs'
import CoinList from '../components/CoinTable'
import Footer from '../components/Footer'
import GeneralStats from '../components/GeneralStats'
import Navbar from '../components/Navbar'
import TrendingCoins from '../components/TrendingCoins'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="">
      <div className="text-black py-2 flex flex-col">
        <div className="flex gap-6 md:gap-20 " >
           {/* <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto " >
              <Sidebar />
           </div> */}
           <div className="mt-4 overflow-auto h-[88vh] ">
             <GeneralStats />
             <CoinList />
             <TrendingCoins />
             <AboutUs />
             <Footer />
           </div>
        </div>
      </div>
        
      </div>
  )
}
