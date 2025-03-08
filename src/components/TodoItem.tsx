import React, { useState, useRef, useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Trash2, GripVertical, CheckCircle2, Circle, Pencil } from 'lucide-react';
import { Todo } from '../types/todo';
import { useThemeStore } from '../store/themeStore';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const darkPriorityColors = {
  low: 'bg-blue-900 text-blue-200',
  medium: 'bg-yellow-900 text-yellow-200',
  high: 'bg-red-900 text-red-200',
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'group flex items-center gap-3 rounded-lg border p-4 transition-all',
        isDark
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-200 bg-white shadow-sm',
        isDragging && 'opacity-50',
        todo.completed && isDark
          ? 'bg-gray-900'
          : todo.completed && 'bg-gray-50'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className={clsx(
          'touch-none',
          isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
        )}
      >
        <GripVertical size={20} />
      </button>

      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
        )}
      >
        {todo.completed ? (
          <CheckCircle2 size={20} className="text-green-500" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit}
            className={clsx(
              'w-full rounded px-2 py-1 text-sm',
              isDark
                ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            )}
          />
        </form>
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm',
            todo.completed && isDark
              ? 'text-gray-500 line-through'
              : todo.completed && 'text-gray-500 line-through',
            !todo.completed && isDark && 'text-white'
          )}
        >
          {todo.text}
        </span>
      )}

      <span
        className={clsx(
          'rounded-full px-2 py-1 text-xs font-medium',
          isDark ? darkPriorityColors[todo.priority] : priorityColors[todo.priority]
        )}
      >
        {todo.priority}
      </span>

      <button
        onClick={() => setIsEditing(true)}
        className={clsx(
          'hidden group-hover:block',
          isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
        )}
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        className={clsx(
          'hidden group-hover:block',
          isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
        )}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};