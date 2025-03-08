import React, { useState } from 'react';
import { ListTodo, PieChart } from 'lucide-react';
import { TodoList } from './components/TodoList';
import { TaskChart } from './components/TaskChart';
import { useTodoStore } from './store/todoStore';
import { useThemeStore } from './store/themeStore';
import { Todo } from './types/todo';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import clsx from 'clsx';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [showChart, setShowChart] = useState(false);
  const { addTodo, setFilter, filter, todos } = useTodoStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), priority);
      setNewTodo('');
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  const user = {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <div
      className={clsx(
        'flex h-screen',
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      )}
    >
      <Sidebar user={user} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold">Todo List</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 text-sm">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                    Active: {activeTodos}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
                    Completed: {completedTodos}
                  </span>
                </div>
                <button
                  onClick={() => setShowChart(!showChart)}
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-3 py-1.5',
                    isDark
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50',
                    'border shadow-sm'
                  )}
                >
                  <PieChart size={16} />
                  {showChart ? 'Hide Charts' : 'Show Charts'}
                </button>
              </div>
            </div>

            {showChart && <TaskChart todos={todos} />}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className={clsx(
                  'flex-1 rounded-lg border p-2 shadow-sm',
                  isDark
                    ? 'border-gray-700 bg-gray-800 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                )}
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                className={clsx(
                  'rounded-lg border p-2 shadow-sm',
                  isDark
                    ? 'border-gray-700 bg-gray-800 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                )}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Todo
              </button>
            </form>

            <div className="space-x-2">
              {(['all', 'active', 'completed'] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={clsx(
                    'rounded-lg px-4 py-2 text-sm font-medium',
                    filter === filterOption
                      ? isDark
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-200 text-gray-900'
                      : isDark
                      ? 'text-gray-400 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            <TodoList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;