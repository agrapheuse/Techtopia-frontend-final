import React, {useContext} from "react";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import TicketContext from "../../context/TicketContext";

interface TicketCardProps {
    ticketAgeType: string,
    ticketOption: string,
}

export default function TicketCard({ticketAgeType, ticketOption}: TicketCardProps) {
    const { setAgeType, setToggleDrawer } = useContext(TicketContext);
    const handleClick = () => {
        setToggleDrawer(true)
        setAgeType(ticketAgeType);
    };

    return (
        <Card sx={{width: 250}}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography sx={{fontSize: 30}} color="text.secondary" gutterBottom>
                        {ticketAgeType}
                    </Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {ticketOption}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}