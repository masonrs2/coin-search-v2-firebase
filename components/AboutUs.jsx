import React from 'react'
import metadata from '../assets/constants/index'
import { BsExclamationTriangle } from 'react-icons/bs'

const AboutUs = () => {
  return (
    <div className="rounded-lg shadow-lg xl:px-32 lg:px-16  pt-6 pb-8 px-8 mt-8">
        <div className="flex flex-col" >
            {
                metadata.map((section) => (
                    <div key={section.id}>
                        <p className="text-2xl text-gray-400 font-bold py-2 ">{section.heading}</p>
                        <p className="text-gray-600 text-md font-light py-2 mb-2">{section.content}</p>
                    </div>
                ))
            }
            <div className="w-full pt-4">

                <div className="rounded-lg bg-gray-800 border border-gray-600  p-4 -12 f">
                    <p className="text-xs text-gray-400 ">
                        <span className="mb-[.4rem] underline text-red-500 font-bold text-[.75rem] flex flex-row"> <BsExclamationTriangle size={15} className="mr-[.4rem] mt-[.05rem]" />
                        IMPORTANT DISCLAIMER:</span> All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs