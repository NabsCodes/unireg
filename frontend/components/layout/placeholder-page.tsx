type PlaceholderPageProps = {
  title: string;
  description: string;
  nextStep: string;
};

export function PlaceholderPage({
  title,
  description,
  nextStep,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">{description}</p>
      </div>

      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-950">Planned next step</p>
        <p className="mt-2 text-sm text-slate-600">{nextStep}</p>
      </section>
    </div>
  );
}
