import React, { useContext, useEffect, useState } from 'react'
import TicketContext from '../../../context/TicketContext'
import { Ticket, TicketProps } from '../../../model/Ticket'
import {
    Button,
    Card,
    CardContent,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField, TextFieldProps,
    Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './ShoppingCart.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft'
import { createTicketsOneByOne } from '../../../services/DataService'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import SecurityContext from '../../../context/SecurityContext'

interface TicketStateProps {
    fullName: string
    age: string
    gender: string
    ageType: string | undefined
    ticketOption: string | undefined
}

const TicketForm = ({ ticket, index, ticketsState, handleInputChange }) => (
    <Card variant="outlined" className="ticket-card">
        <CardContent>
            <Typography variant="h5">
                {ticket.ticketOption}, {ticket.ageType}
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor={`name-input-${index}`}>Full Name</InputLabel>
                <Input
                    id={`name-input-${index}`}
                    value={ticketsState[index]?.fullName || ''}
                    onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                    aria-describedby={`helper-text-${index}`}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor={`age-input-${index}`}>Age</InputLabel>
                <Input
                    id={`age-input-${index}`}
                    value={ticketsState[index]?.age || ''}
                    onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                    aria-describedby={`helper-text-${index}`}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor={`gender-input-${index}`}>Gender</InputLabel>
                <Select
                    labelId={`gender-select-label-${index}`}
                    id={`gender-select-${index}`}
                    value={ticketsState[index]?.gender || ''}
                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                    label="Gender"
                >
                    <MenuItem value={'M'}>M</MenuItem>
                    <MenuItem value={'MME'}>Mme</MenuItem>
                    <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>
            </FormControl>
        </CardContent>
    </Card>
)

function TicketDrawer() {
    const backgroundImageStyle = {
        backgroundImage: `url(/techtopia-banner.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        opacity: '0.7',
        backgroundRepeat: 'repeat-y',
    }

    const { ticketsInBasket, emptyTicketsInBasket } = useContext(TicketContext)
    const [ticketsState, setTicketsState] = useState<TicketStateProps[]>([])
    const [date, setDate] = useState<dayjs.Dayjs | null>(null)
    const { userEmail } = useContext(SecurityContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setTicketsState(
            ticketsInBasket.map((ticket) => ({
                fullName: '',
                age: '',
                gender: '',
                ageType: ticket.ageType,
                ticketOption: ticket.ticketOption,
            }))
        )
    }, [ticketsInBasket])

    useEffect(() => {
        const total = ticketsInBasket.reduce((sum, ticket) => sum + parseFloat(ticket.price || '0'), 0)
        setTotalPrice(total)
    }, [ticketsInBasket])

    const handleInputChange = (index: number, field: keyof TicketStateProps, value: string) => {
        const newTicketsState = [...ticketsState]
        newTicketsState[index][field] = value
        setTicketsState(newTicketsState)
    }

    const clearTickets = () => {
        setDate(null)
        emptyTicketsInBasket()
    }

    const verifyForm = (tickets: TicketStateProps[]): boolean => {
        for (const ticket of tickets) {
            if (ticket.fullName.length <= 1) {
                setErrorMessage(`Full name too short: ${ticket.fullName}`);
                return false;
            }
            const ageLimit = ticket.ageType?.split(' ')[1].toUpperCase().slice(1, -1)
            const [minAge, maxAge] = ageLimit?.split('-').map(Number);
            if (Number(ticket.age) <= minAge || Number(ticket.age) >= maxAge) {
                setErrorMessage(`Age must be corresponding with age bracket for the specific ticket (for person ${ticket.fullName})`);
                return false;
            }
        }
        const todayDate = dayjs().startOf('day');
        if (!date || date.isBefore(todayDate, 'day')) {
            setErrorMessage(`The date must be in the future`);
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSubmit = async () => {
        if (userEmail === undefined) {
            alert('You need to be logged in to buy a ticket !')
        } else {
            const correct = verifyForm(ticketsState)
            if (correct) {
                const tickets: Ticket[] = ticketsState.map((ticketState) => ({
                    name: ticketState.fullName,
                    age: Number(ticketState.age),
                    gender: ticketState.gender,
                    ticketOption: (ticketState.ticketOption ?? '').toUpperCase(),
                    ageType: (ticketState.ageType ?? '').split(' ')[0].toUpperCase(),
                    date: date?.toDate() || new Date(),
                    email: userEmail,
                }))

                try {
                    const responses = await createTicketsOneByOne(tickets)
                    const failedResponses = responses.filter(r => r.status !== 201)

                    if (failedResponses.length > 0) {
                        setErrorMessage('Some tickets could not be processed. Please visit the my account page to see which ticket was processed.');
                    } else {
                        clearTickets()
                    }
                } catch (error) {
                    setErrorMessage('An error occurred while processing your request. Please try again.');
                }
            }
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={backgroundImageStyle}>
                <div className="ticket-forms-container">
                    {ticketsInBasket.length > 0 ? (
                        ticketsInBasket.map((ticket: TicketProps, index: number) => (
                            <TicketForm
                                key={index}
                                ticket={ticket}
                                index={index}
                                ticketsState={ticketsState}
                                handleInputChange={handleInputChange}
                            />
                        ))
                    ) : (
                        <div>
                            <Typography variant="h6">You currently have no tickets in your basket</Typography>
                            <Button
                                variant="contained"
                                endIcon={<SubdirectoryArrowLeftIcon />}
                                onClick={() => navigate('/')}
                            >
                                Go back to the Home Screen
                            </Button>
                        </div>
                    )}
                    {ticketsInBasket.length > 0 && (
                        <>
                            <Typography variant="h4">Final Information</Typography>
                            <FormControl fullWidth margin="normal">
                                <DatePicker
                                    value={date}
                                    onChange={(newDate) => setDate(newDate)}
                                    label="Entry Date"
                                    renderInput={(params: TextFieldProps) => <TextField {...params} />}
                                />
                            </FormControl>
                            <Typography
                                variant="body1"
                                margin="normal"
                                sx={{
                                    padding: 1,
                                }}
                            >
                                The ticket will be saved to your account's email: {userEmail}
                            </Typography>
                            <Button
                                type="submit"
                                className="submit-button"
                                variant="contained"
                                endIcon={<ShoppingCartIcon />}
                                onClick={handleSubmit}
                            >
                                Submit and Buy
                            </Button>
                            {errorMessage !== '' && (
                                <Typography variant="body1" className="error-message">
                                    {errorMessage}
                                </Typography>
                            )}
                            <div className="total-price">
                                <Typography variant="h6" margin="normal" sx={{ padding: 1 }}>
                                    Total Price: ${totalPrice}
                                </Typography>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </LocalizationProvider>
    )
}

export default TicketDrawer
