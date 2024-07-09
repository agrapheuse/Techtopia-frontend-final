import {useState} from 'react';

const useToggleTicketOptionDrawer = () => {
    const [toggleDrawer, setToggleDrawer] = useState(false)

    return { toggleDrawer, setToggleDrawer };
};

export default useToggleTicketOptionDrawer;
