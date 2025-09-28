import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/home" element={<HomePage />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    );
}

export default App;
