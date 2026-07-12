import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-zinc-400 leading-7">
        {description}
      </p>

    </div>
  );
}