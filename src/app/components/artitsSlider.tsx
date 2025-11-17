"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import Link from "next/link";
import { HomeSliderProps } from "../types/interfaces";


export default function ArtistSlider({ data }: { data: HomeSliderProps[] }) {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]}
      slidesPerView={8}
      spaceBetween={20}
      autoplay={{ delay: 1500, disableOnInteraction: true }}
      loop={true}
      grabCursor={true}
      pagination={{ clickable: false }}
      className="w-full h-auto"
    >
      {data.map((artist) => (
        <SwiperSlide key={artist.id} dir="ltr">
          <Link href={"/artists/" + artist.id + artist.name}>
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg bg-neutral-800">
              <Image
                src={artist.avatar}
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-white mt-2 text-center text-[12px]">
              {artist.name}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
