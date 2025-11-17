import "./i18n/i18n";
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/Toast/ToastContext";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ConfirmModalProvider } from "./context/ConfirmModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext";
import { UtilContextProvider } from "./context/UtilsContext";
import { NotificationProvider } from "./context/NotificationContext";
import { FilterProvider } from "./context/FilterContext";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/ChatContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <ToastProvider>
        <ConfirmModalProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <UserProvider>
                <UtilContextProvider>
                  <NotificationProvider>
                    <ChatProvider>
                      <FilterProvider>
                        <SocketProvider>
                          <AppRoutes />
                        </SocketProvider>
                      </FilterProvider>
                    </ChatProvider>
                  </NotificationProvider>
                </UtilContextProvider>
              </UserProvider>
            </Provider>
          </QueryClientProvider>
        </ConfirmModalProvider>
      </ToastProvider>
    </BrowserRouter >
  )
}

export default App
