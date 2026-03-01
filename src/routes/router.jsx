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
import UpdateContest from "../pages/Dashboard/Creator/UpdateContest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import Leaderboard from "../pages/Leaderboard";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";
import DashboardIndex from "../pages/Dashboard/DashboardIndex";
import RequireUser from "./RequireUser";
import RequireCreator from "./RequireCreator";
import Contact from "../pages/Contact";

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
                element:
                    <ContestDetails />
                // loader: () => fetch('/contest.json')
                // loader: ({ params }) => fetch('https://moviemaster-pro.vercel.app/movies/' + params.id)
            },
            {
                path: '/leaderboard',
                element:
                    <RequireAuth>
                        <Leaderboard />
                    </RequireAuth>
            },
            {
                path: 'Contact',
                Component: Contact
            },
            {
                path: '/*',
                Component: NotFound
            }
        ]
    },
    {
        path: '/dashboard',
        // element:
        //     <RequireAuth>
        //         <DashboardLayout />
        //     </RequireAuth>,
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardIndex />
            },
            {
                path: 'my-participated-contests',
                element:
                    <RequireUser>
                        <ParticipatedContests />
                    </RequireUser>
            },
            {
                path: 'my-winning-contests',
                element:
                    <RequireUser>
                        <WinningContests />
                    </RequireUser>
            },
            {
                path: 'profile/:id',
                Component: UserProfile
            },
            {
                path: 'add-contest',
                element:
                    <RequireCreator>
                        <AddContest />
                    </RequireCreator>
            },
            {
                path: 'created-contests',
                element:
                    <RequireCreator>
                        <CreatedContests />
                    </RequireCreator>
            },
            {
                path: 'submitted-tasks/:id',
                element:
                    <RequireCreator>
                        <SubmittedTasks />
                    </RequireCreator>
            },
            {
                path: 'submitted-tasks',
                element:
                    <RequireCreator>
                        <SubmittedTasks />
                    </RequireCreator>
            },
            {
                path: 'update-contest/:id',
                element:
                    <RequireCreator>
                        <UpdateContest />
                    </RequireCreator>
            },
            {
                path: 'manage-users',
                element:
                    <RequireAdmin>
                        <ManageUsers />
                    </RequireAdmin>
            },
            {
                path: 'manage-contests',
                element:
                    <RequireAdmin>
                        <ManageContests />
                    </RequireAdmin>
            }
        ]
    },
]);