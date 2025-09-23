import BackgroundAnimated from "@/components/BackgroundAnimated";
import Cards from "@/components/home/Cards";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return (
    <div>
      <BackgroundAnimated />
      <div className="relative z-10 container mx-auto px-2 py-8 max-w-7xl">
        <Header token={token} />
        <SearchBar token={token} />
      </div>
      <Cards token={token} />
    </div>
  );
}
