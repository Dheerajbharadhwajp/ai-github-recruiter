import StepCard from "./StepCard";
import { Search, Bot, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter GitHub Username",
    description: "Provide the GitHub username to begin the analysis.",
    icon: Search,
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Multiple AI agents inspect repositories, commits and technologies.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Hiring Report",
    description:
      "Review an AI-generated report with hiring recommendations.",
    icon: BarChart3,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-22">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            From GitHub profile to hiring insights in three simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
                icon={step.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}