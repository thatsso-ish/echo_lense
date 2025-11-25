import { Task } from "../../../data/mockProjects";

export default function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: "text-gray-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  return (
    <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-lime-400/50 transition cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-white text-sm font-medium">{task.title}</h4>
        <span className={`text-xs ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-gray-400 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{task.assignee}</span>
        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
