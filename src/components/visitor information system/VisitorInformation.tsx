import React, {useContext, useState} from "react";
import InfoViewToggle from "./InfoViewToggle/InfoViewToggle";
import ListView from "./ListView/ListView";
import MapView from "./MapView/MapView";
import "./VisitorInformation.css";
import {
    Box,
    Button, Checkbox, Divider,
    Drawer,
    FormControlLabel,
    IconButton, TextField,
    ToggleButton,
    ToggleButtonGroup, Typography,
} from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import FilterContext from "../../context/FilterContext";
import useDebounce from "../../hooks/useDebounce";


export default function VisitorInformation() {
    const [toggleStateList, setToggleStateList] = useState("map");
    const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
    const {poiType, setPoiType, isOpen, setIsOpen, nameFilter, setNameFilter} = useContext(FilterContext);
    const debouncedNameFilter = useDebounce(nameFilter, 500);

    const handleTopDrawerOpen = () => {
        setIsTopDrawerOpen(true);
    };

    const handleTopDrawerClose = () => {
        setIsTopDrawerOpen(false);
    };

    const handleResetFilters = () => {
        setPoiType("all");
        setIsOpen(false);
        setNameFilter("");
    };

    return (
        <div className="info-view-page-container">
            <Box sx={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)' }}>
                <InfoViewToggle toggleStateList={toggleStateList} setToggleStateList={setToggleStateList} />
            </Box>
            <div className="info-view-content">
                {toggleStateList === "list" ? (
                    <div className="list-view-container">
                        <ListView nameFilter={debouncedNameFilter} />
                    </div>
                ) : (
                    <div className="map-view-container">
                        <MapView nameFilter={debouncedNameFilter} />
                    </div>
                )}
            </div>
            <Box sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
                <Button
                    variant="contained"
                    onClick={handleTopDrawerOpen}
                    size="large"
                    sx={{
                        padding: '12px 24px',
                        fontSize: '18px',
                        backgroundColor: '#f4ecd7',
                        color: '#1a1a17',
                        zIndex: '1000',
                    }}
                >
                    Open Filters
                </Button>
            </Box>
            <Drawer
                anchor="bottom"
                open={isTopDrawerOpen}
                onClose={handleTopDrawerClose}
                PaperProps={{
                    sx: {
                        height: 'auto',
                        maxHeight: '70vh',
                    }
                }}
            >
                <Box sx={{ padding: 2, position: 'relative' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleTopDrawerClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 100,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" align="center" gutterBottom>
                        Filters
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <ToggleButtonGroup
                            color="primary"
                            value={poiType}
                            exclusive
                            onChange={(_event, newValue) => {
                                if (newValue !== null) {
                                    setPoiType(newValue);
                                }
                            }}
                            aria-label="Platform"
                        >
                            <ToggleButton value="attractions">Attractions</ToggleButton>
                            <ToggleButton value="foodStands">Food Stands</ToggleButton>
                            <ToggleButton value="all">All</ToggleButton>
                        </ToggleButtonGroup>
                        <FormControlLabel
                            control={<Checkbox checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />}
                            label="Show Only Open"
                        />
                        <TextField
                            label="Name Filter"
                            variant="outlined"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            sx={{ width: '40%' }}
                        />
                        <Button variant="contained" onClick={handleResetFilters} sx={{ marginTop: 2 }}>
                            Reset Filters
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}
