"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { TracksState } from "../types/interfaces";
import { useRouter } from "next/navigation";


export default function HomeSlider({data}: {data: TracksState[]}) {
  const router = useRouter()

  return (
    <Swiper
    modules={[Navigation, Scrollbar, A11y,Autoplay]}
      slidesPerView={2}
      spaceBetween={20}
      autoplay= {{delay:800,disableOnInteraction:false}}
      loop={true}
      grabCursor={true}
      pagination={{ clickable: false }}
      className="w-full h-auto"
    >
      {data.map((track) => (
        <SwiperSlide key={track.id} dir="ltr">
          <div onClick={()=>router.push('/music/'+track.id+track.title)} className="w-full h-30 lg:h-96 rounded-xl overflow-hidden shadow-lg bg-neutral-800">
            <Image
              src={track.cover}
              alt={track.title}
              width={300} height={300}
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-white mt-2 text-center absolute right-2 bottom-2">{track.title}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
