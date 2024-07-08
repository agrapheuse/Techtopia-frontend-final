import React from "react";
import {TableCell, TableRow} from "@mui/material";
import {Attraction} from "../../model/Attraction";

export default function AttractionRow({attraction}: { attraction: Attraction }) {
    const [showingDetails, setShowingDetails] = React.useState(false);

    const handleRowClick = () => {
        setShowingDetails(!showingDetails);
    };

    return (
        <>
            <TableRow onClick={handleRowClick}>
                <TableCell>{attraction.name}</TableCell>
                <TableCell>{attraction.open ? "Open" : "Closed"}</TableCell>
                <TableCell>{attraction.type}</TableCell>
            </TableRow>
            {showingDetails && (
                <TableRow>
                    <TableCell>{attraction.description}</TableCell>
                    <TableCell>{attraction.positionX}</TableCell>
                    <TableCell>{attraction.positionY}</TableCell>
                </TableRow>
            )}
        </>
    );
}
