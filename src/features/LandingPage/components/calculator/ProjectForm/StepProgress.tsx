export default function StepProgress({ step }: { step: number }) {
  return (
    <div className="mb-8 flex justify-center gap-2">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all ${
            s <= step ? 'bg-lime-400 w-12' : 'bg-zinc-800 w-8'
          }`}
        />
      ))}
    </div>
  );
}
