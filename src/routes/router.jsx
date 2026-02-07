import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import NotFound from "../pages/Shared/NotFound";
import AllContests from "../pages/AllContests";

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
            path: '/*',
            Component: NotFound
        }
    ]
  },
]);