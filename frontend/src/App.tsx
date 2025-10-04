import "./i18n/i18n";
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/Toast/ToastContext";
import { Provider } from "react-redux";
import { store } from "./context/store/store";
import { ConfirmModalProvider } from "./context/ConfirmModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoleProvider } from "./context/RoleContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <ToastProvider>
        <ConfirmModalProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <RoleProvider>
                <AppRoutes />
              </RoleProvider>
            </Provider>
          </QueryClientProvider>
        </ConfirmModalProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
