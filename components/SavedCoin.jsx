import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Footer from './Footer';

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, 'users', `${user?.email}`);
  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((item) => item.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="">
      {coins?.length === 0 ? (
        <p>
          You don't have any coins saved. Please save a coin to add it to your
          watch list. <Link href='/'>Click here to search coins.</Link>
        </p>
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='text-gray-200 font-semibold text-lg md:text-xl pb-1  '>Mkt Rank</th>
              <th className='text-gray-200 font-semibold text-lg md:text-xl pb-1  '>Coin</th>
              <th className='text-gray-200 font-semibold text-lg md:text-xl pb-1  text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <tr key={coin?.id} className='h-[65px] overflow-hidden'>
                <td className="text-gray-500 lg:text-lg">{coin?.rank}</td>
                <td>
                  <button onClick={() => {
                                            const queryString = Object.entries(coin)
                                            .map(([key, value]) => `${key}=${value}`)
                                            .join('&');

                                            const url = `/coins/${coin.id}?${queryString}`;

                                            router.push(url);}}>
                    <div className='flex items-center'>
                      <img src={coin?.image} className='w-9 mr-4' alt='/' />
                      <div>
                        <p className='hidden text-gray-300 lg:text-lg sm:table-cell'>{coin?.name}</p>
                        <p className='text-gray-500 text-left text-sm lg:text-md'>
                          {coin?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </button>
                 
                </td>
                <td className='pl-8'>
                  <AiOutlineClose
                    size={18}
                    onClick={() => deleteCoin(coin?.id)}
                    className='cursor-pointer text-gray-600'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;