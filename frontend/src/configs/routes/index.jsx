import { createBrowserRouter } from "react-router";
import MainLayout from "../../layouts/mainlayout";
import Dashboard from "../../pages/dashboard";
import Settings from "../../pages/settings";

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
        ],
    },
]);