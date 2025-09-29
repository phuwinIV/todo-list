import React from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

const SearchFilter: React.FC = () => {
    const { searchTerm, setSearchTerm } = useTodoContext();

    return (
        <div className="mb-8">
            <div className="relative">
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-gray-900/5 focus-within:border-gray-300">
                    {/* Clean search icon */}
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400 transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ค้นหา..."
                        className="w-full pl-14 pr-12 py-3.5 text-gray-900 placeholder-gray-500 bg-transparent border-0 rounded-2xl focus:outline-none text-base font-light tracking-wide"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <div className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
                                <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {searchTerm && (
                <div className="mt-3 text-sm text-gray-600 font-light tracking-wide">
                    ค้นหา: "{searchTerm}"
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
