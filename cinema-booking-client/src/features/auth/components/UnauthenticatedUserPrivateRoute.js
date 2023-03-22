import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/hooks";

const UnauthenticatedUserPrivateRoute = ( { page } ) => {

    const { isSuccess, user, jwt } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user) return;
    }, [user, isSuccess]);

    return (user && !jwt) || (!user) ? page : <Navigate replace to='/'/>

};

export default UnauthenticatedUserPrivateRoute;
