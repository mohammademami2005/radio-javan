"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CloseCircle, SearchNormal } from "iconsax-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { HomeSliderProps } from "../types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { TracksState } from "../types/interfaces";
import { usePathname } from "next/navigation";
import { useSearchStore } from "../store/store";

export default function Search() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const path = usePathname();
  const {searchState,setSearchState}=useSearchStore()
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState<HomeSliderProps[] | []>([]);
  const [tracks, setTracks] = useState<TracksState[] | []>([]);



  const { data } = useQuery({
    queryKey: ["all"],
    queryFn: async () => {
      return (await axios.get(`${url}`)).data;
    },
  });

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    e.target.focus();
    setSearch(value);
    setSearchState(true);
    const Artists =
      data &&
      data[0].artists.filter((item: HomeSliderProps) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
    setArtists(Artists);

    const Tracks =
      data &&
      data[2].tracks.filter((item: TracksState) => {
        return item.title.toLowerCase().includes(value.toLowerCase());
      });
    setTracks(Tracks);
  }
  useEffect(() => {
    setSearchState(false);
  }, [path]);

  return (
    <>
      <div className="hidden order-0 lg:flex w-[90%] pr-[4%] mx-auto h-[10%] rounded-3xl justify-center gap-0 items-center border border-black ">
        <SearchNormal size="24" color="#d9e3f0" className="w-[20%]" />
        <input
          type="text"
          placeholder="جستجو ..."
          className="h-[80%] outline-none  w-[75%] order-10"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <section
        style={{ backdropFilter: "blur(20px)" }}
        className={`${
          searchState ? "flex" : "hidden"
        }   absolute top-[-82.5vh] left-0 bg-neutral-900  lg:-top-5 lg:left-[-78vw] w-full lg:w-[78vw] h-screen lg:h-screen flex flex-col`}
      >
        <CloseCircle
          size="32"
          color="#d9e3f0"
          className="absolute top-0 lg:top-5 right-5 cursor-pointer"
          onClick={() => setSearchState(false)}
        />
        <div className="w-full h-50 flex flex-col lg:block lg:h-[10vh]">
          <h1 className="w-full h-full lg:flex justify-center items-center text-5xl hidden">
            نتایج جستجو
          </h1>
          <div className="flex h-20 m-10  lg:hidden w-[90%] pr-[4%] mx-auto  rounded-3xl justify-center gap-0 items-center border border-black ">
            <SearchNormal size="24" color="#d9e3f0" className="w-[20%]" />
            <input
              type="text"
              placeholder="جستجو ..."
              className="h-[80%] outline-none  w-[75%]"
              value={search}
              onChange={handleSearch}
              //   onBlur={() => setSearchState(false)}
            />
          </div>
        </div>
        <div className="w-full h-[90vh] flex lg:pt-8">
          {/* artists  */}
          <div className="w-1/2 h-full overflow-y-auto overflow-x-hidden flex flex-wrap justify-evenly  border-l gap-y-5 scrollbar-hide">
            <h3 className="w-full h-10 pr-5">هنرمندان</h3>
            {!artists || artists.length === 0 ? (
              <h1>نتیجه ای پیدا نشد !</h1>
            ) : (
              artists?.map((item: HomeSliderProps) => (
                <Link
                  key={item.id}
                  href={"/artists/" + item.id + item.name}
                  className="  w-[45%] lg:w-[28%] h-30 lg:h-50 flex flex-col gap-3 lg:gap-5 items-center p-[1%]"
                >
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl "
                  />
                  <p className="text-[10px] lg:text-lg">{item.name}</p>
                </Link>
              ))
            )}
          </div>

          {/* tracks  */}
          <div className="w-1/2 h-full overflow-y-auto overflow-x-hidden flex flex-wrap justify-evenly  gap-y-5  scrollbar-hide">
            <h3 className="w-full h-10 pr-5">آهنگ ها</h3>
            {!tracks || tracks.length === 0 ? (
              <h1>نتیجه ای پیدا نشد !</h1>
            ) : (
              tracks?.map((track) => (
                <Link
                  key={track.id}
                  href={"/music/" + track.id + track.title}
                  className="  w-[45%] lg:w-[28%] h-30 lg:h-50 flex flex-col gap-3 lg:gap-5 items-center p-[1%]"
                >
                  <Image
                    src={track.cover}
                    alt={track.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl "
                  />
                  <p className="text-[10px] lg:text-lg">{track.title}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
