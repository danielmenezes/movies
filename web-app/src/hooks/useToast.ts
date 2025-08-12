import { useContext } from "react";
import { ToastContext, type ToastContextType } from "../context/ToastProvider";

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
};