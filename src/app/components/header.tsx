"use client";
import {
  Home2,
  Menu,
  MusicFilter,
  Musicnote,
  MusicPlay,
  SearchNormal,
  Sound,
} from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./search";
import { useSearchStore } from "../store/store";

export default function Header() {
  const path = usePathname();
    const [mediaQuery, setMediaQuery] = useState("");
    const {setSearchState}=useSearchStore()
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

  const navList = [
    {
      name: "صفحه ی اصلی",
      href: "/",
      icon: <Home2 size={mediaQuery === 'sm'?'24':'32'} color="currentColor" variant="Broken" />,
      id: 1,
    },
    {
      name: "هنرمندان",
      href: "/artists",
      icon: <Menu size={mediaQuery === 'sm'?'24':'32'} color="currentColor" variant="TwoTone" />,
      id: 2,
    },
    {
      name: "موزیک",
      href: "/music",
      icon: <Musicnote size={mediaQuery === 'sm'?'24':'32'} color="currentColor" variant="TwoTone" />,
      id: 3,
    },
    {
      name: "آلبوم",
      href: "/album",
      icon: <MusicFilter size={mediaQuery === 'sm'?'24':'32'} color="currentColor" variant="TwoTone" />,
      id: 4,
    },
    {
      name: "پادکست",
      href: "/podcast",
      icon: <Sound size={mediaQuery === 'sm'?'24':'32'} color="currentColor" variant="TwoTone" />,
      id: 6,
    },
    {
      name: "ریمیکس",
      href: "/remix",
      icon: <MusicPlay size={mediaQuery === 'sm'?'24':'32'} color="currentColor" variant="TwoTone" />,
      id: 5,
    },
  ];
  return (
    <header className="flex lg:flex-col justify-start gap-[5%]  lg:rounded-4xl p-4 lg:p-0 lg:pt-3 flex-wrap w-full lg:w-[20%] h-auto lg:h-[75%] fixed bottom-0 right-0 lg:top-5 lg:right-5  bg-stone-500/5 backdrop-blur-3xl z-[99999999999999999999]">
      {/* logo  */}
      <figure className="hidden lg:flex w-full h-[10] justify-center items-center p-5 ">
        <img src="/images/logo.png" alt="" className=" object-contain" />
      </figure>
      {/* search box  */}
      {/* <div className="hidden lg:flex w-[90%] pr-[4%] mx-auto h-[10%] rounded-3xl justify-center gap-0 items-center border border-black ">
        <SearchNormal size="24" color="#d9e3f0" className="w-[20%]" />
        <input
          type="text"
          placeholder="جستجو ..."
          className="h-[80%] outline-none  w-[75%]"
        />
      </div> */}
      <Search  />
      {/* navbar  */}
      <nav className=" w-full  lg:h-[65%]">
        <ul className="flex justify-between lg:justify-evenly lg:flex-col h-full">
          {navList.map((item) => (
            <li
              key={item.id}
              className={`lg:px-[5%]  ${
                path === item.href
                  ? "text-white"
                  : "text-gray-400 lg:text-gray-500"
              } hover:text-gray-50 hover:text-sm lg:hover:text-[20px] transition-all duration-300`}
            >
              <Link
                href={item.href}
                className="flex flex-col lg:flex-row justify-between lg:justify-start items-center gap-2 text-[12px] lg:text-lg"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          <li onClick={()=>setSearchState(true)} className=" lg:hidden lg:px-[5%]  hover:text-gray-50 hover:text-sm lg:hover:text-[20px] transition-all duration-300 cursor-pointer text-gray-400">
            <div className="flex flex-col lg:flex-row justify-between lg:justify-start items-center gap-2 text-[12px] lg:text-lg">

            <SearchNormal size="24" color="#d9e3f0"  />
            جستجو
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
