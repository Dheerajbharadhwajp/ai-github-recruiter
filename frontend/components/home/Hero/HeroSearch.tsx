import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSearch() {
  return (
    <div className="flex w-full max-w-2xl items-center gap-3">

      <Input
        placeholder="Enter GitHub username..."
        className="h-12 rounded-xl border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500"
      />

      <Button className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-500">
        Analyze
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

    </div>
  );
}