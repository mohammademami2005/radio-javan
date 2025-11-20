import Link from "next/link";
import getData from "./api/getData";
import ArtistSlider from "./components/artitsSlider";
import Footer from "./components/footer";
import HomeNewMusicsSection from "./components/homeMusicsSection";
import HomeSlider from "./components/homeSlider";
import { ArrowCircleLeft2, ArrowLeft } from "iconsax-react";

export default async function Home() {
  const data = await getData();

  return (
    <>
      <main className="w-full lg:pr-[22%] h-auto pb-10  lg:pb-[13vh]">
        {/* slider and banner  */}
        <section className="w-full h-auto pt-10 px-5">
          <HomeSlider data={data[2].tracks} />
          <div className="bg-[url(/images/radio-javan2.png)] bg-cover bg-no-repeat rounded-3xl bg-center mt-[5%] w-full h-50 lg:h-90"></div>
        </section>

        <HomeNewMusicsSection
          tracks={data[2].tracks}
          artists={data[0].artists}
        />

        <section className="p-[5%]">
          <Link href={"/artists"}>
            {" "}
            <div className="w-full mt-5 mb-10 flex justify-between items-center">
              <h3 className="text-white text-xl font-bold  ">
                هنرمندان
              </h3>
              <span className="text-[13px] lg:text-sm flex justify-between gap-3 items-center">
                {" "}
                دیدن همه <ArrowLeft size="20" color="#FFF" />
              </span>
            </div>
          </Link>
          <ArtistSlider data={data[0].artists} />
        </section>
      </main>
      <Footer />
    </>
  );
}
