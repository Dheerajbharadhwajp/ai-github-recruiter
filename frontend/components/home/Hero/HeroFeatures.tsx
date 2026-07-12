import {
  Bot,
  BarChart3,
  MessageSquare,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    text: "Multi-Agent AI",
  },
  {
    icon: BarChart3,
    text: "Recruiter Dashboard",
  },
  {
    icon: Star,
    text: "Skill Intelligence",
  },
  {
    icon: MessageSquare,
    text: "AI Recruiter Chat",
  },
];

export default function HeroFeatures() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-6">

      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.text}
            className="flex items-center gap-2 text-sm text-zinc-400"
          >
            <Icon className="h-4 w-4 text-blue-400" />
            {feature.text}
          </div>
        );
      })}

    </div>
  );
}