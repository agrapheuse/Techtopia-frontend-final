import {useQuery} from 'react-query';
import {getAttractions} from "./DataService";

export function useAttractions({ name, type, open,}: { name: string; type: string; open: boolean; }) {
    const {
        isLoading,
        isError,
        data: attractions
    } = useQuery(["attractions", { name, type, open }], () => getAttractions({name, type, open}));

    console.log(attractions)
    return {
        isLoading,
        isError,
        attractions
    }
}
