import React, { ReactNode, useEffect, useState } from 'react'
import SecurityContext from './SecurityContext'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../services/Auth'
import { isExpired } from 'react-jwt'
import Keycloak from 'keycloak-js'

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: 'http://localhost:8180',
    realm: 'techtopia',
    clientId: 'techtopiaReactApp',
}

const keycloak: Keycloak = new Keycloak(keycloakConfig)

function SecurityContextProvider({ children }: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined)
    const [userRole, setUserRole] = useState<Array<string> | undefined>(undefined)

    useEffect(() => {
        keycloak.init({ onLoad: 'login-required' })
    }, [])

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.name)
        setUserEmail(keycloak.idTokenParsed?.email)
        setUserRole(keycloak.tokenParsed?.resource_access?.techtopiaReactApp?.roles)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.name)
        })
    }

    function logout() {
        const logoutOptions = { redirectUri: 'http://localhost:3000/' }
        keycloak.logout(logoutOptions)
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                userEmail,
                userRole,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}

export default SecurityContextProvider