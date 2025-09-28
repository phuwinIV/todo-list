import React from 'react';
import TodoList from '../components/TodoList';
import { TodoProvider } from '../context/TodoContext';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-white/40"></div>

            <TodoProvider>
                <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-3xl">
                        {/* Main container */}
                        <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-2xl p-8">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-4xl font-bold text-blue-900 mb-2">
                                    Todo List
                                </h1>

                                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-3 rounded-full"></div>
                            </div>

                            <TodoList />
                        </div>
                    </div>
                </div>
            </TodoProvider>
        </div>
    );
};

export default HomePage;
