import { Call, Send2, Whatsapp } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className='h-[10vh] w-full  flex justify-between mb-[10vh]'>
        {/* logo box */}
        <div className='w-1/2 h-full  flex gap-5 items-center ' >
            <figure>
                <Image src='/images/footerLogo.png' alt='footer logo' width={50} height={50} />
            </figure>
            <p>تمامی حقوق متعلق به رادیو جوان می‌باشد.</p>
        </div>
        <div className='w-1/4 h-full flex justify-evenly items-center *:hover:transform *:hover:scale-150 *:cursor-pointer '>
            <Send2 size="32" color="#d9e3f0" className='' />
            <Call size="32" color="#d9e3f0"/>
            <Whatsapp size="32" color="#d9e3f0"/>
        </div>
    </footer>    
)
}
