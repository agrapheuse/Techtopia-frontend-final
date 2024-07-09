import {useState} from 'react';

const useTicketOption = () => {
    const [ageType, setAgeType] = useState('')

    return { ageType, setAgeType };
};

export default useTicketOption;
