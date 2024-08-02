import React, {createContext} from "react";

export interface ISettingsContext {
    poiType: string;
    setPoiType: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    nameFilter: string;
    setNameFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default createContext<ISettingsContext>({
    poiType: 'all',
    setPoiType: () => {},
    isOpen: true,
    setIsOpen: () => {},
    nameFilter: '',
    setNameFilter: () => {},
})