import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastProvider';
import { LoadingProvider } from './context/LoadingProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <LoadingProvider>
            <AppRoutes />
          </LoadingProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
