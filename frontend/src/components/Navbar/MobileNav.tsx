import { type FC } from 'react';

type MobileNavProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: any;
    setIsOpen: any;
};

const MobileNav: FC<MobileNavProps> = ({ isOpen, children, onClose, setIsOpen }) => {
    return (
        <>
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
                >
                    <i className="bi bi-list text-2xl"></i>
                </button>
            </div>
            {isOpen && <div className="fixed md:hidden inset-0 bg-white z-30 flex flex-col px-6 pt-6">
                {/* Close Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-800 hover:text-black text-2xl focus:outline-none"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                {children}
            </div>
            }
        </>
    );
};

export default MobileNav;
