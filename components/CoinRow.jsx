import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import Router, { useRouter } from 'next/router'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { UserAuth } from '../context/AuthContext'

const CoinRow = ({ coin }) => {
    const [savedCoin, setSavedCoin] = useState(false)
    const { user } = UserAuth()
    const router = useRouter()
    
    const coinPath = doc(db, 'users', `${user?.email}`)

    const saveCoin = async () => {
        if(user?.email && savedCoin) {
            setSavedCoin(false);
        }
        else if(user?.email) {
            setSavedCoin(true)
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image,
                    rank: coin.market_cap_rank,
                    symbol: coin.symbol,
                }
            )})
            
        } else {
            alert("Can't save a coin without logging in!")
        }
    }

    function sendProps() { 
        Router.push({
            pathname: `/Page/coins/${coin.id}`
        })
    }

  return (
    <tr 
        key={coin.id} 
        className='h-[80px]  overflow-hidden'>   
            
                                <td className="cursor-pointer md:relative md:left-0 xl:relative xl:left-5 pl-4 " onClick={saveCoin}>
                                    {savedCoin ? <AiFillStar size={20} /> : <AiOutlineStar size={20} />}
                                </td>
                        
                                <td>{coin?.market_cap_rank}</td>
                                <td>
                            
                                        <div 
                                          onClick={() => {
                                            const queryString = Object.entries(coin)
                                            .map(([key, value]) => `${key}=${value}`)
                                            .join('&');

                                            const url = `/coins/${coin.id}?${queryString}`;

                                            router.push(url);
                                        }}
                                         className='flex items-center cursor-pointer'>
                                            <div>         
                                                <img
                                                className='w-6 mr-2 rounded-full'
                                                src={coin.image}
                                                alt={coin.id}
                                                />
            
                                            </div>
                                            <p className='hidden sm:table-cell lg:text-lg font-semibold'>{coin.name} <span className="text-gray-500 px-1 uppercase">{coin.symbol}</span></p>
                                        </div>
                                
                            
                                </td>
                                <td></td>
                                <td>${coin.current_price.toLocaleString()}</td>
                                <td className="px-2 flex justify-center py-8">
                                    {coin.price_change_percentage_24h > 0 ? (
                                    <div className="md:bg-green-400/90 rounded-xl h-8 2xl:w-20 flex justify-center items-center px-2 `">
                                        <p className='text-green-900 font-semibold'>
                                            +{coin.price_change_percentage_24h.toFixed(2)}%
                                        </p>
                                    </div>
                                    ) : (
                                        <div className="md:bg-red-400/80 rounded-xl h-8 2xl:w-20 flex justify-center items-center px-2 ">
                                            <p className='text-red-900 font-semibold'>
                                                {coin.price_change_percentage_24h.toFixed(2)}%
                                            </p>
                                        </div>
                                    )}
                                </td>
                                
                                <td className='w-[180px] hidden md:table-cell'>
                                    ${coin.total_volume.toLocaleString()}
                                </td>
                                <td className='w-[180px] hidden lg:table-cell'>
                                    ${coin.market_cap.toLocaleString()}
                                </td>
                                <td className="pr-4">
                                   <Sparklines data={coin.sparkline_in_7d.price}>
                                    {
                                    coin.sparkline_in_7d.price[0] > coin.sparkline_in_7d.price[coin.sparkline_in_7d.price.length-1]
                                    ? 
                                    <SparklinesLine color='red' /> 
                                    : 
                                    <SparklinesLine color='teal' />
                                    }
                                    
                                   </Sparklines>
                                
                                </td>
                                </tr>
  )
}

export default CoinRow