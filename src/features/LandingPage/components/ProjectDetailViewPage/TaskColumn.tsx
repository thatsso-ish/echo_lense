import { Task } from "../../../../data/mockProjects";
import TaskCard from "./TaskCard";

type ColorKey = "gray" | "blue" | "yellow" | "purple" | "green";

export default function TaskColumn({
  title,
  tasks,
  color,
  onEdit,
  status,
  onDropTask,
}: {
  title: string;
  tasks: Task[];
  color: ColorKey;
  onEdit?: (task: Task) => void;
  status: Task['status'];
  onDropTask?: (taskId: string, newStatus: Task['status']) => void;
}) {
  const colorClasses = {
    gray: "bg-gray-400/10 text-gray-400",
    blue: "bg-blue-400/10 text-blue-400",
    yellow: "bg-yellow-400/10 text-yellow-400",
    purple: "bg-purple-400/10 text-purple-400",
    green: "bg-green-400/10 text-green-400",
  };

  return (
    <div className="flex flex-col">
      <div className={`flex items-center justify-between p-3 rounded-t-xl ${colorClasses[color]}`}>
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm">{tasks.length}</span>
      </div>

      <div
        className="flex-1 p-3 bg-zinc-900 rounded-b-xl border border-zinc-800 border-t-0 space-y-3 min-h-[500px]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const id = e.dataTransfer.getData('text/plain');
          if (id && onDropTask) onDropTask(id, status);
        }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
