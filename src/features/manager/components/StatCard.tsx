export function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-light text-white">{value}</p>
    </div>
  );
}