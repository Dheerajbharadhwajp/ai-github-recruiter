import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import SearchCard from "@/components/home/SearchCard";
import FeatureGrid from "@/components/home/FeatureGrid";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchCard />
      <FeatureGrid />
      <Footer />
    </>
  );
}