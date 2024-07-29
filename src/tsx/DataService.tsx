import axios from 'axios';
import {PointOfInterest} from "../model/PointOfInterest";
import {TicketProps} from "../model/Ticket";

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
        const response = await axios.post<void>('/tickets/create', newTicket);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}

export const createTicketsOneByOne = async (tickets: TicketProps[]) => {
    try {
        const results = [];
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

export const changeOpenStatus = async (uuid: string, openStatus: boolean) => {
    axios.defaults.baseURL = 'http://localhost:8092';
    try {
        const response = await axios.patch<void>(`/pointOfInterest/changeOpenStatus?uuid=${uuid}&open=${openStatus}`);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}
