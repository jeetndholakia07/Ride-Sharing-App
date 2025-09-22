import React, { createContext, useContext, useState, type FC } from 'react';
import Toaster from './Toaster.js';

type ToastType = 'success' | 'error' | 'info' | 'alert';

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: React.ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<{ show: boolean; type: ToastType; message: string; }>({
        show: false,
        type: 'info',
        message: '',
    });

    const showToast = (type: ToastType, message: string) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 3000);
    };

    const onCloseToast = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster
                show={toast.show}
                onClose={onCloseToast}
                type={toast.type}
                message={toast.message}
            />
        </ToastContext.Provider>
    );
};
