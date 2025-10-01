import { createContext } from 'react';
import type { Todo } from '../utils/todoHelpers';

export interface TodoContextType {
    todos: Todo[];
    filteredTodos: Todo[];
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    addTodo: (text: string) => Promise<void>;
    updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
    fetchNextPage: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);
