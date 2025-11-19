import React from "react";
import getData from "../api/getData";
import Image from "next/image";
import Section from "../components/musicComp";
import Footer from "../components/footer";

export default async function Music() {
  const data = await getData();
  return (
    <>
    <main className="w-full h-screen  lg:pr-[22%]  ">
      <Section data={data} />
    </main>
    <Footer />
    </>
  );
}
