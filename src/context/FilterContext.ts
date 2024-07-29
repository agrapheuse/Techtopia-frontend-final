import React, {createContext} from "react";

export interface ISettingsContext {
    attractionType: string;
    setAttractionType: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    nameFilter: string;
    setNameFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default createContext<ISettingsContext>({
    attractionType: 'all',
    setAttractionType: () => {},
    isOpen: true,
    setIsOpen: () => {},
    nameFilter: '',
    setNameFilter: () => {},
})