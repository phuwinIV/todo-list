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
        <div className="mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="เพิ่มรายการใหม่..."
                        className="w-full px-6 py-4
                        text-black
                        text-lg border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        disabled={isSubmitting}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || text.trim() === ''}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>กำลังเพิ่ม...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <span>เพิ่ม</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;
