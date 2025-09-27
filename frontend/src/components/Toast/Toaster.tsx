import { type FC } from 'react';
import "./style.css";

type ToastProps = {
    show: boolean;
    onClose: any;
    type: string;
    message: string;
};

const toastTitles: any = {
    success: 'Success',
    error: 'Error',
    info: 'Info',
    alert: 'Alert'
};

const toastIconClasses: any = {
    success: 'bi-check-circle-fill text-green-600',
    error: 'bi-x-circle-fill text-red-600',
    info: 'bi-info-circle-fill text-blue-600',
    alert: 'bi-exclamation-triangle-fill text-yellow-600',
};

const toastStyles: any = {
    success: 'bg-white text-black border-green-800',
    error: 'bg-white text-black border-red-800',
    info: 'bg-white text-black border-blue-800',
    alert: 'bg-white text-black border-yellow-600',
};

const Toaster: FC<ToastProps> = ({ show, onClose, type = 'info', message }) => {
    if (!show) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-4">
            <div
                className={`min-w-[320px] p-4 rounded-lg shadow-lg font-semibold text-sm leading-6 
                ${toastStyles[type]} transform transition-all duration-300 ease-in-out
                animate__animated animate__fadeInRight`}
                role="alert"
            >
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <i
                            className={`bi ${toastIconClasses[type]} mr-2 text-xl`}
                            aria-hidden="true"
                        ></i>
                        <strong>{toastTitles[type]}</strong>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-black hover:cursor-pointer bg-transparent border-0 text-xl focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Toaster;