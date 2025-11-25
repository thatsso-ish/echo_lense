export default function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} className="text-lime-400" />
        <p className="text-gray-400 text-sm">{label}</p>
      </div>

      <p className="text-2xl font-light text-white">{value}</p>
    </div>
  );
}
