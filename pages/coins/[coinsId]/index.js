import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useRouter } from "next/router";
import CoinStats from "../../../components/CoinStats";
import {
  RiArrowUpSFill,
  RiArrowDownSFill,
  RiArrowDownLine,
  RiArrowUpLine,
} from "react-icons/ri";

const CoinInfo = () => {
  const [coin, setCoin] = useState([]);
  const [newCoin, setnewCoin] = useState({})

  const [coinStats, setCoinStats] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d`;

  useEffect(() => {
    if (!url ) {
      window.location.reload();
      return;
    }

    const fetchCoin = async () => {
      const id = router.query.id;
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d`
      );
      const coin = await data.json();
      console.log("coin: ", coin[0]);
      console.log("Id: ", id);
      setCoin(coin);
    };

    const fetchNewCoin = async () => {
      const id = router.query.id;
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=true&tickers=true&market_data=true&community_data=false&sparkline=true
      `)
      const newCoin = await data.json()
      console.log("newCoin: " , newCoin)
      setnewCoin(newCoin)
      
    }
    fetchCoin();
    fetchNewCoin();
  }, [router.isReady, id, router.query.id, url]);

  return (
    <div className="w-full h-screen text-gray-600 bg-black px-6">
      <div className="bg-black rounded-lg shadow-lg xl:px-32 lg:px-16 border border-gray-400 mt-8 px-6 pt-6 pb-10">
        {coin?.map((coin) => (
          <div key={coin?.name} className="flex flex-col">
            <span className="text-white mt-5 bg-purple-400 w-20 text-sm p-[3px] text-center rounded-md mb-3 ">
              Rank #{coin?.market_cap_rank}
            </span>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-0">
              <div className="flex flex-col">
                <div className="flex flex-row items-center pb-2 text-gray-300">
                  <img
                    src={coin?.image}
                    alt={coin?.name}
                    width={35}
                    height={35}
                  />
                  <h1 className="pl-3 pr-2 font-bold text-2xl">{coin?.name}</h1>
                  <p className="font-bold uppercase text-2xl">
                    ({coin?.symbol})
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="text-3xl font-bold text-gray-400">${coin?.current_price}</p>
                  <p
                    className={`pl-2 ${
                      coin?.price_change_24 >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin?.price_change_24 >= 0 ? (
                      <RiArrowUpSFill size={37} />
                    ) : (
                      <RiArrowDownSFill size={37} />
                    )}
                  </p>
                  <p
                    className={`${
                      coin?.price_change_24>= 0
                        ? "text-green-600"
                        : "text-red-600"
                    } font-bold ml-[-3px] text-xl`}
                  >
                    {Number(coin?.price_change_percentage_24h)?.toFixed(2)}%
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <div></div>
                  <p className="text-gray-600 text-md pt-2 pb-[2px]">
                    24h Price Change:{" "}
                    <span
                      className={`${
                        coin?.price_change_24>= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {coin?.price_change_24h}
                    </span>
                  </p>
                  <span
                    className={`pl-1 pt-2 ${
                      coin?.price_change_24>= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin?.price_change_24>= 0 ? (
                      <RiArrowUpLine className="font-bold" />
                    ) : (
                      <RiArrowDownLine className="font-bold" />
                    )}{" "}
                  </span>

                </div>
                  <p className="flex flex-row items-center text-gray-600 text-md pb-[2px]">
                    Total Supply: <span className="ml-1 uppercase">{coin?.total_supply} {" "} {coin?.symbol} </span>
                  </p>
                
                <div className="flex flex-row text-center items-center"> 
                <p className="text-gray-600 text-md font-light  ">
                  {newCoin?.market_data?.current_price?.btc}{" "}
      
                    <span className="uppercase">BTC</span> { " "}
                    <span className={`${newCoin?.market_data?.price_change_percentage_24h_in_currency?.btc>= 0 ? "text-green-600" : "text-red-600"}`}>
                    <span> {newCoin?.market_data?.price_change_percentage_24h_in_currency?.btc?.toFixed(1)}%  
                    </span>
                  
                  </span>

                </p>
                <span className={`${newCoin?.market_data?.price_change_percentage_24h_in_currency?.eth>= 0 ? "text-green-600" : "text-red-600"}`}>
                { newCoin?.market_data?.price_change_percentage_24h_in_currency?.eth>= 0 
                    ?
                    <RiArrowUpLine className="font-bold" /> 
                    : 
                    <RiArrowDownLine className="font-bold" />
                     }
                </span>
                </div>

                <div className="flex flex-row text-center items-center"> 
                <p className="text-gray-600 text-md font-light  ">
                  {newCoin?.market_data?.current_price?.eth}{" "}
      
                    <span className="uppercase">ETH</span> { " "}
                    <span className={`${newCoin?.market_data?.price_change_percentage_24h_in_currency?.eth>= 0 ? "text-green-600" : "text-red-600"}`}>
                    <span> {newCoin?.market_data?.price_change_percentage_24h_in_currency?.eth?.toFixed(1)}%  
                    </span>
                  
                  </span>

                </p>
                <span className={`${newCoin?.market_data?.price_change_percentage_24h_in_currency?.eth>= 0 ? "text-green-600" : "text-red-600"}`}>
                { newCoin?.market_data?.price_change_percentage_24h_in_currency?.eth>= 0 
                    ?
                    <RiArrowUpLine className="font-bold" /> 
                    : 
                    <RiArrowDownLine className="font-bold" />
                     }
                </span>
                </div>

              </div>

              <div className="">
                <CoinStats newCoin={newCoin} coin={coin} />
              </div>
            </div>

            <div className="pt-8">
              <h1 className="font-bold text-2xl xl:text-3xl xl:py-6 xl:pb-10 text-center">7 Day Line Chart of {coin?.name}</h1>
              <Sparklines className="" data={coin?.sparkline_in_7d?.price}>
                          {
                            coin?.sparkline_in_7d?.price[0] > coin?.sparkline_in_7d?.price[coin?.sparkline_in_7d?.price?.length-1]
                            ? 
                            <SparklinesLine color='red' /> 
                            : 
                            <SparklinesLine color='teal' />
                          }
                                      
                  </Sparklines>
            </div>

            <div className="flex flex-col pt-8 xl:text-lg text-gray-300">
              <h1 className="font-semibold xl:text-3xl pb-4">About {coin?.name}</h1>
              <p>
                {newCoin?.description?.en}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CoinInfo;