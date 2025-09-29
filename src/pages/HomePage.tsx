import React from 'react';
import TodoList from '../components/TodoList';
import { TodoProvider } from '../context/TodoContext';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-100 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                    }}
                ></div>
            </div>

            {/* Modern floating elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-80 h-80 bg-gray-300/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-slate-300/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-40 left-40 w-72 h-72 bg-zinc-300/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <TodoProvider>
                <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                    <div className="w-full max-w-4xl">
                        {/* Main container with modern glass effect */}
                        <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/50 rounded-3xl shadow-2xl shadow-gray-900/10 p-10 relative group hover:shadow-3xl hover:shadow-gray-900/15 transition-all duration-500">
                            {/* Subtle inner shadow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl"></div>

                            {/* Modern border glow */}
                            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-gray-300/20 via-slate-300/20 to-zinc-300/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Header */}
                                <div className="text-center mb-12">
                                    <div className="relative inline-block mb-8">
                                        {/* Modern icon with subtle styling */}
                                        <div className="w-24 h-24 bg-gradient-to-br from-gray-800 via-gray-700 to-slate-800 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-gray-900/25 transform hover:scale-105 transition-all duration-300">
                                            <svg
                                                className="w-12 h-12 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0.621 0 1.125-.504 1.125-1.125V9.375c0-.621.504-1.125 1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Modern title */}
                                    <h1 className="text-6xl font-light tracking-tight text-gray-900 mb-4">
                                        Todo
                                        <span className="font-medium">
                                            List
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 text-xl font-light tracking-wide">
                                        จัดการงานของคุณอย่างมีประสิทธิภาพ
                                    </p>

                                    {/* Modern divider */}
                                    <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-8 rounded-full"></div>
                                </div>

                                <TodoList />
                            </div>
                        </div>
                    </div>
                </div>
            </TodoProvider>
        </div>
    );
};

export default HomePage;
