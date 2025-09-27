import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar/index";
import NavMenu from "../../components/Navbar/NavMenu";
import LoginButtons from "../../components/Navbar/LoginButtons";
import MobileNav from "../../components/Navbar/MobileNav";
import UserDropdown from "../../components/Header/UserDropdown";
import useAuth from "../../hooks/useAuth";
import PageLoader from "../../components/Loading/PageLoader";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Navbar>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavMenu />
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated ? <UserDropdown /> : <LoginButtons />}
          </div>
          {/* Mobile Navigation */}
          <MobileNav setIsOpen={setIsOpen} onClose={onClose} isOpen={isOpen}>
            <div className="mt-6 flex flex-col space-y-6 text-lg">
              <NavMenu onItemClick={onClose} />
              {isAuthenticated ? <UserDropdown /> : <LoginButtons onClick={onClose} />}
            </div>
          </MobileNav>
        </Navbar>
      </Header>
      <main className="flex-grow pt-16 pb-20 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Index;