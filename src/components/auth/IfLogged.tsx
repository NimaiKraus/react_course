import { getAuthisLogged, useAuth } from "@/services/auth";

export interface IfLoggedProps {
    children: React.ReactNode,
    alternativeComponent: React.ReactNode
}

export const IfLogged = ({children, alternativeComponent}: IfLoggedProps) => {
    const isUserLoggedIn = useAuth(getAuthisLogged);

  return (
    <>
        {isUserLoggedIn ? children : alternativeComponent}
    </>
  )
}
