import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VisitorInformation from "./components/visitor information system/VisitorInformation";
import Menu from "./components/menu/Menu";
import TicketingSystem from "./components/ticketing system/TicketingSystem";
import ParkGate from "./components/park gate/ParkGate";
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import TicketProvider from "./context/TicketProvider";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TicketProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element=<Menu/>/>
                        <Route path="/visitorInformation" element=<VisitorInformation/>/>
                        <Route path="/tickets" element=<TicketingSystem/>/>
                        <Route path="/parkGate" element=<ParkGate/>/>
                    </Routes>
                </BrowserRouter>
            </TicketProvider>
        </QueryClientProvider>
    );
}

export default App;
