import axios from 'axios';
import {Attraction} from "../model/Attraction";
import {FoodStand} from "../model/FoodStand";
import {PointOfInterest} from "../model/PointOfInterest";
import {TicketProps} from "../model/Ticket.tsx";

axios.defaults.baseURL = 'http://localhost:8091';

export const getAttractions = async ({name, open,}: { name: string | null; open: boolean | null; }) => {
    if (name && open) {
        const attractions = await axios.get<Attraction[]>(`/attractions?name=${name}&open=${open}`);
        return attractions.data;
    } else if (name) {
        const attractions = await axios.get<Attraction[]>(`/attractions?name=${name}`);
        return attractions.data;
    } else if (open) {
        const attractions = await axios.get<Attraction[]>(`/attractions?open=${open}`);
        return attractions.data;
    } else {
        const attractions = await axios.get<Attraction[]>(`/attractions`);
        return attractions.data;
    }
}

export const getFoodStands = async ({name, open,}: { name: string | null; open: boolean | null; }) => {
    if (name && open) {
        const foodStands = await axios.get<FoodStand[]>(`/foodStands?name=${name}&open=${open}`);
        return foodStands.data;
    } else if (name) {
        const foodStands = await axios.get<FoodStand[]>(`/foodStands?name=${name}`);
        return foodStands.data;
    } else if (open) {
        const foodStands = await axios.get<FoodStand[]>(`/foodStands?open=${open}`);
        return foodStands.data;
    } else {
        const foodStands = await axios.get<FoodStand[]>(`/foodStands`);
        return foodStands.data;
    }
}

export const getPointsOfInterest = async ({name, open,}: { name: string | null; open: boolean | null; }) => {
    if (name && open) {
        const pointsOfInterest = await axios.get<PointOfInterest[]>(`/pointOfInterest?name=${name}&open=${open}`);
        return pointsOfInterest.data;
    } else if (name) {
        const pointsOfInterest = await axios.get<PointOfInterest[]>(`/pointOfInterest?name=${name}`);
        return pointsOfInterest.data;
    } else if (open) {
        const pointsOfInterest = await axios.get<PointOfInterest[]>(`/pointOfInterest?open=${open}`);
        return pointsOfInterest.data;
    } else {
        const pointsOfInterest = await axios.get<PointOfInterest[]>(`/pointOfInterest`);
        return pointsOfInterest.data;
    }
}

const createTicket = async (newTicket: TicketProps) => {
    try {
        const response = await axios.post<TicketProps>('/tickets/create', newTicket);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}

const createTicketsOneByOne = async (tickets: TicketProps[]) => {
    try {
        const results: T[] = [];
        for (const ticket of tickets) {
            const result = await createTicket(ticket);
            results.push(result);
        }
        return results;
    } catch (error) {
        console.error('Error creating tickets:', error);
        throw error;
    }
};


