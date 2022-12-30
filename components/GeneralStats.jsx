import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dollar from '../assets/dollar.png'
import axios from 'axios'

const GeneralStats = () => {
  const [stats, setStats] = useState({})
  const url = "https://api.coingecko.com/api/v3/global"

  const fetchData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setStats(data)
    console.log("data: ", data)
  } 

  useEffect(() => {
    axios.get(url).then((res) => {
      setStats(res.data)
      console.log("data: ", res.data)
    })

  }, [url])

  return (
    <div className="flex flex-col text-white w-screen items-center justify-center text-center pb-10">
        <h1 className="items-center font-semibold py-10 text-3xl md:text-4xl xl:text-5xl">
            Cryptocurrency Prices by Market Cap
        </h1>

        <p className="text-gray-500 w-[520px] md:w-[700px] ">Coinified is now tracking 11,845 cryptocurrencies. Popular trends of the industry right now are defi and play to Earn. Along with recently launched NFT's for various blockchains.</p>
        
        <div>

        </div>
        <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10 mt-12 px-10 mr-1 " >
              <div className="flex flex-col px-8 bg-gray-500 bg-opacity-50 rounded-xl 2xl:w-[480px] 3xl:w-[500px] shadow-xl shadow-gray-800 ">
                  <Image src={dollar} className="text-green-300 text-sm pt-5" alt="dollar" />
                  <p className="flex py-4 text-gray-400 font-medium 2xl:text-lg" >Market Capitalization</p>
                  <span className="text-4xl lg:text-4xl font-semibold text-gray-300 flex 2xl:text-5xl">${(stats?.data?.total_market_cap?.usd?.toLocaleString())?.split('.')[0]}</span>
                  <div className={`${stats?.data?.market_cap_change_percentage_24h_usd > 0 ? "bg-green-400/80" : "bg-red-300/80"} rounded-xl w-[68px] mt-5 mb-8 h-8 items-center flex justify-center`}>
                    <span className={`${stats?.data?.market_cap_change_percentage_24h_usd > 0 ? "text-green-800" : "text-red-800"} font-bold `}>
                      {stats?.data?.market_cap_change_percentage_24h_usd?.toFixed(1)}%   
                    </span>
                  </div>
              </div>
            
              <div className="flex flex-col px-8  bg-gray-500 bg-opacity-50 rounded-xl 2xl:w-[480px] 3xl:w-[500px] shadow-xl shadow-gray-800 ">
                  <Image src={dollar} className="text-green-300 text-sm pt-5" alt="dollar" />
                  <p className="flex py-4 text-gray-400 font-medium 2xl:text-lg" >24h Trading Volume</p>
                  <span className="text-4xl lg:text-4xl font-semibold text-gray-300 flex 2xl:text-5xl">${( stats?.data?.total_volume.usd?.toLocaleString())?.split('.')[0]}</span>
                  <div className={`${stats?.data?.market_cap_percentage.matic > 0 ? "bg-green-400/80" : "bg-red-300/80"} rounded-xl w-[68px] mt-5 mb-8 h-8 items-center flex justify-center`}>
                    <span className={`${stats?.data?.market_cap_percentage.matic > 0 ? "text-green-800" : "text-red-800"} font-bold `}>
                      {stats?.data?.market_cap_percentage?.matic?.toFixed(1)}%   
                    </span>
                  </div>
              </div>
              
            
                <div className="flex flex-row pb-20 justify-between px-8 bg-gray-500 bg-opacity-50 rounded-xl 2xl:w-[480px] 3xl:w-[500px] shadow-xl shadow-gray-800 ">

                  <div className="flex flex-col ">
                    <Image src={dollar} className="text-green-300 text-sm pt-5" alt="dollar" />
                    <p className="flex py-4 text-gray-400 font-medium 2xl:text-lg" >Total Coins</p>
                    <span className="text-4xl lg:text-4xl font-semibold text-gray-300 flex 2xl:text-5xl">{stats?.data?.active_cryptocurrencies}</span>
                  </div>

                  <div className="flex flex-col">
                    <Image src={dollar} className="text-green-300 text-sm pt-5 ml-20" alt="dollar" />
                    <p className="flex py-4 text-gray-400 font-medium 2xl:text-lg" >BTC Cap Dominance</p>
                    <span className="text-4xl lg:text-4xl font-semibold text-gray-300 flex 2xl:text-5xl">{stats?.data?.market_cap_percentage?.btc?.toLocaleString()}%</span>
                  </div>
                </div>

        </div>
    </div>
  )
}

export default GeneralStats