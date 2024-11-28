import React, { lazy, Suspense, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import { useSystemContext } from "./hooks/useSystemContext";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const unauthRoutes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
        </>
    )
);

const authRoutes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Dashboard />} />
        </>
    )
);

const App = () => {
    const { system } = useSystemContext();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={system ? authRoutes : unauthRoutes} />
        </Suspense>
    );
};

export default App;