import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    loggedInUser: string | undefined
    userEmail: string | undefined
    userRole: Array<string> | undefined
    logout: () => void
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    userEmail: undefined,
    userRole: undefined,
    logout: () => {},
})
