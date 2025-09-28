import React, { createContext } from 'react';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../services/todoService';
import { type Todo, mapApiTodoToTodo } from '../utils/todoHelpers';

export interface TodoContextType {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
}

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const {
        data: todos = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const apiTodos = await todoApi.fetchTodos();
            return apiTodos.map(mapApiTodoToTodo);
        },
    });

    const value = {
        todos,
        isLoading,
        error: error?.message || null,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
