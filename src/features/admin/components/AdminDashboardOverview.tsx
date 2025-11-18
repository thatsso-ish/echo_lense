import { StatCard } from './StatCard';
import { ActivityItem } from './ActivityItem';
import { HealthMetric } from './HealthMetric';

export function AdminDashboardOverview() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Projects" value="24" color="from-blue-500 to-cyan-400" />
        <StatCard title="Active Users" value="156" color="from-green-500 to-emerald-400" />
        <StatCard title="Total Clients" value="18" color="from-purple-500 to-pink-500" />
        <StatCard title="Revenue (MTD)" value="$45.2K" color="from-orange-500 to-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <ActivityItem text="New project created: E-commerce Platform" time="2 hours ago" />
            <ActivityItem text="User Sarah Chen joined as Developer" time="5 hours ago" />
            <ActivityItem text="Invoice #1024 generated for Acme Corp" time="1 day ago" />
            <ActivityItem text="Milestone completed: Mobile App Beta" time="2 days ago" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">System Health</h3>
          <div className="space-y-4">
            <HealthMetric label="Database" status="Operational" percentage={98} />
            <HealthMetric label="API Services" status="Operational" percentage={100} />
            <HealthMetric label="Storage" status="Warning" percentage={85} />
            <HealthMetric label="Backup Systems" status="Operational" percentage={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
