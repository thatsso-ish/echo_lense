import { useMemo, useState } from "react";
import { Project, Task } from "../../../../data/mockProjects";
import TaskColumn from "./TaskColumn";
import AddTaskPage from "../../pages/AddTaskPage";

export default function TasksTab({ project }: { project: Project }) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks || []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const tasksByStatus = useMemo(() => ({
    backlog: tasks.filter((t) => t.status === "backlog"),
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    review: tasks.filter((t) => t.status === "review"),
    done: tasks.filter((t) => t.status === "done"),
  }), [tasks]);

  const handleAdd = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
    setShowAdd(false);
  };

  const handleEdit = (task: Task) => {
    setShowAdd(true);
    setEditingTask(task);
  };

  const handleUpdate = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
    setShowAdd(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Task Board</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdd((s) => !s)}
            className="px-4 py-2 bg-lime-400 rounded-full text-zinc-900 hover:bg-lime-300 font-medium"
          >
            + Add Task
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="mb-6 p-4 rounded-lg bg-zinc-900 border border-zinc-800">
          <AddTaskPage initialTask={editingTask} onAdd={handleAdd} onUpdate={handleUpdate} onCancel={() => { setShowAdd(false); setEditingTask(null); }} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TaskColumn title="Backlog" tasks={tasksByStatus.backlog} color="gray" status="backlog" onEdit={handleEdit} onDropTask={(id, newStatus) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))} />
        <TaskColumn title="To Do" tasks={tasksByStatus.todo} color="blue" status="todo" onEdit={handleEdit} onDropTask={(id, newStatus) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))} />
        <TaskColumn title="In Progress" tasks={tasksByStatus["in-progress"]} color="yellow" status="in-progress" onEdit={handleEdit} onDropTask={(id, newStatus) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))} />
        <TaskColumn title="Review" tasks={tasksByStatus.review} color="purple" status="review" onEdit={handleEdit} onDropTask={(id, newStatus) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))} />
        <TaskColumn title="Done" tasks={tasksByStatus.done} color="green" status="done" onEdit={handleEdit} onDropTask={(id, newStatus) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))} />
      </div>
    </div>
  );
}
