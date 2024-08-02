import React, {ReactElement, useState} from 'react'
import FilterContext from "./FilterContext";

interface WithChildren {
    children: ReactElement | ReactElement[]
}

function FilterProvider({ children }: WithChildren) {
    const [poiType, setPoiType] = useState<string>('all')
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [nameFilter, setNameFilter] = useState<string>('')


    const value = {
        poiType,
        setPoiType,
        isOpen,
        setIsOpen,
        nameFilter,
        setNameFilter
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider;
