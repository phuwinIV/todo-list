export interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
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
};

export const todoApi = api;
