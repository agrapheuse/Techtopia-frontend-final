import React, {useEffect, useState} from "react";
import './MapView.css';
import {useAttractions} from "../../tsx/CustomHooks";
import {Attraction} from "../../model/Attraction";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

export default function MapView() {
    const [nameFilter, setNameFilter] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [open, setOpen] = useState(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [clickedAttraction, setClickedAttraction] = useState<Attraction | null>(null);

    const {isLoading, isError, attractions} = useAttractions({name: nameFilter, type: typeFilter, open: open})

    if (isLoading || !attractions) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    const showInformation = (attraction: Attraction) => {
        setClickedAttraction(attraction);
        setIsDrawerOpen(true);
    }


    return (
        <div className="map-container">
            <img src="/TechtopiaMap.png" alt="map" className="map-image" />
            {attractions.map((attraction: Attraction) => (
                <div
                    key={attraction.uuid}
                    className={`map-marker ${attraction.type.toLowerCase()}`}
                    style={{
                        top: `${attraction.positionY}%`,
                        left: `${attraction.positionX}%`,
                    }}
                    onClick={() => showInformation(attraction)}
                />
            ))}
            {isDrawerOpen && (
                <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <Box>
                        <List>
                            <ListItem>
                                <ListItemText primary={clickedAttraction?.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={clickedAttraction?.description} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={clickedAttraction?.type} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={clickedAttraction?.open ? "Open" : "Closed"} />
                            </ListItem>
                        </List>

                    </Box>
                </Drawer>
            )}
        </div>
    );
}