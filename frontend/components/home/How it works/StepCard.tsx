import { LucideIcon } from "lucide-react";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function StepCard({
  number,
  title,
  description,
  icon: Icon,
}: StepCardProps) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 border border-blue-500/30">
        <Icon className="h-8 w-8 text-blue-400" />
      </div>

      <p className="mb-2 text-sm font-semibold tracking-widest text-blue-400">
        STEP {number}
      </p>

      <h3 className="mb-3 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-zinc-400">
        {description}
      </p>
    </div>
  );
}