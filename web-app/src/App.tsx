import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
            <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
