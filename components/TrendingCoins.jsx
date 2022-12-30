import React, { useEffect, useState } from 'react'

const TrendingCoins = () => {
    const [coins, setCoins] = useState([])
    const url = "https://api.coingecko.com/api/v3/search/trending"

    const fetchTrending = async () => {
        const data = await fetch(url) 
        const coins = await data.json()
        setCoins(coins.coins)
        console.log(coins.coins)
    }

    useEffect(() => {
        fetchTrending()
    }, [])
    
  return (
    <div id="trending" name="trending" className="text-gray-400 shadow-lg shadow- xl:px-32 lg:px-16 border-t border-t-gray-800 mt-8 px-6 pt-6 pb-10 "> 
        <h1 className="text-gray-600 font-bold text-3xl flex py-1" >Trending Coins</h1>
        <div className="flex flex-col py-4">  
            {
                coins.map((coin) => (
                    <div className="lg:hidden flex flex-row gap-2 text-center rounded-md shadow-xl shadow-gray-800 h-20 items-center px-4 justify-between ">
            
                            <div className="flex flex-col mt-4"> 
                                <div className="flex flex-row">
                                    <img src={coin.item.small} className="w-10 h-10 object-contain rounded-full" alt="" />
                                    <div className="px-2 ">
                                        <p className="text-sm text-gray-600 font-medium justify-start flex">{coin.item.name}</p>
                                        <p className="font-medium">{coin.item.price_btc.toFixed(14)}</p>
                                    </div>
                                </div>
                            </div>
                    
                        
                        <div className="flex flex-col px-6 mt-4 gap-2 items-center justify-center text-center font-medium">
                            <p className="ml-24 text-gray-200">${coin.item.symbol}</p>
                            <p>Market Cap Rank: {coin.item.market_cap_rank}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="hidden lg:grid lg:grid-cols-4 md:grid-cols-3 gap-4">
            {
                coins.map((coin) => (
                    <div className="rounded-md shadow-xl shadow-gray-800 flex flex-col ">
                        <div className="px-5 xl:px-10 2xl:px-20 2xl:py-10 lg:py-8">
                            <div className="flex flex-row py-2">
                                <div className="flex flex-col">
                                    <p className="text-gray-600 text-sm 2xl:text-xl lg:text-lg">{coin.item.name}</p>
                                    <p className="2xl:text-lg font-medium lg:text-lg pt-1">${coin.item.price_btc.toFixed(10)}</p>
                                </div>
                                <p className="text-gray-200 text-sm 2xl:text-xl  lg:text-lg font-medium ">${coin.item.symbol}</p>
                            </div> 
                            <img src={coin.item.large} className="w-20 ml-8 2xl:w-24 lg:w-[5.7rem]" alt="" />
                        </div>
                       
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default TrendingCoins