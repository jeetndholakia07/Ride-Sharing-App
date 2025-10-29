import { type FC } from 'react';
import Logo from './Logo';
import useMediaQuery from '../../utils/useMediaQuery';

type navbarProps = {
  children: React.ReactNode;
}

const Index: FC<navbarProps> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {isDesktop && <Logo />}
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Index;