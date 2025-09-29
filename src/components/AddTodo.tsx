import React, { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addTodo } = useTodoContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === '') return;

        setIsSubmitting(true);
        try {
            await addTodo(text.trim());
            setText('');
        } catch (error) {
            console.error('Failed to add todo:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mb-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-gray-900/5 focus-within:border-gray-300">
                        {/* Clean plus icon */}
                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>

                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="เพิ่มงานใหม่..."
                            className="w-full pl-14 pr-28 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-0 rounded-2xl focus:outline-none text-base font-light tracking-wide"
                            disabled={isSubmitting}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button
                                type="submit"
                                disabled={isSubmitting || text.trim() === ''}
                                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-light text-sm tracking-wide"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>เพิ่ม</span>
                                    </div>
                                ) : (
                                    <span>เพิ่ม</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;
