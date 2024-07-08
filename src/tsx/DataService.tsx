import axios from 'axios';
import {Attraction} from "../model/Attraction";

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
        const attractions = await axios.get<Attraction[]>(`/foodStands?name=${name}&open=${open}`);
        return attractions.data;
    } else if (name) {
        const attractions = await axios.get<Attraction[]>(`/foodStands?name=${name}`);
        return attractions.data;
    } else if (open) {
        const attractions = await axios.get<Attraction[]>(`/foodStands?open=${open}`);
        return attractions.data;
    } else {
        const attractions = await axios.get<Attraction[]>(`/foodStands`);
        return attractions.data;
    }
}

export const getPointsOfInterest = async ({name, open,}: { name: string | null; open: boolean | null; }) => {
    if (name && open) {
        const attractions = await axios.get<Attraction[]>(`/pointOfInterest?name=${name}&open=${open}`);
        return attractions.data;
    } else if (name) {
        const attractions = await axios.get<Attraction[]>(`/pointOfInterest?name=${name}`);
        return attractions.data;
    } else if (open) {
        const attractions = await axios.get<Attraction[]>(`/pointOfInterest?open=${open}`);
        return attractions.data;
    } else {
        const attractions = await axios.get<Attraction[]>(`/pointOfInterest`);
        return attractions.data;
    }
}

