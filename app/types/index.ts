export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'in-review' | 'done';
  assignee: TeamMember;
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate: string;
}

export interface TeamMember {
  name: string;
  avatar: string;
}

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Sarah Chen', avatar: '1.png' },
  { name: 'Mike Johnson', avatar: '2.png' },
  { name: 'Alex Kumar', avatar: '3.png' },
  { name: 'Emma Wilson', avatar: '4.png' },
  { name: 'James Lee', avatar: '5.png' }
]; 