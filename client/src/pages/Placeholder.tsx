import { Hammer } from "lucide-react";
import { EmptyState } from "../components/ui";

export function Placeholder({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <EmptyState
        icon={<Hammer size={28} />}
        title={`${title} — coming next`}
        description="Fully specified in design/04-screens and the hifi prototype; being ported screen-by-screen."
      />
    </div>
  );
}
