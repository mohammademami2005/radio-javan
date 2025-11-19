import getData from "@/app/api/getData";
import MusicClient from "@/app/components/musicClient";
import { HomeSliderProps, TracksState } from "@/app/types/interfaces";
import { Play } from "next/font/google";
import Image from "next/image";
import React from "react";

export default async function Page({
  params,
}: {
  params: { musicName: string };
}) {
  const musicId = parseInt((await params).musicName);
  const data = await getData();
  const track = data[2].tracks.find((item: TracksState) => {
    return item.id == musicId;
  });

  const artist = data[0].artists.find((item: HomeSliderProps) => +item.id === track.artistId);
  console.log(artist);
  const album = data[1].albums.find((item:{id:number}) => item.id === track.albumId)
  return (
   
      <MusicClient track={track} artists={artist} album={album} />
    
  );
}
