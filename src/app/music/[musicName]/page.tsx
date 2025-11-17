import getData from '@/app/api/getData'
import { TracksState } from '@/app/types/interfaces'
import Image from 'next/image'
import React from 'react'

export default async function Page({params}:{params:{musicName:string}}) {
    const musicId = parseInt((await params).musicName)
    const data = await getData()
    const track = data[2].tracks.find((item:TracksState)=>{
        return item.id == musicId
    })
    console.log(track)
  return (
    <main className='w-[80%] absolute left-0 top-0 h-screen bg-blue-600'>
        <figure>
            <Image src={track.cover} alt={track.title} width={500} height={500} />
        </figure>
    </main>
  )
}
