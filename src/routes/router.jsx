import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import NotFound from "../pages/Shared/NotFound";
import AllContests from "../pages/AllContests";
import ContestDetails from "../pages/ContestDetails";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/signup',
                Component: Signup
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/all-contests',
                Component: AllContests
            },
            {
                path: '/contest-details/:id',
                element: <ContestDetails />,
                loader: () => fetch('/contest.json')
                // loader: ({ params }) => fetch('https://moviemaster-pro.vercel.app/movies/' + params.id)
            },
            {
                path: '/*',
                Component: NotFound
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />
    },
]);