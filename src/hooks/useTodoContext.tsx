import { useContext } from 'react';
import { TodoContext, type TodoContextType } from '../context/TodoContext';

export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }

    return context;
};
