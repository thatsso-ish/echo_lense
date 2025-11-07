export function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-light text-white">{value}</p>
    </div>
  );
}
