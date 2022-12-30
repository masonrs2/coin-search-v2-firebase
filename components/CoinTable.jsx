import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsSearch } from 'react-icons/bs'
import CoinRow from './CoinRow'

const CoinList = () => {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')

    const coinGeckoUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d'
    useEffect(() => {
        axios.get(coinGeckoUrl).then((res) => {
            setCoins(res.data)
            console.log("Coins: ", coins)
        })
    }, [coinGeckoUrl])

  return (
    <div id="cryptocurrencies" className="text-white px-8 flex flex-col py-10">
        <div className="flex flex-col">

            <div className="flex justify-center">
                <form className="rounded-xl w-[600px] lg:w-96 h-10 flex items-center bg-gray-800/60 px-4 hover:border hover:border-gray-400/50">
                    <BsSearch className="text-gray-400 " size={20}   />
                    <input 
                        type="text" 
                        placeholder="Search a Coin..." 
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl h-full flex items-center w-96 relative  px-4 bg-transparent cursor-pointer outline-none"
                    />
                </form>
            </div>

            
        </div>
        
        <div className="flex">

          <table className='w-full border-collapse text-center mt-10 rounded-xl bg-gradient-to-br from-gray-900 via-black to-gray-800 '>
          <thead className="text-lg h-16">
                    <tr className='border-b border-b-gray-600'>
                        <th></th>
                        <th className='px-4'>#</th>
                        <th className='text-left'>Coin</th>
                        <th></th>
                        <th>Price</th>
                        <th>24h</th>
                        <th className='hidden md:table-cell'>24h Volume</th>
                        <th className='hidden lg:table-cell'>Mkt</th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>
          <tbody>
            {
              coins.filter((coin) => {
                if(search === "") { return coin }
                else if(coin.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                  return coin
                }
              })
                .map((coin) => (
                  <CoinRow coin={coin} key={coin.id} />
                ))
            }
          </tbody>
        </table>
        </div>


    </div>
  )
}

export default CoinList