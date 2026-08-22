type CandidateScoreProps = {
  score: number;
};

export default function CandidateScore({
  score,
}: CandidateScoreProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">

      <p className="text-sm uppercase tracking-widest text-blue-400">
        Overall Score
      </p>

      <h2 className="mt-2 text-5xl font-bold">
        {score}
      </h2>

    </div>
  );
}