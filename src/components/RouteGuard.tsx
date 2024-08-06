import { ReactElement, useContext, useEffect } from 'react'
import SecurityContext from '../context/SecurityContext'

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated } = useContext(SecurityContext)

    const login_url = "http://localhost:8180/realms/techtopia/protocol/openid-connect/auth?client_id=techtopiaReactApp&response_type=code";

    useEffect(() => {
        if (!isAuthenticated()) {
            alert("You are redirected to the login page")
            window.location.href = login_url;
        }
    }, [isAuthenticated])

    return component
}

export default RouteGuard
