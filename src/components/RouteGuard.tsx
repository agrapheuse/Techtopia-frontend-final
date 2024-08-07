import { ReactElement, useContext, useEffect } from 'react'
import SecurityContext from '../context/SecurityContext'

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated, login } = useContext(SecurityContext)

    useEffect(() => {
        setTimeout(async () => {
            if (!isAuthenticated()) {
                alert('You are redirected to the login page')
                login()
            }
        }, 1000) // isAuthenticated returns false in the first moments, so we leave the time
    }, [isAuthenticated, login])

    return component
}

export default RouteGuard
