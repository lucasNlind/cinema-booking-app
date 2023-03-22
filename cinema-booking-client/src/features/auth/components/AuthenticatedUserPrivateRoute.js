import { useEffect } from 'react';
import { verifyJwt } from '../authSlice';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks'

const AuthenticatedUserPrivateRoute = ( { page } ) => {
    
    const dispatch = useAppDispatch();
    const { isSuccess, isAuthenticated, user, jwt } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user || !jwt || !jwt.token) return;
        dispatch(verifyJwt(jwt));
    }, [user, jwt, isSuccess]);

    return (user && jwt.token && user.type === 'USER') ? page : <Navigate replace to='/' />

};

export default AuthenticatedUserPrivateRoute;
