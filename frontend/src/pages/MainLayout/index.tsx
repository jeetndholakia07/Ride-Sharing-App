import { Outlet } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NavMenu from "../../components/Navbar/NavMenu";
import LoginButtons from "../../components/Navbar/LoginButtons";
import MobileNav from "../../components/Navbar/MobileNav";
import UserDropdown from "../../components/Header/UserDropdown";
import useAuth from "../../hooks/useAuth";
import PageLoader from "../../components/Loading/PageLoader";
import { useQuery } from "@tanstack/react-query";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { getNotificationContext } from "../../context/NotificationContext";
import useMediaQuery from "../../utils/useMediaQuery";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const { isAuthenticated, loading } = useAuth();
  const { setNotificationCount } = getNotificationContext();

  const getNotificationCount = useCallback(async () => {
    try {
      const response = await apiInterceptor.get(api.user.notificationCount);
      setNotificationCount(response.data);
      return response.data;
    } catch (err) {
      console.error("Error getting notification count");
      return 0;
    }
  }, [setNotificationCount]);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: notificationCount, isLoading } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: getNotificationCount,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
  });

  const RightSection = useMemo(() => {
    if (isAuthenticated) {
      return <UserDropdown notificationCount={notificationCount} />;
    }
    return <LoginButtons />;
  }, [isAuthenticated, notificationCount]);


  if (loading || isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Navbar>
          {isDesktop && (
            <>
              <div className="flex space-x-8">
                <NavMenu />
              </div>
              <div className="flex space-x-4 items-center">{RightSection}</div>
            </>
          )}
          {!isDesktop && (<div className="flex justify-between items-center w-full">
            <MobileNav
              setIsOpen={setIsOpen}
              onClose={onClose}
              isOpen={isOpen}
            >
              <div className="mt-6 flex flex-col space-y-6 text-lg">
                <NavMenu onItemClick={onClose} />
                {!isAuthenticated && <LoginButtons onClick={onClose} />}
              </div>
            </MobileNav>
            {isAuthenticated && (
              <div className="ml-auto pr-2">
                <UserDropdown notificationCount={notificationCount} />
              </div>
            )}
          </div>
          )}
        </Navbar>
      </Header>
      <main className="flex-grow pt-16 pb-20 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;