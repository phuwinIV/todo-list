import React from 'react';
import type { Todo } from '../utils/todoHelpers';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const handleToggle = () => {};

    const handleDelete = () => {};

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                todo.completed
                    ? 'bg-gradient-to-r from-blue-50 to-slate-50 border-blue-200 shadow-sm'
                    : 'bg-white border-blue-100 shadow-md hover:shadow-lg hover:border-blue-300'
            }`}
        >
            {/* Gradient accent line */}
            <div
                className={`absolute top-0 left-0 w-full h-1 ${
                    todo.completed
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
            ></div>

            <div className="flex items-center p-5">
                {/* Custom Checkbox */}
                <div className="relative mr-4">
                    <input
                        onChange={handleToggle}
                        type="checkbox"
                        checked={todo.completed}
                        readOnly
                        className="sr-only"
                    />
                    <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            todo.completed
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                                : 'border-blue-300 hover:border-blue-500 bg-white'
                        }`}
                    >
                        {todo.completed && (
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Todo Content */}
                <div className="flex-1 min-w-0">
                    <p
                        className={`text-lg font-medium transition-all duration-200 ${
                            todo.completed
                                ? 'line-through text-slate-500'
                                : 'text-blue-900'
                        }`}
                    >
                        {todo.text}
                    </p>
                </div>

                <div>
                    <div
                        onClick={handleDelete}
                        className="bg-white cursor-pointer"
                    >
                        <span className="text-red-500">delete</span>
                    </div>
                </div>

                {/* ID Badge */}
                <div
                    className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                        todo.completed
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-blue-100 text-blue-600'
                    }`}
                >
                    #{todo.id}
                </div>
            </div>

            {/* Hover effect */}
            {!todo.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            )}
        </div>
    );
};

export default TodoItem;
