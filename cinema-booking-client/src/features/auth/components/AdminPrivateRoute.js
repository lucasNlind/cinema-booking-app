import { useEffect } from 'react';
import { verifyJwt } from '../authSlice';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';

const AdminPrivateRoute = ( { page } ) => {

    const dispatch = useAppDispatch();
    const { isSuccess, isAuthenticated, user, jwt } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user || !jwt || !jwt.token) return;
    }, [user, jwt, isSuccess]);

    return (isAuthenticated && user.type === 'ADMIN') ? page : <Navigate replace to='/' />

};

export default AdminPrivateRoute;
