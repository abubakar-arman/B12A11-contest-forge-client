import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Spinner2 from "../../Components/Spinner2";

const DashboardIndex = () => {
    const { loading } = useAuth();
    const { role, isRoleLoading} = useRole(); // 'admin', 'creator', or 'user'

    if (loading || isRoleLoading) return <Spinner2 />

    if (role === 'admin') {
        return <Navigate to="/dashboard/manage-contests" replace />;
    }
    
    if (role === 'creator') {
        return <Navigate to="/dashboard/created-contests" replace />;
    }

    return <Navigate to="/dashboard/my-participated-contests" replace />;
};

export default DashboardIndex