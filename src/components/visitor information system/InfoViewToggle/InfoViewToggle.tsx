import React from 'react';
import {ToggleButtonGroup, ToggleButton} from "@mui/material";
import './InfoViewToggle.css';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';

interface InfoViewToggleProps {
    toggleStateList: string;
    setToggleStateList: (toggleStateList: string) => void;
}

export default function InfoViewToggle({ toggleStateList, setToggleStateList }: InfoViewToggleProps) {
    return (
        <div className="info-view-toggle">
            <ToggleButtonGroup
                color="primary"
                value={toggleStateList}
                exclusive
                onChange={(_event, newValue) => {
                    if (newValue !== null) {
                        setToggleStateList(newValue);
                    }
                }}
                aria-label="Platform"
            >
                <ToggleButton value="list" aria-label="list view">
                    <ListIcon />
                </ToggleButton>
                <ToggleButton value="map" aria-label="map view">
                    <MapIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}