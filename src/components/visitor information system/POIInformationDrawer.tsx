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
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Attraction } from '../../model/Attraction'
import { FoodStand } from '../../model/FoodStand'
import { changeOpenStatus, updateStaffMembers } from '../../services/DataService'
import SecurityContext from '../../context/SecurityContext'
import { UseQueryResult } from 'react-query'
import { useStaffMembers } from '../../hooks/CustomHooks'
import { StaffMember } from '../../model/StaffMember'

interface POIInformationDrawerProps {
    isDrawerOpen: boolean
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    clickedPOI: Attraction | FoodStand | null
    showingObject: string
    refetch: UseQueryResult['refetch']
}

function POIInformationDrawer({
    isDrawerOpen,
    setIsDrawerOpen,
    clickedPOI,
    showingObject,
    refetch,
}: POIInformationDrawerProps) {
    const [openStatus, setOpenStatus] = useState<string>('')
    const [originalOpenStatus, setOriginalOpenStatus] = useState<string>('')
    const { userRole } = useContext(SecurityContext)
    const [selectedStaffMembers, setSelectedStaffMembers] = useState<string[]>([])
    const [availableStaffMembers, setAvailableStaffMembers] = useState<StaffMember[]>([])
    const [originalSelectedStaffMembers, setOriginalSelectedStaffMembers] = useState<string[]>([])
    const {
        isLoading: isLoadingAllStaffMembers,
        isError: isErrorAllStaffMembers,
        staffMembers: allStaffMembers,
    } = useStaffMembers({ uuid: null })
    const {
        isLoading: isLoadingPOIsStaffMembers,
        isError: isErrorPOIsStaffMembers,
        staffMembers: POIsStaffMembers,
    } = useStaffMembers({ uuid: clickedPOI?.uuid.uuid || null })

    useEffect(() => {
        if (!isLoadingPOIsStaffMembers && !isErrorPOIsStaffMembers) {
            const newSelectedStaffMembers = POIsStaffMembers.map((member) => member.uuid.uuid)
            setSelectedStaffMembers(newSelectedStaffMembers)
            setOriginalSelectedStaffMembers(newSelectedStaffMembers)
        }
    }, [isLoadingPOIsStaffMembers, isErrorPOIsStaffMembers, POIsStaffMembers])

    useEffect(() => {
        if (!isLoadingAllStaffMembers && !isErrorAllStaffMembers) {
            const available = allStaffMembers.filter((staff) => !staff.poiUUID || staff.poiUUID.uuid === null)
            setAvailableStaffMembers([...available, ...POIsStaffMembers])
        }
    }, [isLoadingAllStaffMembers, isErrorAllStaffMembers, allStaffMembers, POIsStaffMembers])

    useEffect(() => {
        if (clickedPOI) {
            const status = clickedPOI.open ? 'open' : 'close'
            setOpenStatus(status)
            setOriginalOpenStatus(status)
        }
    }, [clickedPOI])

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newStaffMembers: string[]) => {
        setSelectedStaffMembers(newStaffMembers)
    }

    const saveChanges = async () => {
        if (clickedPOI) {
            if (originalOpenStatus !== openStatus) {
                await changeOpenStatus(clickedPOI.uuid.uuid, openStatus === 'open')
                setOriginalOpenStatus(openStatus)
                await refetch()
            } else if (originalSelectedStaffMembers.toString() !== selectedStaffMembers.toString()) {
                await updateStaffMembers(clickedPOI.uuid.uuid, selectedStaffMembers)
                setOriginalSelectedStaffMembers(selectedStaffMembers)
                await refetch()
            }
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
                            <ListItem>
                                <Typography variant="body1">
                                    {showingObject === 'Attraction'
                                        ? `Minimum height to enter: ${(clickedPOI as Attraction).minHeight}`
                                        : `Menu: ${(clickedPOI as FoodStand).menu}`}
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
                                <FormControl fullWidth sx={{ marginTop: 2 }}>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                        Assign Staff Members
                                    </Typography>
                                    <ToggleButtonGroup
                                        orientation="vertical"
                                        value={selectedStaffMembers}
                                        onChange={handleChange}
                                        aria-label="assign staff members"
                                    >
                                        {isLoadingAllStaffMembers ? (
                                            <div>Loading...</div>
                                        ) : isErrorAllStaffMembers ? (
                                            <div>Error loading staff members...</div>
                                        ) : allStaffMembers.length > 0 ? (
                                            availableStaffMembers.map((staffMember: StaffMember) => (
                                                <ToggleButton
                                                    key={staffMember.uuid.uuid}
                                                    value={staffMember.uuid.uuid}
                                                    aria-label={staffMember.name}
                                                >
                                                    {staffMember.name}
                                                </ToggleButton>
                                            ))
                                        ) : (
                                            <div>No staff members available</div>
                                        )}
                                    </ToggleButtonGroup>
                                </FormControl>
                                {(originalOpenStatus !== openStatus ||
                                    originalSelectedStaffMembers.toString() !== selectedStaffMembers.toString()) && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
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
                                    </Box>
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
