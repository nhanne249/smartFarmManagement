import { createBrowserRouter } from "react-router";
import MainLayout from "../../layouts/mainlayout";
import Dashboard from "../../pages/dashboard";
import Settings from "../../pages/settings";
import DataPage from "../../pages/data";

export const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        path: "/",
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "data",
                element: <DataPage />,
            },
        ],
    },
]);