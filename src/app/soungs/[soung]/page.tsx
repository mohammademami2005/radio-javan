import getData from "@/app/api/getData";
import React from "react";

export default async function Page({ params }: { params: any }) {
  const p = await params;
  const id = parseInt(p.soung);
  console.log(id);
  const data = await getData();
  const musics = data[2].tracks?.filter((track: any) => track.artistId === id);

  return (
    <main className="absolute top-0 left-0 w-[77%] h-screen bg-red-400">
        <section>
            {musics.map((item :any)=>(
                <div key={item.id}>
                    <h1>{item.title}</h1>
                </div>
            ))}
        </section>
    </main>
  )}
