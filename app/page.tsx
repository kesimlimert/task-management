'use client'
import { useState } from "react";
import { Task, Column, TeamMember, TEAM_MEMBERS } from "./types";
import { CreateTaskModal } from "./components/create-task-modal";
import { TeamModal } from "./components/team-modal";
import { TaskCard } from "./components/task-card";
import { EditTaskModal } from "./components/edit-task-modal";

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
