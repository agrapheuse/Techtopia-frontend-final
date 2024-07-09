import React, {useState} from "react";
import './MapView.css';
import {usePointsOfInterest} from "../../../tsx/CustomHooks";
import {Attraction} from "../../../model/Attraction";
import {Box, Drawer, List, ListItem, ListItemText} from "@mui/material";
import {FoodStand} from "../../../model/FoodStand";

export default function MapView() {
    const [nameFilter, setNameFilter] = useState<string>("");
    const [open, setOpen] = useState(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [clickedPOI, setClickedPOI] = useState<Attraction | FoodStand | null>(null);

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
    }

    return (
        <div className="map-container">
            <img src="/TechtopiaMap.png" alt="map" className="map-image" />
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
                <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <Box>
                        <List>
                            <ListItem>
                                <ListItemText primary={clickedPOI?.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={clickedPOI?.description} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={clickedPOI?.constructor.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={clickedPOI?.open ? "Open" : "Closed"} />
                            </ListItem>
                        </List>

                    </Box>
                </Drawer>
            )}
        </div>
    );
}