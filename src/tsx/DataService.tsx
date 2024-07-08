import axios from 'axios';
import {Attraction} from "../model/Attraction";

axios.defaults.baseURL = 'http://localhost:8091';

export const getAttractions = async ({name, type, open,}: { name: string; type: string; open: boolean; }) => {
    if (name === "" && type === "all" && !open) {
        const attractions = await axios.get<Attraction[]>(`/attractions`);
        return attractions.data;
    }
    if (name !== "" && type === 'all' && !open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/name/${name}`);
        return attractions.data;
    }
    if (name === "" && type !== 'all' && !open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/type/${type}`);
        return attractions.data;
    }
    if (name !== "" && type !== 'all' && !open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/name/${name}/type/${type}`);
        return attractions.data;
    }
    if (name === "" && type === 'all' && open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/open`);
        return attractions.data;
    }
    if (name === "" && type !== 'all' && open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/type/${type}/open`);
        return attractions.data;
    }
    if (name !== "" && type === 'all' && open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/name/${name}/open`);
        return attractions.data;
    }
    if (name !== "" && type !== 'all' && open) {
        const attractions = await axios.get<Attraction[]>(`/attractions/name/${name}/type/${type}/open`);
        return attractions.data;
    }
}
