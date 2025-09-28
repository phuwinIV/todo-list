import React, { createContext } from 'react';
import type { ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoApi, type CreateTodoRequest } from '../services/todoService';
import { type Todo, mapApiTodoToTodo } from '../utils/todoHelpers';

export interface TodoContextType {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
    addTodo: (text: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();
    
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

    const addTodoMutation = useMutation({
        mutationFn: (newTodo: CreateTodoRequest) => todoApi.createTodo(newTodo),
        onSuccess: (data) => {
            queryClient.setQueryData(['todos'], (old: Todo[] = []) => [
                ...old,
                mapApiTodoToTodo(data),
            ]);
        },
    });

    const addTodo = async (text: string) => {
        await addTodoMutation.mutateAsync({ title: text });
    };

    const value = {
        todos,
        isLoading,
        error: error?.message || null,
        addTodo,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
