import React, {createContext} from "react";
import {Ticket} from "../model/Ticket";

export interface ISettingsContext {
    ageType: string
    setAgeType: React.Dispatch<React.SetStateAction<string>>;
    toggleDrawer: boolean;
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    ticketsInBasket: Ticket[];
    addTicketToBasket: (ticket: Ticket) => void;
}

export default createContext<ISettingsContext>({
    ageType: '',
    setAgeType: () => {},
    toggleDrawer: false,
    setToggleDrawer: () => {},
    ticketsInBasket: [],
    // @ts-ignore
    addTicketToBasket: (ticket: Ticket) => {},
})