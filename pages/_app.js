import GeneralStats from '../components/GeneralStats'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CoinList from '../components/CoinTable'
import TrendingCoins from '../components/TrendingCoins'
import Footer from '../components/Footer'
import { AuthContextProvider } from '../context/AuthContext'

export default function App({ Component, pageProps }) {
  // const [stats, setStats] = useState({})

  // const url = "https://api.coingecko.com/api/v3/global"

  // useEffect(() => {
  //   axios.get(url).then((res) => {
  //     setStats(res.data)
  //     console.log("data: ", res.data)
  //   })
  // }, [])
  return (
    <div className="pt-2">
      <AuthContextProvider>
         <Navbar />
          <Component {...pageProps} />
      </AuthContextProvider>
      </div>
      
  )
}
