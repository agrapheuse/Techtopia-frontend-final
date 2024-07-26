import React, {ReactElement, useState} from 'react'
import FilterContext from "./FilterContext";

interface WithChildren {
    children: ReactElement | ReactElement[]
}

function FilterProvider({ children }: WithChildren) {
    const [attractionType, setAttractionType] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [nameFilter, setNameFilter] = useState<string>('')


    const value = {
        attractionType,
        setAttractionType,
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
