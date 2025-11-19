'use client';
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
import React from "react";

export default function Header() {
  const path = usePathname()
  const navList = [
    {
      name: "صفحه ی اصلی",
      href: "/",
      icon: <Home2 size="24" color="currentColor" variant="Broken" />,
      id: 1,
    },
    {
      name: "هنرمندان",
      href: "/artists",
      icon: <Menu size="32" color="currentColor" variant="TwoTone" />,
      id: 2,
    },
    {
      name: "موزیک",
      href: "/music",
      icon: <Musicnote size="32" color="currentColor" variant="TwoTone" />,
      id: 3,
    },
    {
      name: "آلبوم",
      href: "/album",
      icon: <MusicFilter size="32" color="currentColor" variant="TwoTone" />,
      id: 4,
    },
        {
      name: "پادکست",
      href: "/podcast",
      icon: <Sound size="32" color="currentColor" variant="TwoTone" />,
      id: 6,
    },
    {
      name: "ریمیکس",
      href: "/remix",
      icon: <MusicPlay size="32" color="currentColor" variant="TwoTone" />,
      id: 5,
    },

  ];
  return (
    <header className="hidden lg:flex flex-col justify-start gap-[5%] rounded-4xl  pt-3 flex-wrap w-[20%] h-[75%] fixed top-5 right-5  bg-stone-500/5 backdrop-blur-3xl ">
      {/* logo  */}
      <figure className="flex w-full h-[10] justify-center items-center p-5 ">
        <img src="/images/logo.png" alt="" className=" object-contain" />
      </figure>
      {/* search box  */}
      <div className="flex w-[90%] pr-[4%] mx-auto h-[10%] rounded-3xl justify-center gap-0 items-center border border-black ">
        <SearchNormal size="24" color="#d9e3f0" className="w-[20%]"/>
        <input
          type="text"
          placeholder="جستجو ..."
          className="h-[80%] outline-none  w-[75%]"
        />
      </div>
      {/* navbar  */}
      <nav className=" w-full h-[65%]">
        <ul className="flex justify-evenly flex-col h-full">
          {navList.map((item) => (
            <li key={item.id} className={`px-[5%]  ${path === item.href ? 'text-gray-50' :'text-gray-500'} hover:text-gray-50 hover:text-[20px] transition-all duration-300`}>
              <Link
                href={item.href}
                className="flex justify-start items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
