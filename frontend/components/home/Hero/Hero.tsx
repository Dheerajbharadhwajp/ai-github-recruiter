import HeroBadge from "./HeroBadge";
import HeroSearch from "./HeroSearch"
import HeroFeatures from "./HeroFeatures";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto flex max-w-7xl justify-center px-6">
        <div className="flex max-w-4xl flex-col items-center gap-8 text-center">

          <HeroBadge />

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            Discover Engineering Talent
            <br />
            Beyond the Resume.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            Analyze GitHub profiles using autonomous AI agents that evaluate
            technical skills, repository quality, architecture and engineering
            excellence.
          </p>

          <HeroSearch />

          <HeroFeatures />

        </div>
      </div>
    </section>
  );
}