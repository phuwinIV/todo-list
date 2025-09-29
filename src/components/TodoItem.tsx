import React from 'react';
import type { Todo } from '../utils/todoHelpers';
import { useTodoContext } from '../hooks/useTodoContext';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { updateTodo, deleteTodo } = useTodoContext();

    const handleToggle = async () => {
        try {
            await updateTodo(todo.id, { completed: !todo.completed });
        } catch (error) {
            console.error('Failed to toggle todo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <div
            className={`group relative bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200 ${
                todo.completed ? 'opacity-60' : ''
            }`}
        >
            <div className="flex items-center p-4">
                {/* Clean Checkbox */}
                <div className="relative mr-4">
                    <input
                        onChange={handleToggle}
                        type="checkbox"
                        checked={todo.completed}
                        className="sr-only"
                    />
                    <div
                        onClick={handleToggle}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            todo.completed
                                ? 'bg-gray-900 border-gray-900'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                    >
                        {todo.completed && (
                            <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Todo Content */}
                <div className="flex-1 min-w-0">
                    <p
                        className={`text-base font-light tracking-wide transition-all duration-200 ${
                            todo.completed
                                ? 'line-through text-gray-500'
                                : 'text-gray-900'
                        }`}
                    >
                        {todo.text}
                    </p>
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    className="ml-4 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    title="ลบรายการ"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>
                </button>

                {/* Clean ID Badge */}
                <div className="ml-2 text-xs font-light text-gray-400 tracking-wider">
                    #{todo.id}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
