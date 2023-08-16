import { getAuthisLogged, useAuth } from "@/services/auth";
import { Navigate } from "react-router-dom";

export interface PrivateRouteProps {
    children: React.ReactNode,
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isUserLoggedIn = useAuth(getAuthisLogged);

  return (
    <>
        {isUserLoggedIn ? children : <Navigate to='/login' />}
    </>
  )
}
