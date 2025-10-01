import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
    useMutation,
    useInfiniteQuery,
    useQueryClient,
    type InfiniteData,
} from '@tanstack/react-query';
import { todoApi, type CreateTodoRequest } from '../services/todoService';
import { type Todo, mapApiTodoToTodo } from '../utils/todoHelpers';
import { TodoContext, type TodoContextType } from './TodoContext';

interface TodoProviderProps {
    children: ReactNode;
}

type TodoInfiniteData = InfiniteData<Todo[], number>;

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');

    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        error,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: async ({ pageParam = 1 }) => {
            const apiTodos = await todoApi.fetchTodos(pageParam, 10);
            return apiTodos.map(mapApiTodoToTodo);
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
    });

    const todos = useMemo(() => {
        return data?.pages?.flat() || [];
    }, [data]);

    const filteredTodos = useMemo(() => {
        if (!searchTerm.trim()) {
            return todos;
        }
        return todos.filter((todo) =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [todos, searchTerm]);

    const addTodoMutation = useMutation({
        mutationFn: (newTodo: CreateTodoRequest) => todoApi.createTodo(newTodo),
        onSuccess: (data) => {
            queryClient.setQueryData<TodoInfiniteData>(['todos'], (old) => {
                if (!old)
                    return {
                        pages: [[mapApiTodoToTodo(data)]],
                        pageParams: [1],
                    };

                const newTodo = mapApiTodoToTodo(data);
                const updatedPages = [...old.pages];
                updatedPages[0] = [newTodo, ...updatedPages[0]];

                return {
                    ...old,
                    pages: updatedPages,
                };
            });
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Todo> }) =>
            todoApi.updateTodo(id, {
                title: updates.text,
                completed: updates.completed,
            }),
        onSuccess: (data, { id }) => {
            queryClient.setQueryData<TodoInfiniteData>(['todos'], (old) => {
                if (!old) return old;

                const updatedPages = old.pages.map((page: Todo[]) =>
                    page.map((todo) =>
                        todo.id === id ? mapApiTodoToTodo(data) : todo
                    )
                );

                return {
                    ...old,
                    pages: updatedPages,
                };
            });
        },
    });

    const addTodo = async (text: string) => {
        await addTodoMutation.mutateAsync({ title: text });
    };

    const deleteTodoMutation = useMutation({
        mutationFn: (id: number) => todoApi.deleteTodo(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData<TodoInfiniteData>(['todos'], (old) => {
                if (!old) return old;

                const updatedPages = old.pages.map((page: Todo[]) =>
                    page.filter((todo) => todo.id !== id)
                );

                return {
                    ...old,
                    pages: updatedPages,
                };
            });
        },
    });

    const updateTodo = async (id: number, updates: Partial<Todo>) => {
        await updateTodoMutation.mutateAsync({ id, updates });
    };

    const deleteTodo = async (id: number) => {
        await deleteTodoMutation.mutateAsync(id);
    };

    const value: TodoContextType = {
        todos,
        filteredTodos,
        isLoading,
        isFetchingNextPage: isFetchingNextPage || false,
        hasNextPage: hasNextPage || false,
        error: error?.message || null,
        searchTerm,
        setSearchTerm,
        addTodo,
        updateTodo,
        deleteTodo,
        fetchNextPage,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
