"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
interface HomeSliderProps {
  id: number;
  name: string;
  avatar: string;
}

export default function HomeSlider({data}: {data: HomeSliderProps[]}) {
  console.log( data);

  return (
    <Swiper
    modules={[Navigation, Scrollbar, A11y,Autoplay]}
      slidesPerView={2}
      spaceBetween={20}
      autoplay= {{delay:2500,disableOnInteraction:true}}
      loop={true}
      grabCursor={true}
      pagination={{ clickable: false }}
      className="w-full h-auto"
    >
      {data.map((artist) => (
        <SwiperSlide key={artist.id} dir="ltr">
          <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg bg-neutral-800">
            <Image
              src={artist.avatar}
              alt=""
              width={200} height={400}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-white mt-2 text-center">{artist.name}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
