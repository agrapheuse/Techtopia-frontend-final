import {useQuery} from 'react-query';
import {getAttractions, getFoodStands, getPointsOfInterest} from "./DataService";

export function useAttractions({ name, open,}: { name: string | null; open: boolean | null; }) {
    const {
        isLoading,
        isError,
        data: attractions
    } = useQuery(["attractions", { name, open }], () => getAttractions({name, open}));

    console.log(attractions)
    return {
        isLoading,
        isError,
        attractions
    }
}

export function useFoodStands({ name, open,}: { name: string | null; open: boolean | null; }) {
    const {
        isLoading,
        isError,
        data: foodStands
    } = useQuery(["foodStands", { name, open }], () => getFoodStands({name, open}));

    console.log(foodStands)
    return {
        isLoading,
        isError,
        foodStands
    }
}

export function usePointsOfInterest({ name, open,}: { name: string | null; open: boolean | null; }) {
    const {
        isLoading,
        isError,
        data: pointsOfInterest
    } = useQuery(["pointsOfInterest", { name, open }], () => getPointsOfInterest({name, open}));

    console.log(pointsOfInterest)
    return {
        isLoading,
        isError,
        pointsOfInterest
    }
}
