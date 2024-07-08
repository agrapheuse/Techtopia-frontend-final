import React from "react";
import {Paper, TableContainer} from "@mui/material";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {usePointsOfInterest} from "../../tsx/CustomHooks";
import AttractionRow from "../AttractionRow/AttractionRow";
import {useState} from "react";
import {PointOfInterest} from "../../model/PointOfInterest";

export default function ListView() {
    const [nameFilter, setNameFilter] = useState<string>("");
    const [open, setOpen] = useState(false);

    const {isLoading, isError, pointsOfInterest} = usePointsOfInterest({name: nameFilter, open: open})
    if (isLoading || !pointsOfInterest) {
        return <div>Loading...</div>;
    }

    if (pointsOfInterest) {
        pointsOfInterest.map((poi: PointOfInterest) => (
            console.log(poi)
        ))
    }

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <>
            <TableContainer component={Paper} className="map">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Open</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            pointsOfInterest.map((poi) => (
                                <AttractionRow
                                    key={poi.uuid}
                                    attraction={poi}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>)

}