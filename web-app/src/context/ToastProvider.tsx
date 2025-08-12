import { createContext, useState, type ReactNode } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

interface Toast {
  id: number;
  message: string;
  severity: AlertColor;
}

export interface ToastContextType {
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
  toastWarning: (message: string) => void;
  toastInfo: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastCount = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, severity: AlertColor) => {
    const id = ++toastCount;
    setToasts((prev) => [...prev, { id, message, severity }]);
  };

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        toastSuccess: (msg) => addToast(msg, 'success'),
        toastError: (msg) => addToast(msg, 'error'),
        toastWarning: (msg) => addToast(msg, 'warning'),
        toastInfo: (msg) => addToast(msg, 'info'),
      }}
    >
      {children}
      {toasts.map(({ id, message, severity }) => (
        <Snackbar
          key={id}
          open
          autoHideDuration={3000}
          onClose={() => handleClose(id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => handleClose(id)} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};
