import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import SecurityContext from '../../context/SecurityContext'
import { Ticket } from '../../model/Ticket'
import { useTickets } from '../../hooks/CustomHooks'
import { enterPark, exitPark } from '../../services/DataService'

export default function ParkGate() {
    const backgroundImageStyle = {
        backgroundImage: `url(/techtopia-park-gate.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        opacity: '0.7',
        backgroundRepeat: 'repeat-y',
    }

    const { userEmail } = useContext(SecurityContext)
    const { isLoading, isError, tickets, refetch } = useTickets({ email: userEmail || "" })
    const [todaysTicket, setTodaysTicket] = useState<Ticket[]>([])

    useEffect(() => {
        if (!isLoading && !isError && tickets.length > 0) {
            const today = new Date()
            const formattedToday = today.toISOString().split('T')[0]

            const todayTickets = tickets.filter((t) => {
                const ticketDate = new Date(t.date)
                const formattedTicketDate = ticketDate.toISOString().split('T')[0]
                return formattedTicketDate === formattedToday
            })
            setTodaysTicket(todayTickets)
        }
    }, [isError, isLoading, tickets])

    const scanTicket = (uuid: string, status: string) => {
        if (status === 'NEW') {
            enterPark(uuid).then(async (response) => {
                if (response.status === 201) {
                    setTimeout(async () => {
                        await refetch()
                    }, 1500) // Wait for 1.5 seconds to give time for park gate to notify ticket system
                }
            })
        } else if (status === 'ENTERED') {
            exitPark(uuid).then(async (response) => {
                if (response.status === 201) {
                    setTimeout(async () => {
                        await refetch()
                    }, 1500) // same here
                }
            })
        }
    }

    return (
        <div style={backgroundImageStyle}>
            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        padding: '2rem',
                        maxWidth: '500px',
                        width: '100%',
                        opacity: '0.9',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Park Gate
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Scan your tickets to enter the park
                    </Typography>
                    <Box my={2}>
                        <Typography variant="h6">Your Tickets Available Today:</Typography>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : isError ? (
                            <div>Error loading tickets...</div>
                        ) : todaysTicket.length > 0 ? (
                            <Box>
                                {todaysTicket.map((ticket: Ticket) => (
                                    <Paper
                                        key={ticket.uuid.uuid}
                                        elevation={2}
                                        style={{
                                            padding: '1rem',
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        <Typography variant="body1">
                                            <strong>Name:</strong> {ticket.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Ticket Option:</strong> {ticket.ticketOption}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Ticket Age Type:</strong> {ticket.ageType}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Status:</strong> {ticket.status}
                                        </Typography>
                                        {ticket.status === 'NEW' ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => scanTicket(ticket.uuid.uuid, ticket.status)}
                                            >
                                                Enter Park
                                            </Button>
                                        ) : ticket.status === 'ENTERED' ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => scanTicket(ticket.uuid.uuid, ticket.status)}
                                            >
                                                Exit Park
                                            </Button>
                                        ) : (
                                            <Typography variant="body1">
                                                <strong>You have used this ticket</strong>
                                            </Typography>
                                        )}
                                    </Paper>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body1">No tickets found</Typography>
                        )}
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}
