import { Alert } from '@mui/material'
import React, { ReactElement, useContext } from 'react'
import SecurityContext from '../context/SecurityContext'

export interface RouteGuardProps {
    component: ReactElement
}

const RouteGuard = ({ component }: RouteGuardProps) => {
    const { isAuthenticated } = useContext(SecurityContext)

    if (isAuthenticated()) {
        return component
    } else {
        return <Alert severity="info">You are redirected to the login page</Alert>
    }
}

export default RouteGuard
