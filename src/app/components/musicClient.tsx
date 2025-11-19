"use client";
import { Play } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HomeSliderProps, TracksState } from "../types/interfaces";
import { playListStore, useAudioStore } from "../store/store";

export default function MusicClient({
  track,
  artists,
  album,
}: {
  track: TracksState;
  artists: HomeSliderProps;
  album: { id: number; title: string; artistId: number; cover: string };
}) {
  console.log(album);
  const [state, setState] = useState(false);
  const { setAudio } = useAudioStore();
  const { playState, setPlayState } = playListStore();
  console.log(playState);
  // setPlayState(true)
  // useEffect(()=>{
  //   if(state){
  //     setPlayState(true)
  //   }

  // },[state])

  const handlePlay = () => {
    setAudio(
      track.id,
      track.title,
      track.artistId,
      track.albumId,
      track.src,
      track.cover,
      track.new,
      track.length
    );
    setState(true);
  };
  return (
    <main
      className="w-full pr-[20%] h-screen"
      style={{
        background: `url(${track.cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="w-full h-full flex-col flex p-[5%] items-center">
        <figure className="relative w-full h-1/2 flex flex-col gap-4 justify-center items-center">
          {/* <Image
          src={track.cover}
          alt={track.title}
          width={300}
          height={300}
          className="rounded-2xl transition-transform duration-300 hover:scale-105"
        /> */}
          {/* <span className="absolute w-full h-full top-0 left-0 bg-amber-50/5"></span> */}
          <div className="bg-gray-500/25 rounded-full p-[5%]">
            <Play
              size="50"
              color="#ff8a65"
              onClick={() => {
                handlePlay();
                // console.log(playState);
              }}
              className="cursor-pointer  "
            />
          </div>
        </figure>
        <div className="h-1/2 w-[50%] bg-stone-950/25  flex flex-wrap justify-between p-[5%]  *:font-bold *:w-full rounded-2xl *:flex *:justify-between *:gap-5">
          <h3>
            اسم آهنگ: <span className="text-white">{track.title}</span>
          </h3>
          <h4>
            خواننده: <span className="text-white">{artists.name}</span>
          </h4>
          <p>
            مدت پخش: <span className="text-white">{track.length}</span>
          </p>
          <p>
            آلبوم:<span className="text-white">{album.title}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
