import React from "react";
import getData from "../api/getData";
import Image from "next/image";
import Section from "../components/musicComp";

export default async function Music() {
  const data = await getData();
  return (
    <main className="w-[78%] h-screen absolute top-0 left-0  ">
      <Section data={data} />
    </main>
  );
}
