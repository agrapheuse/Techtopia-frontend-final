import React, {createContext} from "react";
import {TicketProps} from "../model/Ticket";

export interface ISettingsContext {
    ageType: string;
    setAgeType: React.Dispatch<React.SetStateAction<string>>;
    toggleDrawer: boolean;
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    ticketsInBasket: TicketProps[];
    addTicketToBasket: (ticket: TicketProps) => void;
    emptyTicketsInBasket: () => void;
}

export default createContext<ISettingsContext>({
    ageType: '',
    setAgeType: () => {},
    toggleDrawer: false,
    setToggleDrawer: () => {},
    ticketsInBasket: [],
    addTicketToBasket: (_ticket: TicketProps) => {},
    emptyTicketsInBasket: () => {},
})