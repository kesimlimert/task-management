'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'in-review' | 'done';
  assignee: {
    name: string;
    avatar: string;
  };
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate: string;
}

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  team: TeamMember[];
}

interface TeamMember {
  name: string;
  avatar: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Sarah Chen', avatar: '1.png' },
  { name: 'Mike Johnson', avatar: '2.png' },
  { name: 'Alex Kumar', avatar: '3.png' },
  { name: 'Emma Wilson', avatar: '4.png' },
  { name: 'James Lee', avatar: '5.png' }
];

const CreateTaskModal = ({ isOpen, onClose, onSubmit, team }: CreateTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open' as Task['status'],
    assignee: team[0],
    priority: 'medium' as Task['priority'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      status: 'open' as Task['status'],
      assignee: team[0],
      priority: 'medium' as Task['priority'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
            <select
              value={formData.assignee.name}
              onChange={(e) => {
                const selected = team.find(member => member.name === e.target.value);
                if (selected) {
                  setFormData({ ...formData, assignee: selected });
                }
              }}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {team.map(member => (
                <option key={member.name} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                min={formData.startDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TeamModal = ({ isOpen, onClose, team }: { isOpen: boolean; onClose: () => void; team: TeamMember[] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Team Members</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={40}
                height={40}
                className="rounded-full bg-white"
                unoptimized
              />
              <span className="ml-3 font-medium text-slate-800">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onDragStart, onEdit }: TaskCardProps) => (
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

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task: Task | null;
  team: TeamMember[];
}

const EditTaskModal = ({ isOpen, onClose, onSubmit, task, team }: EditTaskModalProps) => {
  const [formData, setFormData] = useState<Task | null>(task);

  useEffect(() => {
    setFormData(task);
  }, [task]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
            <select
              value={formData.assignee.name}
              onChange={(e) => {
                const selected = team.find(member => member.name === e.target.value);
                if (selected) {
                  setFormData({ ...formData, assignee: selected });
                }
              }}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {team.map(member => (
                <option key={member.name} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                min={formData.startDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-md text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'open',
      title: 'Open',
      tasks: [
        {
          id: 'task-1',
          title: 'Implement user authentication',
          description: 'Add OAuth2 integration with Google and GitHub',
          status: 'open',
          assignee: TEAM_MEMBERS[0],
          priority: 'high',
          startDate: '2024-01-15',
          endDate: '2024-01-22'
        },
        {
          id: 'task-2',
          title: 'Design system update',
          description: 'Update color scheme and typography',
          status: 'open',
          assignee: TEAM_MEMBERS[1],
          priority: 'medium',
          startDate: '2024-01-15',
          endDate: '2024-01-22'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-3',
          title: 'API optimization',
          description: 'Improve response time for main endpoints',
          status: 'in-progress',
          assignee: TEAM_MEMBERS[2],
          priority: 'high',
          startDate: '2024-01-15',
          endDate: '2024-01-22'
        }
      ]
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: [
        {
          id: 'task-4',
          title: 'Mobile responsiveness',
          description: 'Fix layout issues on small screens',
          status: 'in-review',
          assignee: TEAM_MEMBERS[3],
          priority: 'low',
          startDate: '2024-01-15',
          endDate: '2024-01-22'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 'task-5',
          title: 'Setup CI/CD pipeline',
          description: 'Configure GitHub Actions workflow',
          status: 'done',
          assignee: TEAM_MEMBERS[4],
          priority: 'medium',
          startDate: '2024-01-15',
          endDate: '2024-01-22'
        }
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string, sourceColumnId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (sourceColumnId === targetColumnId) return;

    const sourceColumn = columns.find(col => col.id === sourceColumnId);
    const targetColumn = columns.find(col => col.id === targetColumnId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(t => t.id === taskId);
      if (task) {
        const updatedTask = {
          ...task,
          status: targetColumnId as Task['status']
        };

        setColumns(columns.map(col => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              tasks: col.tasks.filter(t => t.id !== taskId)
            };
          }
          if (col.id === targetColumnId) {
            return {
              ...col,
              tasks: [...col.tasks, updatedTask]
            };
          }
          return col;
        }));
      }
    }
  };

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
    };

    setColumns(columns.map(col => {
      if (col.id === newTask.status) {
        return {
          ...col,
          tasks: [...col.tasks, newTask]
        };
      }
      return col;
    }));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setColumns(columns.map(col => ({
      ...col,
      tasks: col.tasks.map(t => 
        t.id === updatedTask.id ? updatedTask : t
      )
    })));
  };

  return (
    <div className="min-h-screen p-8 bg-slate-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Task Management Board</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsTeamModalOpen(true)}
            className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Team Members
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Task
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map(column => (
          <div
            key={column.id}
            className="bg-white rounded-lg p-4 shadow-sm"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <h2 className="font-semibold mb-4 text-slate-700">{column.title}</h2>
            
            <div className="space-y-4">
              {column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        team={TEAM_MEMBERS}
      />
      
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        team={TEAM_MEMBERS}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleUpdateTask}
        task={editingTask}
        team={TEAM_MEMBERS}
      />
    </div>
  );
}
