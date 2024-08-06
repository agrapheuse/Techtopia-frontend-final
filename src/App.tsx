import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import VisitorInformation from './components/visitor information system/VisitorInformation'
import Menu from './components/menu/Menu'
import TicketingSystem from './components/ticketing system/TicketingSystem'
import ParkGate from './components/park gate/ParkGate'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import TicketProvider from './context/TicketProvider'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Navigation } from './Navigation'
import ShoppingCart from './components/ticketing system/shopping cart/ShoppingCart'
import FilterProvider from './context/FilterProvider'
import SecurityContextProvider from './context/SecurityContextProvider'
import RouteGuard from './components/RouteGuard'
import MyAccount from './components/account/MyAccount'
import SecurityContext from './context/SecurityContext'

const queryClient = new QueryClient()

type HeaderProps = {
    onOpenDrawer: () => void
}

function Header({ onOpenDrawer }: HeaderProps) {
    const { isAuthenticated, logout, login } = useContext(SecurityContext)
    const navigate = useNavigate()

    console.log(isAuthenticated())
    return (
        <AppBar position="static" color="transparent">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <div>
                    <IconButton onClick={onOpenDrawer}>
                        <MenuIcon />
                    </IconButton>
                    {isAuthenticated() && (
                        <IconButton onClick={() => navigate('/myAccount')}>
                            <AccountCircleIcon />
                        </IconButton>
                    )}
                </div>
                {isAuthenticated() ? (
                    <Button variant="contained" color="primary" startIcon={<LogoutIcon />} onClick={logout}>
                        Log Out
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" startIcon={<LoginIcon />} onClick={login}>
                        Log In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <TicketProvider>
                    <FilterProvider>
                        <BrowserRouter>
                            <Header onOpenDrawer={() => setDrawerOpen(!drawerOpen)} />
                            <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
                            <Routes>
                                <Route path="/" element={<Menu />} />
                                <Route path="/visitorInformation" element={<VisitorInformation />} />
                                <Route path="/tickets" element={<RouteGuard component={<TicketingSystem />} />} />
                                <Route path="/tickets/cart" element={<RouteGuard component={<ShoppingCart />} />} />
                                <Route path="/parkGate" element={<RouteGuard component={<ParkGate />} />} />
                                <Route path="/myAccount" element={<RouteGuard component={<MyAccount />} />} />
                            </Routes>
                        </BrowserRouter>
                    </FilterProvider>
                </TicketProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
