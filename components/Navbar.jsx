import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../assets/logo-no-background.png'
import { BiUser } from 'react-icons/bi'
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { navItems } from '../constants'
import { UserAuth } from '../context/AuthContext'
import router from 'next/router'
import { useRouter } from 'next/router'

const Navbar = () => {
  const [menu, setMenu]= useState(false)
  const { user, signOut } = UserAuth()
  const router = useRouter()

  const signOutHandler = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col px-4" >
      <div className="w-full flex justify-between py-2 px-6  items-center  " >
          <Link href="/">
              <div className="w-[100px] md:w-[130px] items-center py-2 mb-1">
                  <Image  src={logo} width={250} className="text-xl object-contain rounded-full items-center" alt="logo" />
              </div>
          </Link>

          <ul className="hidden lg:flex flex-row text-gray-500 font-light gap-10 ">
            {
            navItems.map((item, id) => (
                <Link key={id} href={item.href}>
                    <li key={item.id} className="hover:border-b border-gray-400/30 hover:scale-110 duration-300 cursor-pointer pb-1 text-center capitalize" >
                      <p className=" hover:drop-shadow-md drop-shadow">
                          {item.content}
                        </p>
                    </li>
                </Link>
            ))}
          </ul>
 
          { user?.email ? (
            <div className="mx-2 flex flex-row items-center">
              <Link href="/accounts/Signup" className='p-4 hidden lg:flex'>
                <button className="hidden lg:flex px-1 xl:px-4 text-purple-300 gap-2 items-center justify-center text-lg md:text-xl rounded-xl border border-purple-300 w-40 h-[48px] mr-2 ">
                    <BiUser />
                    Account
                </button>
              </Link>
              <button className="hidden lg:flex text-gray-500" onClick={signOutHandler}>Sign Out</button>
            </div>
          ) :
          (
            
          <div className="hidden lg:flex flex-row text-center justify-center items-center">
            <Link href="/accounts/Login">
                <p className="text-gray-100 pr-6 text-lg xl:text-xl font-semibold" >Log In</p>
            </Link>
            <Link href="/accounts/Signup" >
              <button className="flex px-1 xl:px-4 text-purple-300 gap-2 items-center justify-center text-lg md:text-xl rounded-xl border border-purple-300 w-40 h-[48px] mr-2 ">
                  <BiUser />
                  Sign Up
              </button>
            </Link>
          </div>
          )}
          
          <button onClick={() => setMenu(!menu)} className="lg:hidden px-2">
              {
                menu 
                ? <AiOutlineCloseSquare size={37} className="text-purple-400 " /> 
                : <CgMenuRight size={37} className="text-purple-400 "  />
              }
          </button>
      </div>
      { menu ? (
      <ul className={`text-gray-500 items-center flex flex-col gap-4 ${menu ? " " : ""}`}>
            { 
              navItems.map((item) => (
                <Link href={item.href}>
                    <li key={item.id} className="hover:scale-110 duration-300 cursor-pointer border-b border-gray-400/30 pb-1 text-center capitalize" >
                      <p className=" hover:drop-shadow-md drop-shadow">
                          {item.content}
                        </p>
                    </li>
                </Link>
              ))}
              <div className="w-full">
                {
                  user?.email ? (
                    <Link href="/accounts/Signup"> 
                      <button className="w-full border text-purple-200 font-light text-lg border-purple-400 rounded-2xl py-2" onClick={signOutHandler}>Access Account</button>
                    </Link>
                  )
                  : (
                    <button className="w-full border text-purple-200 font-light text-lg border-purple-400 rounded-2xl py-2">Log In To Account</button>
                  )
                }
              </div>
      </ul> )
      : (<div></div>)
    }
    </div>

  )
}

export default Navbar