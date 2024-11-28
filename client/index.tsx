import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './tailwind.css';
import { QueryClientProvider, QueryClient } from "react-query";
import { SystemContextProvider } from "./context/SystemContext";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <SystemContextProvider>
            <QueryClientProvider client={queryClient}>
                
                    <App />
            </QueryClientProvider>
        </SystemContextProvider>
    </React.StrictMode>
);