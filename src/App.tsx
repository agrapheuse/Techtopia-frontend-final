import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import VisitorInformation from './components/visitor information system/VisitorInformation'
import Menu from './components/menu/Menu'
import TicketingSystem from './components/ticketing system/TicketingSystem'
import ParkGate from './components/park gate/ParkGate'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import TicketProvider from './context/TicketProvider'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
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
    const { isAuthenticated, logout } = useContext(SecurityContext)
    const navigate = useNavigate()

    return (
        <AppBar position="static" color="transparent">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <div>
                    <IconButton onClick={onOpenDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate('/myAccount')}>
                        <AccountCircleIcon />
                    </IconButton>
                </div>
                {isAuthenticated() && (
                    <IconButton onClick={logout}>
                        <LogoutIcon />
                    </IconButton>
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
