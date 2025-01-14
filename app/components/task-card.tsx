'use client'
import Image from "next/image";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onDragStart, onEdit }: TaskCardProps) => (
  <div
    draggable
    onDragStart={onDragStart}
    className="bg-slate-50 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow border border-slate-200"
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-medium text-slate-800">{task.title}</h3>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(task)}
          className="p-1 hover:bg-slate-200 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          task.priority === 'high' ? 'bg-red-100 text-red-900' :
          task.priority === 'medium' ? 'bg-amber-100 text-amber-900' :
          'bg-emerald-100 text-emerald-900'
        }`}>
          {task.priority}
        </span>
      </div>
    </div>
    <p className="text-sm text-slate-600 mb-3">{task.description}</p>
    <div className="flex justify-between items-center mb-3">
      <div className="text-xs text-slate-500">
        <div className="flex justify-between mb-1">
          <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
          <span className="ml-2">End: {new Date(task.endDate).toLocaleDateString()}</span>
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        task.status === 'open' ? 'bg-slate-100 text-slate-700' :
        task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
        task.status === 'in-review' ? 'bg-purple-100 text-purple-700' :
        'bg-green-100 text-green-700'
      }`}>
        {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    </div>
    <div className="flex items-center">
      <Image
        src={task.assignee.avatar}
        alt={task.assignee.name}
        width={24}
        height={24}
        className="rounded-full bg-white"
        unoptimized
      />
      <span className="text-sm text-slate-700 ml-2 font-medium">{task.assignee.name}</span>
    </div>
  </div>
);
