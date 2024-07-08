import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MapView from "./components/MapView/MapView.tsx";
import VisitorInformation from "./components/VisitorInformation";
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element=<VisitorInformation/>/>
                    <Route path="/visitorInformation" element=<MapView/>/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
