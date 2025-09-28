import React from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const { todos, isLoading, error } = useTodoContext();

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-blue-700 font-medium text-lg">
                        กำลังโหลดรายการ...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="inline-block p-6 bg-red-50 rounded-2xl border-2 border-red-100">
                    <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                        เกิดข้อผิดพลาด
                    </h3>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (todos.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                    ยังไม่มีรายการ Todo
                </h3>
                <p className="text-blue-600 text-lg">
                    เริ่มต้นเพิ่มรายการแรกของคุณเลย!
                </p>
            </div>
        );
    }

    const completedTodos = todos.filter((todo) => todo.completed).length;
    const totalTodos = todos.length;
    const progressPercentage =
        totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Progress Section */}
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-900">
                        ความคืบหน้า
                    </h3>
                    <div className="flex items-center gap-2 text-xl">
                        <span className="font-bold text-blue-600">
                            {completedTodos}
                        </span>
                        <span className="text-blue-300">/</span>
                        <span className="text-blue-800">{totalTodos}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-blue-100 rounded-full h-3 mb-3">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">
                        {progressPercentage === 100
                            ? '🎉 เสร็จสิ้นทั้งหมดแล้ว!'
                            : `${progressPercentage}% เสร็จสิ้น`}
                    </span>
                </div>
            </div>

            {/* Todo Items */}
            <div className="space-y-3">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>

            {/* Stats Footer */}
            <div className="flex justify-center gap-8 pt-6 border-t border-blue-100">
                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-green-600">
                        {completedTodos}
                    </p>
                    <p className="text-xs text-blue-500">เสร็จแล้ว</p>
                </div>

                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-orange-600">
                        {totalTodos - completedTodos}
                    </p>
                    <p className="text-xs text-blue-500">รอดำเนินการ</p>
                </div>

                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"
                            />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-blue-600">
                        {totalTodos}
                    </p>
                    <p className="text-xs text-blue-500">ทั้งหมด</p>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
