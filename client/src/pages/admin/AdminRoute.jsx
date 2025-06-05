// components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';
import Spinner from '../../components/Spinner.jsx';

const AdminRoute = ({ children }) => {
	const { state } = useUserContext();
	const { user, loading } = state;

	if (loading) return <Spinner />;

	if (!user) return <Navigate to='/login' replace />;
	if (user.role !== 'admin') return <Navigate to='/access-denied' replace />;

	return children;
};

export default AdminRoute;
