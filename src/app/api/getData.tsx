export default async function getData() {
    const url = process.env.NEXT_PUBLIC_BASE_URL ;
  try {
    const res = await fetch(`${url}`).then((res) => res.json())
     return res; 
  } catch (error) {
    console.log("error fetching artist data", error);
  }
}