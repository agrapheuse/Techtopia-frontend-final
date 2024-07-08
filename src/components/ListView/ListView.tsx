import React from "react";
import {Paper, TableContainer} from "@mui/material";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {usePointsOfInterest} from "../../tsx/CustomHooks";
import AttractionRow from "../AttractionRow/AttractionRow";
import {useState} from "react";

export default function ListView() {
    const [nameFilter, setNameFilter] = useState<string>("");
    const [open, setOpen] = useState(false);

    const {isLoading, isError, attractions, foodStands} = usePointsOfInterest({name: nameFilter, open: open})

    if (isLoading || !attractions || !foodStands) {
        return <div>Loading...</div>;
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
                            attractions.map((attraction) => (
                                <AttractionRow
                                    key={attraction.uuid}
                                    attraction={attraction}
                                />
                            ))
                        }
                        {
                            foodStands.map((foodStand) => (
                                <AttractionRow
                                    key={foodStand.uuid}
                                    attraction={foodStand}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>)

}