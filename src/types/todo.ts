export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export type Filter = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  avatar: string;
}