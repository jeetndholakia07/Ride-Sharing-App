import { type FC } from "react";
import Logo from "./Logo";

type MobileNavProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    setIsOpen: (value: boolean) => void;
};

const MobileNav: FC<MobileNavProps> = ({ isOpen, children, onClose, setIsOpen }) => {
    return (
        <>
            {/* Hamburger Icon */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-black focus:outline-none"
                >
                    <i className="bi bi-list text-2xl"></i>
                </button>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="fixed md:hidden inset-0 bg-white z-30 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                        <div className="flex-shrink-0 w-28">
                            <Logo />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="text-gray-700 hover:text-black text-2xl focus:outline-none"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    {/* Nav Content */}
                    <div className="flex flex-col px-6 pt-0 mt-0 space-y-6 overflow-y-auto">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNav;