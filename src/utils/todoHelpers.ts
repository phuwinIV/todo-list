import type { ApiTodo } from '../services/todoService';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const mapApiTodoToTodo = (apiTodo: ApiTodo): Todo => ({
    id: apiTodo.id,
    text: apiTodo.title,
    completed: apiTodo.completed,
});
