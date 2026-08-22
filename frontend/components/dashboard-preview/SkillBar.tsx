type SkillBarProps = {
  skill: string;
  percentage: number;
};

export default function SkillBar({
  skill,
  percentage,
}: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{skill}</span>
        <span>{percentage}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}