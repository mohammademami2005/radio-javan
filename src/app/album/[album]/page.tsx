import getData from "@/app/api/getData";
import { TracksState } from "@/app/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { album: string } }) {
  const albumId = parseInt((await params).album);

  const data = await getData();
  const thisAlbumTracks = data[2].tracks.filter((item: TracksState) => {
    return item.albumId == albumId;
  });
  console.log(thisAlbumTracks);
  const thisAlbum = data[1].albums.find(
    (item: TracksState) => item.id === albumId
  );
  return (
    <main className="w-full h-[80vh] py-[3%] pr-[22%]">
      <div className="flex flex-col justify-center items-center gap-5">
        <Image
          src={thisAlbum.cover}
          alt={thisAlbum.title}
          width={300}
          height={300}
          className="rounded-2xl"
        />
        <p>{thisAlbum.title}</p>
      </div>
      <div className="flex flex-col gap-7">
        <h3>موزیک های آلبوم</h3>
        <div className="flex gap-5">
          {thisAlbumTracks.map((item: TracksState) => (
            <Link
            key={item.id}
              href={"/music/" + item.id + item.title}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <Image
                src={item.cover}
                alt={item.title}
                width={200}
                height={200}
                className="rounded-2xl"
              />
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
