import { Task } from "../../../../data/mockProjects";

export default function TaskCard({ task, onEdit }: { task: Task; onEdit?: (task: Task) => void }) {
  const priorityColors = {
    low: "text-gray-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-lime-400/50 transition cursor-grab"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-white text-sm font-medium">{task.title}</h4>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${priorityColors[task.priority]}`}>{task.priority}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(task);
            }}
            className="text-xs text-gray-300 hover:text-white px-2 py-1 rounded bg-zinc-700/30"
          >
            Edit
          </button>
        </div>
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
