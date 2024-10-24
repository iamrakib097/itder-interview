import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderProvider from "./ContextAPIs/OrderProvider";
import BasicProvider from "./ContextAPIs/BasicProvider.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast"; // Add this for toast rendering
import { CartProvider } from "./context/CartContext.jsx"; // Import the CartProvider

// Initialize Query Client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <OrderProvider>
          <BasicProvider>
            <RouterProvider router={Router} />
            <Toaster position="top" />
            <ToastContainer />
          </BasicProvider>
        </OrderProvider>
      </QueryClientProvider>
    </CartProvider>
  </>
);
