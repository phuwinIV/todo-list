export interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
}

export interface CreateTodoRequest {
    title: string;
    completed?: boolean;
}

const API_BASE = 'https://jsonplaceholder.typicode.com';

const api = {
    async fetchTodos(): Promise<ApiTodo[]> {
        const response = await fetch(`${API_BASE}/todos?_limit=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    },

    async createTodo(newTodo: CreateTodoRequest): Promise<ApiTodo> {
        const response = await fetch(`${API_BASE}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTodo.title,
                completed: newTodo.completed || false,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create todo');
        }
        return response.json();
    },

    async updateTodo(id: number, updates: Partial<ApiTodo>): Promise<ApiTodo> {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        return response.json();
    },

    async deleteTodo(id: number): Promise<void> {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
    },
};

export const todoApi = api;
