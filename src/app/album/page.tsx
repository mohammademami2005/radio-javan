import React from "react";
import getData from "../api/getData";
import Image from "next/image";
import { AlbumItem } from "../types/interfaces";
import Footer from "../components/footer";
import Link from "next/link";

export default async function Album() {
  const data = await getData();
  console.log(data[1].albums);
  return (
    <>
      <main className="w-full pr-[22%]">
        <h1
          className={`flex w-[78vw] items-center justify-start text-3xl h-[15vh] pr-8  `}
        >
          آلبوم ها
        </h1>
        <div className="w-full h-full flex justify-start gap-5 flex-wrap">
          {data[1].albums.map((item: AlbumItem) => {
            return (
              <Link
              href={'/album/'+item.id+item.title}
                key={item.id}
                className="w-[22%] flex flex-col justify-start gap-5 items-center group"
              >
                <Image
                  src={item.cover}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-full h-[80%] object-cover rounded-3xl group:hover:rounded-full"
                />
                <p>{item.title}</p>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
