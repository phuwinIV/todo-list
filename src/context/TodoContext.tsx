import React, { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoApi, type CreateTodoRequest } from '../services/todoService';
import { type Todo, mapApiTodoToTodo } from '../utils/todoHelpers';

export interface TodoContextType {
    todos: Todo[];
    filteredTodos: Todo[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    addTodo: (text: string) => Promise<void>;
    updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredTodos = useMemo(() => {
        if (!searchTerm.trim()) {
            return todos;
        }
        return todos.filter(todo =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [todos, searchTerm]);

    const addTodoMutation = useMutation({
        mutationFn: (newTodo: CreateTodoRequest) => todoApi.createTodo(newTodo),
        onSuccess: (data) => {
            queryClient.setQueryData(['todos'], (old: Todo[] = []) => [
                ...old,
                mapApiTodoToTodo(data),
            ]);
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Todo> }) =>
            todoApi.updateTodo(id, {
                title: updates.text,
                completed: updates.completed,
            }),
        onSuccess: (data, { id }) => {
            queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
                old.map((todo) =>
                    todo.id === id ? mapApiTodoToTodo(data) : todo
                )
            );
        },
    });

    const addTodo = async (text: string) => {
        await addTodoMutation.mutateAsync({ title: text });
    };

    const deleteTodoMutation = useMutation({
        mutationFn: (id: number) => todoApi.deleteTodo(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData(['todos'], (old: Todo[] = []) =>
                old.filter(todo => todo.id !== id)
            );
        },
    });

    const updateTodo = async (id: number, updates: Partial<Todo>) => {
        await updateTodoMutation.mutateAsync({ id, updates });
    };

    const deleteTodo = async (id: number) => {
        await deleteTodoMutation.mutateAsync(id);
    };

    const value = {
        todos,
        filteredTodos,
        isLoading,
        error: error?.message || null,
        searchTerm,
        setSearchTerm,
        addTodo,
        updateTodo,
        deleteTodo,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
