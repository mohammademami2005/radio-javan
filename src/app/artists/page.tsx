import React from "react";
import getData from "../api/getData";
import Footer from "../components/footer";
import { HomeSliderProps, TracksState } from "../types/interfaces";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const data = await getData();

  return (
    <>
      <main className="w-ful h-screen lg:pr-[22%]  ">
        <h1
          className={`flex w-[78vw] items-center justify-start text-3xl h-[15vh] pr-8  `}
        >
          هنرمندان
        </h1>
        <div className="w-full flex flex-wrap justify-evenly gap-10 lg:p-[3%]">
          {data[0].artists.map((item: HomeSliderProps) => (
            <Link key={item.id} href={"/artists/" + item.id + item.name} className="w-[40%] lg:w-[28%] flex flex-col gap-5 items-center">
              <Image
                src={item.avatar}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl "
              />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
