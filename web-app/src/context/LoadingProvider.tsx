
import { CircularProgress } from '@mui/material';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface LoadingContextType {
    startLoading: (message?: string) => void;
    stopLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loadingMessage, setLoadingMessage] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const startLoading = (message?: string) => {
        setLoadingMessage(message);
        setLoading(true);
    };

    const stopLoading = () => {
        setLoadingMessage(undefined);
        setLoading(false);
    }

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading }}>
            {children}
            {loading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
                    <CircularProgress color="inherit" />
                    {loadingMessage && <span className="mt-2 text-gray-500">{loadingMessage}</span>}
                </div>
            )}
        </LoadingContext.Provider>
    );
}

export const useLoad = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoad deve ser usado dentro de LoadingProvider');
  }
  return context;
};