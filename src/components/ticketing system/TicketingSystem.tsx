import React, {useContext, useState} from "react";
import "./TicketingSystem.css"
import TicketCard from "./TicketCard";
import {FormControl, MenuItem, InputLabel, Select, SelectChangeEvent, Button, IconButton, Badge} from "@mui/material";
import TicketContext from "../../context/TicketContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {TicketProps} from "../../model/Ticket";
import {useNavigate} from "react-router-dom";

interface TicketItem {
    ticketAgeType: string;
    ticketOption: string;
}

export default function TicketingSystem() {
    const {
        ageType,
        setAgeType,
        toggleDrawer,
        setToggleDrawer,
        ticketsInBasket,
        addTicketToBasket
    } = useContext(TicketContext);
    const [ticketOption, setTicketOption] = useState('');
    const navigate = useNavigate();

    const backgroundImageStyle = {
        backgroundImage: `url(/techtopia-banner.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        opacity: '0.7',
    };

    const ticketItems: TicketItem[] = [
        {ticketAgeType: 'Baby (0-3)', ticketOption: 'FREE'},
        {ticketAgeType: 'Child (4-12)', ticketOption: 'NORMAL: 30$, VIP: 50$'},
        {ticketAgeType: 'Teen (13-19)', ticketOption: 'NORMAL: 60$, VIP: 100$'},
        {ticketAgeType: 'Adult (20-65)', ticketOption: 'NORMAL: 100$, VIP: 220$'},
        {ticketAgeType: 'Teen (65+)', ticketOption: 'FREE'},
    ];

    const handleChange = (event: SelectChangeEvent) => {
        setTicketOption(event.target.value as string);
    };

    const handleSubmit = () => {
        if (ageType && ticketOption) {
            const ticket: TicketProps = {ageType, ticketOption}
            addTicketToBasket(ticket)
            setAgeType('')
            setTicketOption('')
            setToggleDrawer(false)
        }
    }

    return (
        <div style={backgroundImageStyle}>
            <IconButton className="shopping-cart-icon" onClick={() => navigate("/tickets/cart")}>
                <Badge badgeContent={ticketsInBasket.length} color="primary"
                       anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
            <div className="title">
                <h1>Tickets</h1>
            </div>
            <div className="ticket-info-container">
                <h1>Ticket Prices</h1>
                <div className="ticket-cards-container">
                    {ticketItems.map((item) => (
                        <TicketCard ticketAgeType={item.ticketAgeType} ticketOption={item.ticketOption}/>
                    ))}
                </div>
            </div>

            {toggleDrawer &&
                <div className="add-to-basket-drawer">
                    <h2>{ageType}</h2>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ticket Option</InputLabel>
                        <Select
                            sx={{margin: 1}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ticketOption}
                            label="Ticket Option"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Normal"}>Normal</MenuItem>
                            <MenuItem value={"VIP"}>VIP</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        className="submit-button"
                        variant="contained"
                        endIcon={<ShoppingCartIcon/>}
                        onClick={handleSubmit}
                    >
                        Add To Basket
                    </Button>
                </div>
            }
        </div>
    );
}
