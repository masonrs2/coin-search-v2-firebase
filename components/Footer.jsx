import React from 'react'

const Footer = () => {
  return (
    <div className="bg-black  rounded-lg shadow-xl xl:px-32 lg:px-16 border-t border-gray-600 pt-4 pb-5 px-8 mt-9 ">
        <div className="flex flex-col justify-center items-center pt-2">
            <div className="flex flex-row text-white gap-3 text-sm relative bottom-2">
                <p className="">Disclaimer</p>
                <p className="">Terms of Service</p>
                <p className="">Privacy Policy</p>
                <p className="">About Us</p>
            </div>            
            <p className="text-gray-700 text-sm ">© 2022 Crpyto CoinSearch. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer