import React, { useContext } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import TicketContext from "../../context/TicketContext";

interface TicketCardProps {
    ticketAgeType: string;
    ticketOption: string;
}

export default function TicketCard({ ticketAgeType, ticketOption }: TicketCardProps) {
    const { setAgeType, setToggleDrawer } = useContext(TicketContext);
    const handleClick = () => {
        setToggleDrawer(true);
        setAgeType(ticketAgeType);
    };

    return (
        <Card sx={{ width: 250, margin: 1, boxShadow: 2, borderRadius: 2, transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                        {ticketAgeType}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {/* Optionally add some more content here */}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {ticketOption}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}