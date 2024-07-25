import axios from 'axios';
import {Attraction} from "../model/Attraction";
import {FoodStand} from "../model/FoodStand";
import {PointOfInterest} from "../model/PointOfInterest";
import {TicketProps} from "../model/Ticket.tsx";

export const getAttractions = async ({ name, open }: { name: string | null; open: boolean | null; }) => {
    axios.defaults.baseURL = 'http://localhost:8091';
    let url = `/attractions?`;
    if (name) url += `name=${name}&`;
    if (open) url += `open=${open}`;
    const attractions = await axios.get<Attraction[]>(url);
    return attractions.data;
}

export const getFoodStands = async ({ name, open }: { name: string | null; open: boolean | null; }) => {
    axios.defaults.baseURL = 'http://localhost:8091';
    let url = `/foodStands?`;
    if (name) url += `name=${name}&`;
    if (open) url += `open=${open}`;
    const foodStands = await axios.get<FoodStand[]>(url);
    return foodStands.data;
}

export const getPointsOfInterest = async ({ name, open }: { name: string | null; open: boolean | null; }) => {
    axios.defaults.baseURL = 'http://localhost:8091';
    let url = `/pointOfInterest?`;
    if (name) url += `name=${name}&`;
    if (open) url += `open=${open}`;
    const pointOfInterest = await axios.get<PointOfInterest[]>(url);
    return pointOfInterest.data;
}

const createTicket = async (newTicket: TicketProps) => {
    axios.defaults.baseURL = 'http://localhost:8095';
    try {
        const response = await axios.post<TicketProps>('/tickets/create', newTicket);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}

export const createTicketsOneByOne = async (tickets: TicketProps[]) => {
    try {
        const results: T[] = [];
        for (const ticket of tickets) {
            const result = await createTicket(ticket);
            results.push(result);
        }
        return results;
    } catch (error) {
        console.error('Error creating tickets:', error);
        return [];
    }
};


