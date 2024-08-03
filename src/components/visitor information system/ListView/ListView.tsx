import React, { useContext, useState } from 'react'
import { Container, Typography, Grid, Button } from '@mui/material'
import { usePointsOfInterest } from '../../../hooks/CustomHooks'
import FilterContext from '../../../context/FilterContext'
import { Attraction } from '../../../model/Attraction'
import { FoodStand } from '../../../model/FoodStand'
import POIInformationDrawer from '../POIInformationDrawer'

interface ListViewProps {
    nameFilter: string
}

export default function ListView({ nameFilter }: ListViewProps) {
    const { poiType, isOpen } = useContext(FilterContext)
    const { isLoading, isError, attractions, foodStands } = usePointsOfInterest({ name: nameFilter, open: isOpen })
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [clickedPOI, setClickedPOI] = useState<Attraction | FoodStand | null>(null)

    const [showingObject, setShowingObject] = useState<string>('')

    if (isLoading || !attractions || !foodStands) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }

    let pointsOfInterest: (Attraction | FoodStand)[] = []
    if (poiType === 'all') {
        pointsOfInterest = [...attractions, ...foodStands]
    } else if (poiType === 'attractions') {
        pointsOfInterest = attractions
    } else if (poiType === 'foodStands') {
        pointsOfInterest = foodStands
    }

    const handleClick = (poi: Attraction | FoodStand) => {
        setClickedPOI(poi)
        setIsDrawerOpen(true)
        if ((poi as Attraction).minHeight !== undefined) {
            setShowingObject('Attraction')
        } else {
            setShowingObject('FoodStand')
        }
    }

    return (
        <Container
            style={{
                padding: '2rem',
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                {pointsOfInterest.map((poi, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Button
                            onClick={() => handleClick(poi)}
                            sx={{
                                width: '100%',
                                height: '250px',
                                padding: 0,
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundImage: `url(${poi.picturePath})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                                color: 'white',
                                textAlign: 'center',
                                overflow: 'hidden',
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    opacity: 0.9,
                                },
                            }}
                            disableRipple
                        >
                            <Typography
                                variant="h6"
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    right: '0',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    padding: '0.5rem',
                                }}
                            >
                                {poi.name}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <POIInformationDrawer
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                clickedPOI={clickedPOI}
                showingObject={showingObject}
            ></POIInformationDrawer>
        </Container>
    )
}
