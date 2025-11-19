import Link from "next/link";
import getData from "./api/getData";
import ArtistSlider from "./components/artitsSlider";
import Footer from "./components/footer";
import HomeNewMusicsSection from "./components/homeMusicsSection";
import HomeSlider from "./components/homeSlider";

export default async function Home() {
  const data = await getData();

  return (
    <>
      <main className="w-full lg:pr-[22%] h-auto pb-[13vh]">
        {/* slider and banner  */}
        <section className="w-full h-auto pt-10 px-5">
          <HomeSlider data={data[2].tracks} />
          <div className="bg-[url(/images/radio-javan2.png)] bg-cover bg-no-repeat rounded-3xl bg-center mt-[5%] w-full h-90"></div>
        </section>

        <HomeNewMusicsSection tracks={data[2].tracks} artists={data[0].artists}/>

        <section className="p-[5%]">
          <Link href={"/artists"}>
            {" "}
            <h3 className="text-white text-xl font-bold mt-5 mb-10">
              هنرمندان
            </h3>
          </Link>
          <ArtistSlider data={data[0].artists} />
        </section>
      </main>
      <Footer />
    </>
  );
}
