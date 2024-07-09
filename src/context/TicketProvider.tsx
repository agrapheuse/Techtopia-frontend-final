import React, {ReactElement, useState} from 'react'
import TicketContext from './TicketContext'

interface WithChildren {
    children: ReactElement | ReactElement[]
}

function TicketProvider({ children }: WithChildren) {
    const [ageType, setAgeType] = useState<string>('');
    const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

    const value = {
        ageType,
        setAgeType,
        toggleDrawer,
        setToggleDrawer,
    }

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    )
}

export default TicketProvider;
