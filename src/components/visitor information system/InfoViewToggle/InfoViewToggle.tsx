import React from 'react';
import {ToggleButtonGroup, ToggleButton} from "@mui/material";
import './InfoViewToggle.css';

interface InfoViewToggleProps {
    toggleState: string;
    setToggleState: (toggleState: string) => void;
}

export default function InfoViewToggle({ toggleState, setToggleState }: InfoViewToggleProps) {
    return (
        <div className="info-view-toggle">
            <ToggleButtonGroup
                color="primary"
                value={toggleState}
                exclusive
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setToggleState(newValue);
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