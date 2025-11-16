import getData from "./api/getData";
import GetArtists from "./api/getData";
import ArtistSlider from "./components/artitsSlider";
import Header from "./components/header";
import HomeMusicsSection from "./components/homeMusicsSection";
import HomeSlider from "./components/homeSlider";

export default async function Home() {
  const data = await getData()
  
  return (
    <>
      <main className="w-[78%] h-auto absolute top-0 left-0">
        {/* slider and banner  */}
        <section className="w-full h-auto pt-10 px-5">
          <HomeSlider data={data[0].artists} />
          <div className="bg-[url(/images/radio-javan2.png)] bg-cover bg-no-repeat rounded-3xl bg-center w-full h-90"></div>
        </section>

        <HomeMusicsSection tracks={data[0].tracks} />

        <section>
        <h3 className="text-white text-xl font-bold mb-4">هنرمندان</h3>
        <ArtistSlider data={data[0].artists} />
        </section>
      </main>
    </>
  );
}
