import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CoinStats = ({ newCoin, coin }) => {

  return (
    <div className="flex-col flex xs:mt-10 md:mt-0">
        <div className="flex flex-row justify-between border-b border-gray-300 pb-1 ">
            <p className="text-gray-500 font-light text-sm">Market Cap</p>
            <p className="text-gray-400 font-medium text-sm">${coin.market_cap?.toLocaleString() || ''}</p>
        </div>

        <div className="flex flex-row justify-between border-b border-gray-300 pt-2 pb-1">
            <p className="text-gray-500 font-light text-sm">Fully Diluted Valuation</p>
            <p className="text-gray-400 font-medium text-sm">${coin?.fully_diluted_valuation?.toLocaleString() || ''}</p>
        </div>

        <div className="flex flex-row justify-between border-b border-gray-300 pt-2  pb-1">
           <p className="text-gray-500 font-light text-sm">All Time High Date</p>
            <p className="text-gray-400 font-medium text-sm">{coin?.ath_date?.slice(0,10)}</p>
        </div>
        
        <div className="flex flex-row justify-between border-b border-gray-300 pt-2  pb-1">
           <p className="text-gray-500 font-light text-sm">All Change Percentage</p>
            <p className="text-gray-400 font-medium text-sm">{coin?.ath_change_percentage}%</p>
        </div>

        <div className="flex flex-row justify-between border-b border-gray-300 pt-2  pb-1">
        <p className="text-gray-500 font-light text-sm">Max Supply (!= Total Supply) </p>
            <p className="text-gray-400 font-medium text-sm">{coin?.max_supply?.toLocaleString() || ''} 
            <span className="pl-1 uppercase">{coin?.symbol}</span></p>
        </div>

        <div className="flex flex-row justify-between border-b border-gray-300 pt-2  pb-1">
        <p className="text-gray-500 font-light text-sm">Chain Homepage: </p>
            <Link href={""}>
              <p className="text-gray-400 font-medium text-sm cursor-pointer hover:underline">{newCoin?.links?.homepage[0]} 
              </p>
            </Link>
        </div>
    </div>
  )
}

export default CoinStats