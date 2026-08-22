import DashboardCard from "./DashboardCard";

export default function DashboardPreview() {
  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold">
            Recruiter Dashboard
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            AI-powered insights designed to help you evaluate
            engineering talent in seconds.
          </p>

        </div>

        <DashboardCard />

      </div>

    </section>
  );
}