import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VisitorInformation from "./components/visitor information system/VisitorInformation";
import Menu from "./components/menu/Menu";
import TicketingSystem from "./components/ticketing system/TicketingSystem";
import ParkGate from "./components/park gate/ParkGate";
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import TicketProvider from "./context/TicketProvider";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Navigation} from "./Navigation";
import ShoppingCart from "./components/ticketing system/shopping cart/ShoppingCart";
import FilterProvider from "./context/FilterProvider";
import SecurityContextProvider from './context/SecurityContextProvider'
import { AuthHeader } from './components/AuthHeader'
import RouteGuard from './components/RouteGuard'

const queryClient = new QueryClient();

type HeaderProps = {
    onOpenDrawer: () => void
}

const Header = ({onOpenDrawer}: HeaderProps) => (

    <AppBar position="static" color="transparent">
        <Toolbar sx={{justifyContent: 'flex-start'}}>
            <IconButton onClick={onOpenDrawer}>
                <MenuIcon/>
            </IconButton>
            <IconButton>
                <AccountCircleIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>
)

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <TicketProvider>
                    <FilterProvider>
                        <AuthHeader />
                        <BrowserRouter>
                            <Header onOpenDrawer={() => setDrawerOpen(!drawerOpen)}/>
                            <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}/>
                            <Routes>
                                <Route path="/" element={<RouteGuard component={<Menu/>}/>}/>
                                <Route path="/visitorInformation" element={<RouteGuard component={<VisitorInformation/>}/>}/>
                                <Route path="/tickets" element={<RouteGuard component={<TicketingSystem/>}/>}/>
                                <Route path="/cart" element={<RouteGuard component={<ShoppingCart/>}/>}/>
                                <Route path="/parkGate" element={<RouteGuard component={<ParkGate/>}/>}/>
                            </Routes>
                        </BrowserRouter>
                    </FilterProvider>
                </TicketProvider>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}

export default App;
