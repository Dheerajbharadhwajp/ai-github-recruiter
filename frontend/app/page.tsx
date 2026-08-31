import Hero from "@/components/home/Hero/Hero";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/home/How it works/HowItWorks";
import Features from "@/components/home/Features";
import DashboardPreview from "@/components/dashboard-preview/DasboardPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <DashboardPreview />
      <Footer />
    </>
  );
}