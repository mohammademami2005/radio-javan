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
    <main className="w-full h-screen lg:py-[3%] lg:pr-[22%]">
      <span
        className="absolute top-0 left-0 w-full h-full  -z-20"
        style={{
          background: `url(${thisAlbum.cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></span>
      <span className="absolute top-0 left-0 w-full h-full bg-gray-700/25 -z-10"></span>
      <div className="flex h-1/2 flex-col justify-center items-center gap-5">
        {/* <Image
          src={thisAlbum.cover}
          alt={thisAlbum.title}
          width={300}
          height={300}
          className="rounded-2xl w-full lg:w-1/3"
        /> */}
        <h1 className="text-4xl text-orange-400 bg-gray-500/25 rounded-2xl p-[5%]">
          {thisAlbum.title}
        </h1>
      </div>
      <div className="h-1/2 flex flex-col gap-7 justify-center items-center">
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
