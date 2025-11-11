export function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-zinc-800 last:border-0">
      <div className="w-2 h-2 rounded-full bg-lime-400 mt-2" />
      <div className="flex-1">
        <p className="text-sm text-gray-300">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
