import React, { useState } from 'react';
import { Task } from '../../../data/mockProjects';

type AddTaskProps = {
  projectId?: string;
  initialTask?: Task | null;
  onAdd?: (task: Task) => void;
  onUpdate?: (task: Task) => void;
  onCancel?: () => void;
};

export default function AddTaskPage({ initialTask = null, onAdd, onUpdate, onCancel }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState<Task['status']>('backlog');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [saved, setSaved] = useState(false);

  // initialize form when editing
  React.useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setAssignee(initialTask.assignee || '');
      setStatus(initialTask.status || 'backlog');
      setPriority(initialTask.priority || 'medium');
      setDueDate(initialTask.dueDate || '');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskToEmit: Task = initialTask
      ? { ...initialTask, title, description, assignee, status, priority, dueDate }
      : { id: `task-${Date.now()}`, title, description, assignee, status, priority, dueDate };

    if (initialTask) {
      if (onUpdate) onUpdate(taskToEmit);
      else console.log('Updated task:', taskToEmit);
    } else {
      if (onAdd) onAdd(taskToEmit);
      else console.log('New task:', taskToEmit);
    }

    setSaved(true);
    // reset form only when creating new task
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setAssignee('');
      setStatus('backlog');
      setPriority('medium');
      setDueDate('');
    }
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-light text-white mb-4">Add Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            placeholder="Implement shopping cart functionality"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            rows={4}
            placeholder="Build shopping cart with add/remove items, quantity updates"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Assignee</label>
            <input
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              placeholder="Alex Chen"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-lime-400 rounded text-zinc-900 font-medium hover:bg-lime-300"
          >
            {initialTask ? 'Save Changes' : 'Add Task'}
          </button>

          {initialTask && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-gray-300"
            >
              Cancel
            </button>
          )}

          {saved && <span className="text-sm text-green-400">{initialTask ? 'Saved' : 'Task added'}</span>}
        </div>
      </form>
    </div>
  );
}
