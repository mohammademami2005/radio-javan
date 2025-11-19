"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useAudioStore } from "../store/store";
import { TracksState } from "../types/interfaces";
import Link from "next/link";

export default function Section({ data }: { data: any }) {
  const { setAudio, audio } = useAudioStore();

  return (
    <section className="w-full h-screen overflow-hidden p-[5%]">
      <h1
        className={`flex w-full items-center justify-start text-3xl h-[15vh] pr-8  `}
      >
        آهنگ ها
      </h1>
      <div className="flex flex-wrap justify-start items-start gap-20 h-screen pb-[200px]  overflow-y-auto overflow-x-hidden scrollbar-hide transition-[margin-top] duration-400">
        {data[2].tracks.map((item: TracksState) => {
          return (
            <div
              key={item.id}
              className="cursor-pointer flex flex-col gap-4 group "
              onClick={() =>
                setAudio(
                  item.id,
                  item.title,
                  item.artistId,
                  item.albumId,
                  item.src,
                  item.cover,
                  item.new,
                  item.length
                )
              }
            >
              <Image
                src={item.cover}
                width={200}
                height={200}
                alt={item.title}
                className="rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-white">{item.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
