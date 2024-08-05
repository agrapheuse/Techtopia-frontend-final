import React, { useContext, useEffect, useState } from 'react'
import {
    Box,
    Button,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Attraction } from '../../model/Attraction'
import { FoodStand } from '../../model/FoodStand'
import { changeOpenStatus } from '../../services/DataService'
import SecurityContext from '../../context/SecurityContext'
import { UseQueryResult } from 'react-query'

interface POIInformationDrawerProps {
    isDrawerOpen: boolean
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    clickedPOI: Attraction | FoodStand | null
    showingObject: string
    refetch: UseQueryResult["refetch"];
}

function POIInformationDrawer({ isDrawerOpen, setIsDrawerOpen, clickedPOI, showingObject, refetch }: POIInformationDrawerProps) {
    const [openStatus, setOpenStatus] = useState<string>('')
    const [originalOpenStatus, setOriginalOpenStatus] = useState<string>('')
    const {userRole} = useContext(SecurityContext)

    useEffect(() => {
        if (clickedPOI) {
            const status = clickedPOI.open ? 'open' : 'close'
            setOpenStatus(status)
            setOriginalOpenStatus(status)
        }
    }, [clickedPOI])

    const saveChanges = async () => {
        if (clickedPOI) {
            await changeOpenStatus(clickedPOI.uuid.uuid, openStatus === 'open')
            setOriginalOpenStatus(openStatus)
            await refetch();
        }
    }

    return (
        <>
            {isDrawerOpen && (
                <Drawer
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            maxWidth: 400,
                            width: '100%',
                        },
                    }}
                >
                    <Box sx={{ padding: 2 }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setIsDrawerOpen(false)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                zIndex: 100,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <List>
                            <ListItem key="name">
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                    {clickedPOI?.name}: {showingObject}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">{clickedPOI?.description}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    It is currently {clickedPOI?.open ? 'open' : 'closed'}
                                </Typography>
                            </ListItem>
                        </List>
                        {clickedPOI?.picturePath && (
                            <Box
                                component="img"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    marginBottom: 2,
                                }}
                                alt={`${clickedPOI?.name} image`}
                                src={clickedPOI?.picturePath}
                            />
                        )}
                        {userRole?.includes('admin') && (
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Change Open Status</InputLabel>
                                    <Select
                                        value={openStatus}
                                        label="Change Open Status"
                                        onChange={(e) => setOpenStatus(e.target.value)}
                                    >
                                        <MenuItem value={'open'}>Open</MenuItem>
                                        <MenuItem value={'close'}>Close</MenuItem>
                                    </Select>
                                </FormControl>
                                {originalOpenStatus !== openStatus && (
                                    <Button
                                        variant="contained"
                                        onClick={saveChanges}
                                        size="large"
                                        sx={{
                                            padding: '12px 24px',
                                            fontSize: '18px',
                                            backgroundColor: '#f4ecd7',
                                            color: '#1a1a17',
                                            zIndex: '1000',
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>
                </Drawer>
            )}
        </>
    )
}

export default POIInformationDrawer
