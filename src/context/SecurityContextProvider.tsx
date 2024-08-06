import React, { ReactNode, useEffect, useState } from 'react'
import SecurityContext from './SecurityContext'
import { addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader } from '../services/Auth'
import { isExpired } from 'react-jwt'
import Keycloak from 'keycloak-js'

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: `${process.env.REACT_APP_KC_URL}`,
    realm: `${process.env.REACT_APP_KC_REALM}`,
    clientId: `${process.env.REACT_APP_KC_CLIENT_ID}`,
}

const keycloak: Keycloak = new Keycloak(keycloakConfig)

function SecurityContextProvider({ children }: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined)
    const [userRole, setUserRole] = useState<Array<string> | undefined>(undefined)

    useEffect(() => {
        keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false }).then((authenticated) => {
            if (authenticated) {
                addAccessTokenToAuthHeader(keycloak.token)
                setLoggedInUser(keycloak.idTokenParsed?.name)
                setUserEmail(keycloak.idTokenParsed?.email)
                setUserRole(keycloak.tokenParsed?.resource_access?.techtopiaReactApp?.roles)
            } else {
                // Optionally redirect or handle unauthenticated state
            }
        })

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
    }, [])

    function login() {
        window.location.href = keycloak.createLoginUrl()
    }

    function logout() {
        const logoutOptions = { redirectUri: process.env.REACT_APP_URL }
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
                login,
                logout,
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}

export default SecurityContextProvider
