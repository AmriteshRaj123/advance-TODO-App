import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, Filter } from '../types/todo';

interface TodoState {
  todos: Todo[];
  filter: Filter;
  addTodo: (text: string, priority: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: Filter) => void;
  reorderTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (text, priority) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              priority,
              createdAt: Date.now(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
      reorderTodos: (todos) => set({ todos }),
    }),
    {
      name: 'todo-storage',
    }
  )
);