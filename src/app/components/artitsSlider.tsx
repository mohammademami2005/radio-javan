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
import { useEffect, useState } from "react";

export default function ArtistSlider({ data }: { data: HomeSliderProps[] }) {
  const [mediaQuery, setMediaQuery] = useState("");
  useEffect(() => {
    const w = window.innerWidth;

    function update() {
      setMediaQuery(
        w <= 640 ? "sm" : w <= 768 ? "md" : w <= 1024 ? "lg" : "xlg"
      );
    }

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]}
      slidesPerView={mediaQuery === 'sm' ? 4 : 7}
      spaceBetween={mediaQuery === 'sm' ? 20:12}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      loop={true}
      grabCursor={true}
      pagination={{ clickable: false }}
      className="w-full h-auto"
    >
      {data.map((artist) => (
        <SwiperSlide key={artist.id} dir="ltr">
          <Link href={"/artists/" + artist.id + artist.name}>
            <div className="w-14 lg:w-30 h-14 lg:h-30 rounded-full overflow-hidden shadow-lg bg-neutral-800">
              <Image
                src={artist.avatar}
                alt={artist.name}
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
