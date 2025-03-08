import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useThemeStore } from '../store/themeStore';
import { Todo } from '../types/todo';
import clsx from 'clsx';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskChartProps {
  todos: Todo[];
}

export const TaskChart: React.FC<TaskChartProps> = ({ todos }) => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const priorityCounts = {
    high: todos.filter((todo) => todo.priority === 'high').length,
    medium: todos.filter((todo) => todo.priority === 'medium').length,
    low: todos.filter((todo) => todo.priority === 'low').length,
  };

  const statusCounts = {
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
        backgroundColor: ['#ef4444', '#eab308', '#3b82f6'],
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const statusData = {
    labels: ['Completed', 'Active'],
    datasets: [
      {
        data: [statusCounts.completed, statusCounts.active],
        backgroundColor: ['#22c55e', '#64748b'],
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDark ? '#ffffff' : '#000000',
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        className={clsx(
          'rounded-lg border p-4',
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        )}
      >
        <h3
          className={clsx(
            'mb-4 text-center text-lg font-semibold',
            isDark ? 'text-white' : 'text-gray-900'
          )}
        >
          Tasks by Priority
        </h3>
        <div className="h-64">
          <Pie data={priorityData} options={options} />
        </div>
      </div>
      <div
        className={clsx(
          'rounded-lg border p-4',
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        )}
      >
        <h3
          className={clsx(
            'mb-4 text-center text-lg font-semibold',
            isDark ? 'text-white' : 'text-gray-900'
          )}
        >
          Tasks by Status
        </h3>
        <div className="h-64">
          <Pie data={statusData} options={options} />
        </div>
      </div>
    </div>
  );
};