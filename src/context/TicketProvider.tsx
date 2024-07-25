import React, {ReactElement, useState} from 'react'
import TicketContext from './TicketContext'
import {TicketProps} from "../model/Ticket";
import { useLocalStorage } from 'usehooks-ts'

interface WithChildren {
    children: ReactElement | ReactElement[]
}

function TicketProvider({ children }: WithChildren) {
    const [ageType, setAgeType] = useState<string>('');
    const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
    const [ticketsInBasket, setTicketsInBasket] = useLocalStorage<TicketProps[]>('tickets-in-basket', [])

    const addTicketToBasket = (ticket: TicketProps) => {
        setTicketsInBasket(prevTickets => [...prevTickets, ticket]);
    };

    const value = {
        ageType,
        setAgeType,
        toggleDrawer,
        setToggleDrawer,
        ticketsInBasket: ticketsInBasket ?? [],
        addTicketToBasket,
    }

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    )
}

export default TicketProvider;
