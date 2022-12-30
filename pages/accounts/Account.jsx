import React from 'react';
import SavedCoin from '../../components/SavedCoin';
import { UserAuth } from '../../context/AuthContext';
import router, { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';

const Account = () => {
  const { user, signOut } = UserAuth();

  function redirect() {
    router.push('/accounts/Login');
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  if (user) {
    return (
      <div className='max-w-[1140px] mx-auto'>
        <div className='flex justify-between items-center my-12 rounded-div'>
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className='text-4xl lg:text-6xl text-gray-600 pb-4 font-bold justify-center'>Account</h1>
            <div>
              <p className="text-gray-400 font-semibold">Welcome, {user?.email}</p>
            </div>
          </div>
       
        </div>
        <div className='flex justify-between items-center my-12 rounded-div'>
          <div className='w-full min-h-[300px]'>
            <h1 className='text-3xl text-gray-600 font-bold py-4 flex justify-center pb-10'>Watch Listed Coins</h1>
            <SavedCoin />
          </div>
        </div>
      </div>
    );
  } else {
    return redirect();
  }
};

export default Account;