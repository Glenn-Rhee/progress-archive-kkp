import BackgroundAnimated from "@/components/BackgroundAnimated";
import Card from "@/components/home/Card";
import CardShell from "@/components/home/CardShell";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";

export default function HomePage() {
  return (
    <div>
      <BackgroundAnimated />
      <div className="relative z-10 container mx-auto px-2 py-8 max-w-7xl">
        <Header />
        <SearchBar />
      </div>
      <CardShell>
        <Card />
        <Card />
        <Card />
        <Card />
      </CardShell>
    </div>
  );
}
