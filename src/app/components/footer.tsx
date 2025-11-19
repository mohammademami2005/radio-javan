'use client'
import { Call, Send2, Whatsapp } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'
import { useAudioStore } from '../store/store'

export default function Footer() {
    const {playState} = useAudioStore()
  return (
    <footer className={`h-[10vh] w-full  flex justify-between ${playState ? 'mb-44':'mb-20'} px-[5%] lg:pr-[25%]`}>
        {/* logo box */}
        <div className='w-2/3 h-full  flex gap-5 items-center ' >
            <figure>
                <Image src='/images/footerLogo.png' alt='footer logo' width={50} height={50} />
            </figure>
            <p className='text-[14px] '>تمامی حقوق متعلق به رادیو جوان می‌باشد.</p>
        </div>
        <div className='w-1/3 lg:w-1/6 h-full flex justify-evenly items-center *:hover:transform *:hover:scale-150 *:cursor-pointer '>
            <Send2 size="32" color="#d9e3f0" className='' />
            <Call size="32" color="#d9e3f0"/>
            <Whatsapp size="32" color="#d9e3f0"/>
        </div>
    </footer>    
)
}
