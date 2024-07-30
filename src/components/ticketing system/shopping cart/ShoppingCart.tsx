import React, {useContext, useEffect, useState} from "react";
import TicketContext from "../../../context/TicketContext";
import {Ticket, TicketProps} from "../../../model/Ticket";
import {Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import "./ShoppingCart.css"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import {createTicketsOneByOne} from "../../../tsx/DataService";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

interface TicketStateProps {
    fullName: string,
    age: string,
    gender: string,
    ageType: string | undefined,
    ticketOption: string | undefined;
}

function TicketDrawer() {
    const backgroundImageStyle = {
        backgroundImage: `url(/techtopia-banner.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        opacity: '0.7',
        backgroundRepeat: 'repeat-y',
    };

    const {ticketsInBasket, emptyTicketsInBasket} = useContext(TicketContext);
    const [ticketsState, setTicketsState] = useState<TicketStateProps[]>([]);
    const [date, setDate] = useState<dayjs.Dayjs | null>(null);  // Use Dayjs type
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setTicketsState(ticketsInBasket.map(ticket => ({
            fullName: "",
            age: "",
            gender: "",
            ageType: ticket.ageType,
            ticketOption: ticket.ticketOption
        })));
    }, [ticketsInBasket]);

    const handleInputChange = (index: number, field: keyof TicketStateProps, value: string) => {
        const newTicketsState = [...ticketsState];
        newTicketsState[index][field] = value;
        setTicketsState(newTicketsState);
    };

    const clearTickets = () => {
        setDate(null);
        emptyTicketsInBasket();
        setEmail("");
    }

    const handleSubmit = async () => {
        const tickets: Ticket[] = ticketsState.map(ticketState => ({
            name: ticketState.fullName,
            age: Number(ticketState.age),
            gender: ticketState.gender,
            ticketOption: (ticketState.ticketOption ?? "").toUpperCase(),
            ageType: (ticketState.ageType ?? "").split(" ")[0].toUpperCase(),
            date: date?.toDate() || new Date(),
            email: email
        }));

        const results = await createTicketsOneByOne(tickets);
        if (results.every(r => r === '')) {
            clearTickets();
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={backgroundImageStyle}>
                <div className="ticket-forms-container">
                    {ticketsInBasket.length > 0 ? (
                        ticketsInBasket.map((ticket: TicketProps, index: number) => (
                            <div>
                                <h1>{ticket.ticketOption}, {ticket.ageType}</h1>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel htmlFor={`name-input-${index}`}>Full Name</InputLabel>
                                    <Input
                                        id={`name-input-${index}`}
                                        value={ticketsState[index]?.fullName || ""}
                                        onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                                        aria-describedby={`helper-text-${index}`}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel htmlFor={`age-input-${index}`}>Age</InputLabel>
                                    <Input
                                        id={`age-input-${index}`}
                                        value={ticketsState[index]?.age || ""}
                                        onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                                        aria-describedby={`helper-text-${index}`}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel htmlFor={`gender-input-${index}`}>Gender</InputLabel>
                                    <Select
                                        labelId={`gender-select-label-${index}`}
                                        id={`gender-select-${index}`}
                                        value={ticketsState[index]?.gender || ""}
                                        onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                        label="Gender"
                                    >
                                        <MenuItem value={"M"}>M</MenuItem>
                                        <MenuItem value={"MME"}>Mme</MenuItem>
                                        <MenuItem value={"OTHER"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h3>You currently have no tickets in your basket</h3>
                            <Button
                                variant="contained"
                                endIcon={<SubdirectoryArrowLeftIcon/>}
                                onClick={() => navigate("/")}
                            >
                                Go back to the Home Screen
                            </Button>
                        </div>
                    )}
                    <h1>Final Information</h1>
                    <FormControl fullWidth margin="normal">
                        <DatePicker
                            id="date-input"
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                            label="Entry Date"
                            renderInput={(params) => <Input {...params} />}  // Render the input component
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor={`email-input`}>Email address</InputLabel>
                        <Input
                            id={`email-input`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-describedby={`helper-text`}
                        />
                        <FormHelperText id={`helper-text`}>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <Button
                        type="submit"
                        className="submit-button"
                        variant="contained"
                        endIcon={<ShoppingCartIcon/>}
                        onClick={handleSubmit}
                    >
                        Submit and Buy
                    </Button>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default TicketDrawer;