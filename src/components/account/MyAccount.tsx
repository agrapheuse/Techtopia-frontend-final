import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import SecurityContext from '../../context/SecurityContext'
import { useTickets } from '../../hooks/CustomHooks'
import { Ticket } from '../../model/Ticket'

export default function MyAccount() {
    const backgroundImageStyle = {
        backgroundImage: `url(/my-account-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        opacity: '0.7',
        backgroundRepeat: 'repeat-y',
    }

    const { loggedInUser, userEmail, userRole, logout } = useContext(SecurityContext)
    const { isLoading, isError, tickets } = useTickets({ email: userEmail || "" })

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
                    <Typography variant="h4" gutterBottom>
                        My Account
                    </Typography>
                    <Box my={2}>
                        <Typography variant="h6">Name:</Typography>
                        <Typography variant="body1">{loggedInUser}</Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h6">Email:</Typography>
                        <Typography variant="body1">{userEmail}</Typography>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h6">Roles:</Typography>
                        <Typography variant="body1">{userRole}</Typography>
                    </Box>
                    <Box my={2}>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logout}>
                            Log out
                        </Button>
                    </Box>
                    <Box my={2}>
                        <Typography variant="h6">Your Tickets:</Typography>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : isError ? (
                            <div>Error loading tickets...</div>
                        ) : (
                            tickets.length > 0 ? (
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
                                                <strong>Ticket ID:</strong> {ticket.uuid.uuid}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Date:</strong> {`${ticket.date}`}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Name:</strong> {ticket.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Ticket Option:</strong> {ticket.ticketOption}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Ticket Age Type:</strong> {ticket.ageType}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body1">No tickets found</Typography>
                            )
                        )}
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}
