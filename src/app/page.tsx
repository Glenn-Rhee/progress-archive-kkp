import BackgroundAnimated from "@/components/BackgroundAnimated";
import Card from "@/components/home/Card";
import CardShell from "@/components/home/CardShell";
import Header from "@/components/home/Header";
import SearchBar from "@/components/home/SearchBar";
import { DataLink, ResponsePayload } from "@/types";

export default async function HomePage() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://progress-archive-kkp.vercel.app"
      : process.env.BASE_URL;

  const response = await fetch(`${baseUrl}/api/link`);
  const dataResponse = (await response.json()) as ResponsePayload<DataLink[]>;

  if (dataResponse.status === "failed") {
    return <div>Error cuy</div>;
  }

  return (
    <div>
      <BackgroundAnimated />
      <div className="relative z-10 container mx-auto px-2 py-8 max-w-7xl">
        <Header />
        <SearchBar />
      </div>
      <CardShell>
        {dataResponse.data!.map((d) => (
          <Card key={d.id} data={d} />
        ))}
      </CardShell>
    </div>
  );
}
