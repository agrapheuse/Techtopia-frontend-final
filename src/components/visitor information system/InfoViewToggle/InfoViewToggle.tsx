import React from 'react';
import {ToggleButtonGroup, ToggleButton} from "@mui/material";
import './InfoViewToggle.css';

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
                <ToggleButton value="list">List</ToggleButton>
                <ToggleButton value="map">Map</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}