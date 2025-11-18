"use client";
import Image from "next/image";
import React from "react";
import { AudioFromStore, TracksState } from "../types/interfaces";
import { playListStore, useAudioStore } from "../store/store";
import Link from "next/link";

export default function HomeNewMusicsSection({ tracks }: { tracks?: any }) {
  const newTracks = tracks.filter((item: TracksState) => {
    return item.new === true;
  });
  const { setAudio } = useAudioStore();
  return (
    <section className="w-full h-auto pt-10 px-5">
      <h2 className="text-white text-2xl font-bold mb-4">
        جدید ترین موسیقی ها
      </h2>
      <div className="flex flex-wrap justify-start">
        {newTracks &&
          newTracks.map((track: TracksState) => {
            return (
              <Link
              href={'/music/'+track.id+track.title}
                key={track.id}
                className="w-[18%]  rounded-lg flex justify-center items-center gap-1 flex-col p-4 m-2"
                onClick={() => {
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
                }}
              >
                <Image
                  src={track.cover || "/images/logo2.png"}
                  alt={track.title}
                  width={200}
                  height={200}
                  className="rounded-3xl transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-white text-lg font-semibold mt-2">
                  {track.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  مدت زمان: {Math.floor(track.length / 60)}:
                  {("0" + (track.length % 60)).slice(-2)}
                </p>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
