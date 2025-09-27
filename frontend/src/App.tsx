import "./i18n/i18n";
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/Toast/ToastContext";
import { Provider } from "react-redux";
import { store } from "./context/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </QueryClientProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
