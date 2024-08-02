import React, { useContext } from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import SecurityContext from '../../context/SecurityContext'
import { Ticket } from '../../model/Ticket'
import { useTickets } from '../../hooks/CustomHooks'

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
    const { isLoading, isError, tickets } = useTickets({ email: userEmail })

    const scanTicket = (uuid: string) => {

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
                        ) : tickets.length > 0 ? (
                            <Box>
                                {tickets.map((ticket: Ticket) => (
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
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => scanTicket(ticket.uuid.uuid)}
                                        >
                                            Scan Ticket
                                        </Button>
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
