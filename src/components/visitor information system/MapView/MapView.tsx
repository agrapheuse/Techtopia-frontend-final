import React, {useState} from "react";
import './MapView.css';
import {usePointsOfInterest} from "../../../tsx/CustomHooks";
import {Attraction} from "../../../model/Attraction";
import {Box, Drawer, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import {FoodStand} from "../../../model/FoodStand";
import CloseIcon from '@mui/icons-material/Close';

export default function MapView() {
    const [nameFilter, setNameFilter] = useState<string>("");
    const [open, setOpen] = useState(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [clickedPOI, setClickedPOI] = useState<Attraction | FoodStand | null>(null);

    const [showingObject, setShowingObject] = useState<string>("")

    const {isLoading, isError, attractions, foodStands} = usePointsOfInterest({name: nameFilter, open: open})

    if (isLoading || !attractions || !foodStands) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    const showInformation = (poi: Attraction | FoodStand) => {
        setClickedPOI(poi);
        setIsDrawerOpen(true);
        if ((poi as Attraction).minAge !== undefined) {
            setShowingObject("Attraction");
        } else {
            setShowingObject("FoodStand");
        }
    }

    return (
        <div className="map-container">
            <img src="/TechtopiaMap.png" alt="map" className="map-image"/>
            {attractions.map((attraction: Attraction) => (
                <div
                    key={attraction.uuid}
                    className={`map-marker ride`}
                    style={{
                        top: `${attraction.posY}%`,
                        left: `${attraction.posX}%`,
                    }}
                    onClick={() => showInformation(attraction)}
                />
            ))}
            {foodStands.map((foodStand: FoodStand) => (
                <div
                    key={foodStand.uuid}
                    className={`map-marker food`}
                    style={{
                        top: `${foodStand.posY}%`,
                        left: `${foodStand.posX}%`,
                    }}
                    onClick={() => showInformation(foodStand)}
                />
            ))}
            {isDrawerOpen && (
                <Drawer
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            maxWidth: 400,
                            width: '100%'
                        }
                    }}
                >
                    <Box sx={{padding: 2}}>
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
                            <CloseIcon/>
                        </IconButton>
                        <List>
                            <ListItem key="name">
                                <Typography variant="h6" component="div" sx={{fontWeight: 'bold'}}>
                                    {clickedPOI?.name}: {showingObject}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    {clickedPOI?.description}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    It is currently {clickedPOI?.open ? "open" : "closed"}
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            )}
        </div>
    );
}