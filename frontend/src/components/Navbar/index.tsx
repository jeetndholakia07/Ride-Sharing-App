import { useState } from 'react';
import { NavLink } from 'react-router';
import NavItem from './NavItem';
import LoginButtons from './LoginButtons';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/">
              <span className="text-2xl font-bold text-blue-700">Peer</span>
              <span className="text-2xl font-bold text-green-700">Ride</span>
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavItem />
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            <LoginButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
            >
              <i className="bi bi-list text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed md:hidden inset-0 bg-white z-30 flex flex-col px-6 pt-6">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-black hover:cursor-pointer text-2xl focus:outline-none"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/">
              <span className="text-2xl font-bold text-blue-700">Peer</span>
              <span className="text-2xl font-bold text-green-700">Ride</span>
            </NavLink>
          </div>

          <div className="mt-6 flex flex-col space-y-6 text-lg">
            <NavItem onClick={handleClose} />
            <LoginButtons onClick={handleClose} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Index;