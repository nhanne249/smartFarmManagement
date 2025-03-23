import MainLayout from "../../layouts/mainlayout"
import Dashboard from "../../pages/dashboard"
import Settings from "../../pages/settings"

export const mainPageRoutes = {
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'settings',
            element: <Settings />
        },
    ]
}