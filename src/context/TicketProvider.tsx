import React, {ReactElement, useState} from 'react'
import TicketContext from './TicketContext'
import {Ticket} from "../model/Ticket";

interface WithChildren {
    children: ReactElement | ReactElement[]
}

function TicketProvider({ children }: WithChildren) {
    const [ageType, setAgeType] = useState<string>('');
    const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
    const [ticketsInBasket, setTicketsInBasket] = useState<Ticket[]>([]);

    const addTicketToBasket = (ticket: Ticket) => {
        setTicketsInBasket(prevTickets => [...prevTickets, ticket]);
    };

    const value = {
        ageType,
        setAgeType,
        toggleDrawer,
        setToggleDrawer,
        ticketsInBasket,
        addTicketToBasket,
    }

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    )
}

export default TicketProvider;
