import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import {Link} from "react-router-dom";
import React from "react";

interface NavigationProps {
    isOpen: boolean
    onClose: () => void
}

export function Navigation({ isOpen, onClose }: NavigationProps) {
    return (
        <div>
            <Drawer open={isOpen} onClose={onClose}>
                <List sx={{ width: 200 }}>
                    {[
                        { label: 'Menu', link: '/', icon: <HomeIcon /> },
                        { label: 'Map', link: '/visitorInformation', icon: <MapIcon /> },
                        { label: 'Tickets', link: '/tickets', icon: <LocalActivityIcon /> },
                        { label: 'Park Gate', link: '/parkGate', icon: <DoorSlidingIcon /> },
                    ].map((menuItem) => (
                        <ListItem disableGutters key={menuItem.link}>
                            <ListItemButton component={Link} to={menuItem.link} onClick={onClose}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}
