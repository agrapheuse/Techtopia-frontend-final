import { ReactElement, useContext, useEffect } from 'react'
import SecurityContext from '../context/SecurityContext'

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated, login } = useContext(SecurityContext)

    useEffect(() => {
        if (!isAuthenticated()) {
            alert("You are redirected to the login page")
            login();
        }
    }, [isAuthenticated, login])

    return component
}

export default RouteGuard
