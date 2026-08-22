import CandidateScore from "./CandidateScore";
import SkillBar from "./SkillBar";

export default function DashboardCard() {
  return (
    <div className="grid gap-10 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 lg:grid-cols-[2fr_1fr]">

      <div>

        <h3 className="text-2xl font-semibold">
          John Doe
        </h3>

        <p className="mb-8 text-zinc-400">
          Senior Backend Engineer
        </p>

        <div className="space-y-6">

          <SkillBar skill="Python" percentage={95} />

          <SkillBar skill="React" percentage={88} />

          <SkillBar skill="TypeScript" percentage={82} />

          <SkillBar skill="Node.js" percentage={75} />

        </div>

        <div className="mt-10 rounded-xl bg-zinc-800/60 p-6">

          <h4 className="mb-3 font-semibold">
            AI Summary
          </h4>

          <p className="text-zinc-400">
            Excellent backend engineer with strong system design,
            clean repositories and consistent open-source activity.
          </p>

        </div>

      </div>

      <CandidateScore score={92} />

    </div>
  );
}