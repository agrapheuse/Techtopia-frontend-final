import {
    Box,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from '@mui/material'
import React, { useContext } from 'react'
import { useTickets } from '../../hooks/CustomHooks'
import SecurityContext from '../../context/SecurityContext'
import { Ticket } from '../../model/Ticket'
import { scanTicket } from '../../services/DataService'

export interface SimpleDialogProps {
    open: boolean
    onClose: () => void
    poiUUID: string | undefined
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open , poiUUID} = props
    const { userEmail } = useContext(SecurityContext)
    const { isLoading, isError, tickets } = useTickets({ email: userEmail || '', status: 'ENTERED' })

    const handleListItemClick = async (ticketId: string) => {
        try {
            if (!poiUUID) alert("an error occurred while scanning ticket");
            else {
                const result = await scanTicket(ticketId, poiUUID)
                if (result.status !== 201) alert("an error occurred while scanning ticket");
            }
            onClose();
        } catch (e) {
            alert("an error occurred, " + e);
        }
    }

    const renderContent = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error loading tickets...</div>
        }

        if (tickets.length === 0) {
            return <div>You don't have any tickets that are currently in the park...</div>
        }

        return tickets.map((ticket: Ticket) => (
            <ListItem disableGutters key={ticket.uuid.uuid}>
                <ListItemButton onClick={() => handleListItemClick(ticket.uuid.uuid)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Typography variant="h6" noWrap>
                            {ticket.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" noWrap>
                            {ticket.uuid.uuid}
                        </Typography>
                    </Box>
                </ListItemButton>
            </ListItem>
        ))
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {renderContent()}
            </List>
        </Dialog>
    )
}

export default SimpleDialog
