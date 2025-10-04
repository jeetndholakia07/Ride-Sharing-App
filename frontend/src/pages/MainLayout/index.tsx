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
import { useQuery } from "@tanstack/react-query";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const { isAuthenticated, loading } = useAuth();

  const getNotificationCount = async () => {
    try {
      const response = await apiInterceptor.get(api.user.notificationCount);
      return response.data;
    }
    catch (err) {
      console.error("Error getting notification count");
      return 0;
    }
  };

  const { data: notificationCount, isLoading } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: getNotificationCount,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated
  });

  if (loading || isLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Navbar>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavMenu notificationCount={notificationCount} />
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated ? <UserDropdown notificationCount={notificationCount} /> : <LoginButtons />}
          </div>
          {/* Mobile Navigation */}
          <MobileNav setIsOpen={setIsOpen} onClose={onClose} isOpen={isOpen}>
            <div className="mt-6 flex flex-col space-y-6 text-lg">
              <NavMenu onItemClick={onClose} notificationCount={notificationCount} />
              {isAuthenticated ? <UserDropdown notificationCount={notificationCount} /> : <LoginButtons onClick={onClose} />}
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