import React, {createContext} from "react";

export interface ISettingsContext {
    ageType: string
    setAgeType: React.Dispatch<React.SetStateAction<string>>;
    toggleDrawer: boolean;
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default createContext<ISettingsContext>({
    ageType: '',
    setAgeType: () => {},
    toggleDrawer: false,
    setToggleDrawer: () => {},
})