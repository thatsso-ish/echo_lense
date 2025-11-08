export function HealthMetric({ label, status, percentage }: { label: string; status: string; percentage: number }) {
  const statusColor = status === 'Operational' ? 'text-green-400' : status === 'Warning' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300">{label}</span>
        <span className={`text-xs ${statusColor}`}>{status}</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${status === 'Operational' ? 'bg-green-400' : status === 'Warning' ? 'bg-yellow-400' : 'bg-red-400'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
