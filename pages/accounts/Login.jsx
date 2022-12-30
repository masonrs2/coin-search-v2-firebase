import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router' 
import Navbar from "../../components/Navbar"
import google from "../../assets/google.png"
import Image from 'next/image'
import Footer from '../../components/Footer'
import { FaUserCircle } from 'react-icons/fa'
import { logIn, UserAuth } from "../../context/AuthContext"
import router from 'next/router'
import Link from 'next/link'


const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { logIn, googleSignIn } = UserAuth()

    const handleGoogleSignIn = async (e) => {
        e.preventDefault()
        try {
            await googleSignIn()
            console.log("Email: ", email);
            router.push('/')
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await logIn(email, password)
            console.log("Email: ", email, password);
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const {
        query: {name, setName, toggle, setToggle},
    } = router

    const props = { name, setName, toggle, setToggle }

  return (
        <div className="w-full h-full bg-black px-6 text-gray-400" >
            <div className="flex flex-col text-black justify-center items-center h-screen rounded-md shadow-lg bg-black">
                <div className="flex flex-col sm:border rounded-md items-center">
                    <FaUserCircle size={33} className="mt-10" />
                    <h1 className="text-2xl font-semibold py-4 items-center justify-center text-center lg:text-3xl text-purple-400" >Log In</h1>
                    <p className="w-[500px] px-8 text-gray-500">Create you Crypto CoinSearch account with your personal email to interact with our products at greater scale.</p>
                        
                        <button 
                        onClick={handleGoogleSignIn}
                        className="border border-gray-300 py-4 text-md h-10 text-center justify-center items-center flex font-medium mt-6 mb-4 rounded-md w-[430px] text-gray-300">
                            <Image src={google} alt="google" className="w-6 h-6 mr-2" />
                            Continue with Google
                        </button>

                        <p className="uppercase text-gray-500 text-sm mb-1 mt-8">or</p>
                        <h2 className="font-medium relative right-[31%] text-left ">Email/Password</h2>

                        <form onSubmit={handleSubmit} >

                            <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Enter your email address'
                            className="border border-gray-200/50 py-4 text-md h-10 text-gray-400 px-[13.5px] flex mt-6 mb-4 rounded-md w-[430px] outline-none bg-gray-800/60 font-light" />

                            <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter your password'
                            className="border border-gray-200/50 py-4 text-gray-400 text-md h-10 px-[13.5px] flex mt-1 mb-4 rounded-md w-[430px] outline-none bg-gray-800/60 font-light" />

                            <button
                             onClick={handleSubmit}
                             className="py-4 text-md h-10 text-center justify-center items-center flex font-semibold mt-6 mb-4 rounded-md w-[430px] text-gray-200 bg-purple-500">
                                
                                Complete Log In
                            </button>
                        </form>

                        <p className="w-[425px] pt-3 pb-8 text-gray-500">By continuing, you're agreeing to our <span className="font-normal text-blue-500 cursor-pointer">Terms and Privacy Policy.</span> </p>
                    
                </div>
                <Link href="/accounts/Signup">
                    <p className="font-medium py-5 text-gray-500">
                        Don't have an account yet? <span className="font-normal text-blue-500 cursor-pointer">Sign up</span>
                    </p>
                </Link>
            </div>
            <Footer />
        </div>

  )
}

export default Login