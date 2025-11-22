export function TechnologyBadge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full border border-lime-400/30 text-lime-400 text-xs font-medium uppercase">
      {text}
    </span>
  );
}
