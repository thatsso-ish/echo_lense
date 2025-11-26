import { Project } from "../../../data/mockProjects";
import TaskColumn from "./TaskColumn";

export default function TasksTab({ project }: { project: Project }) {
  const tasksByStatus = {
    backlog: project.tasks.filter(t => t.status === "backlog"),
    todo: project.tasks.filter(t => t.status === "todo"),
    "in-progress": project.tasks.filter(t => t.status === "in-progress"),
    review: project.tasks.filter(t => t.status === "review"),
    done: project.tasks.filter(t => t.status === "done"),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Task Board</h2>
        <button className="px-4 py-2 bg-lime-400 rounded-full text-zinc-900 hover:bg-lime-300 font-medium">
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TaskColumn title="Backlog" tasks={tasksByStatus.backlog} color="gray" />
        <TaskColumn title="To Do" tasks={tasksByStatus.todo} color="blue" />
        <TaskColumn title="In Progress" tasks={tasksByStatus["in-progress"]} color="yellow" />
        <TaskColumn title="Review" tasks={tasksByStatus.review} color="purple" />
        <TaskColumn title="Done" tasks={tasksByStatus.done} color="green" />
      </div>
    </div>
  );
}
