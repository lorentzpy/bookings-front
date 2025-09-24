import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ( { children } ) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <p>Chargement...</p>
    };

    if (!user) {
        return <Navigate to="/login" />
    }

    return children;
};

export default ProtectedRoute;
