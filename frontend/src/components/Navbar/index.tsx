import { type FC } from 'react';
import Logo from './Logo';

type navbarProps = {
  children: React.ReactNode;
}

const Index: FC<navbarProps> = ({ children }) => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo />
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Index;