import React from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import SearchFilter from './SearchFilter';

const TodoList: React.FC = () => {
    const { todos, filteredTodos, isLoading, error, searchTerm } =
        useTodoContext();

    if (isLoading) {
        return (
            <div className="space-y-8">
                {/* Loading skeleton for Add Todo */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm animate-pulse">
                    <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-shimmer bg-[length:200%_100%]"></div>
                </div>

                {/* Loading skeleton for Search */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm animate-pulse">
                    <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                </div>

                {/* Loading skeleton for Progress */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-6 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                        <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
                </div>

                {/* Loading skeleton for Todo Items */}
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-sm animate-pulse"
                            style={{
                                animationDelay: `${index * 150}ms`,
                                animationDuration: '1.5s',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                                <div className="flex-1 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]"></div>
                                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading message with modern design */}
                <div className="text-center py-8">
                    <div className="inline-flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-3xl border border-blue-100/50 shadow-lg">
                        {/* Modern animated dots */}
                        <div className="flex gap-1.5">
                            <div
                                className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-bounce"
                                style={{ animationDelay: '0ms' }}
                            ></div>
                            <div
                                className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce"
                                style={{ animationDelay: '150ms' }}
                            ></div>
                            <div
                                className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
                                style={{ animationDelay: '300ms' }}
                            ></div>
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-medium text-lg tracking-wide">
                            กำลังโหลดรายการของคุณ...
                        </span>
                    </div>
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
        <div className="space-y-8">
            {/* Add Todo Section */}
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <AddTodo />
            </div>

            {/* Search Section */}
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <SearchFilter />
            </div>

            {/* Progress Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-light text-gray-900 tracking-wide">
                        ความคืบหน้า
                    </h3>
                    <div className="flex items-center gap-2 text-lg">
                        <span className="font-light text-gray-900">
                            {completedTodos}
                        </span>
                        <span className="text-gray-400">/</span>
                        <span className="font-light text-gray-600">
                            {totalTodos}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-700"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-light text-gray-600 tracking-wide">
                        {progressPercentage === 100
                            ? 'เสร็จสิ้นทั้งหมดแล้ว'
                            : `${progressPercentage}% เสร็จสิ้น`}
                    </span>
                    {progressPercentage === 100 && (
                        <span className="text-sm">🎉</span>
                    )}
                </div>
            </div>

            {/* Todo Items */}
            <div className="space-y-4">
                {filteredTodos.length === 0 && searchTerm ? (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-inner">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <div className="text-gray-600 text-xl font-semibold mb-2">
                            ไม่พบรายการ
                        </div>
                        <div className="text-gray-500 text-lg">
                            ไม่มีรายการที่ตรงกับ "{searchTerm}"
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredTodos.map((todo, index) => (
                            <div
                                key={todo.id}
                                className="transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'both',
                                }}
                            >
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                )}
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
