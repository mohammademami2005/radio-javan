import Image from 'next/image';
import React from 'react'

interface HomeMusicsSectionProps {
  id: string;
  title: string;
  artistId: string;
  albumId: string;
  duration: number;
  category: string;
  new:boolean;
  url: string;
  cover?: string;
}

export default function HomeMusicsSection({tracks}: {tracks?: any}) {
    
  return (
    <section className="w-full h-auto pt-10 px-5">
        <h2 className="text-white text-2xl font-bold mb-4">جدید ترین موسیقی ها</h2>
        <div className="flex flex-wrap justify-evenly">
            {tracks && tracks.map((track:HomeMusicsSectionProps)=>{
                return(
                    <div key={track.id} className="w-[45%] bg-gray-800 rounded-lg p-4 m-2">
                        <Image 
                            src={track.cover || '/images/default-cover.png'} 
                            alt={track.title} 
                            width={150} 
                            height={150} 
                            className="rounded-md"
                        />
                        <h3 className="text-white text-lg font-semibold mt-2">{track.title}</h3>
                        <p className="text-gray-400 text-sm">مدت زمان: {Math.floor(track.duration / 60)}:{('0' + (track.duration % 60)).slice(-2)}</p>
                    </div>
                )
            })}
        </div>
    </section>
  )
}
