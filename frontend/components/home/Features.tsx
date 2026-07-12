import {
  Bot,
  BarChart3,
  Star,
  MessageSquare,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Bot,
    title: "Multi-Agent AI",
    description:
      "Multiple specialized AI agents independently evaluate repositories and technical skills.",
  },
  {
    icon: BarChart3,
    title: "Engineering Insights",
    description:
      "Understand strengths, weaknesses, language expertise and coding patterns instantly.",
  },
  {
    icon: Star,
    title: "Hiring Score",
    description:
      "Receive an AI-generated candidate score based on real engineering performance.",
  },
  {
    icon: MessageSquare,
    title: "AI Recruiter Chat",
    description:
      "Ask follow-up questions and receive contextual insights about every candidate.",
  },
];

export default function Features() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white">
            Why GitHire AI?
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            Powerful AI tools designed to help recruiters evaluate developers faster and more accurately.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}