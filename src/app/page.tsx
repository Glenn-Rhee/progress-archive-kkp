import BackgroundAnimated from "@/components/BackgroundAnimated";
import Cards from "@/components/home/Cards";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import Navbar from "@/components/home/Navbar";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="min-h-screen">
      <Navbar token={token} />
      <BackgroundAnimated />

      {/* Main Content - Add padding top to account for fixed navbar */}
      <div className="relative z-10 pt-16">
        <div className="container mx-auto px-2 py-8 max-w-7xl">
          <Header token={token} />
          <SearchBar token={token} />
        </div>
        <Cards token={token} />
      </div>
    </div>
  );
}
