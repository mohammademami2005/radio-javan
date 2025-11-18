import getData from "@/app/api/getData";
import { HomeSliderProps, TracksState } from "@/app/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { artist: string } }) {
  const id = parseInt((await params).artist);
  const data = await getData();
  const musics = data[2].tracks?.filter((track: any) => track.artistId === id);
  const artist = data[0].artists.find((item: HomeSliderProps) => item.id == id);

  console.log(musics, "musics");
  console.log(artist, "artist");
  return (
    <main className="w-full h-[80vh] py-[3%] pr-[22%]">
      <div className="flex flex-col justify-center items-center gap-5">
        <Image
          src={artist.avatar}
          alt={artist.name}
          width={500}
          height={500}
          className="rounded-2xl"
        />
        <p>{artist.title}</p>
        <p className="w-1/2">
          <strong>توضیحات : </strong> لورم ایپسوم متن ساختگی با تولید سادگی
          نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون
          بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
          تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
          باشد
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <h3>موزیک های آلبوم</h3>
        <div className="flex gap-5">
          {musics.map((item: TracksState) => (
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
