import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import NotFound from "../pages/Shared/NotFound";
import AllContests from "../pages/AllContests";
import ContestDetails from "../pages/ContestDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import ParticipatedContests from "../pages/Dashboard/User/ParticipatedContests";
import WinningContests from "../pages/Dashboard/User/WinningContests";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import CreatedContests from "../pages/Dashboard/Creator/CreatedContests";
import SubmittedTasks from "../pages/Dashboard/Creator/SubmittedTasks";

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
        element: <DashboardLayout />,
        children: [
            {
                path: 'my-participated-contests',
                Component: ParticipatedContests
            },
            {
                path: 'my-winning-contests',
                Component: WinningContests
            },
            {
                path: 'profile',
                Component: UserProfile
            },
            {
                path: 'add-contest',
                Component: AddContest
            },
            {
                path: 'created-contests',
                Component: CreatedContests
            },
            {
                path: 'submitted-tasks',
                Component: SubmittedTasks
            }
        ]
    },
]);