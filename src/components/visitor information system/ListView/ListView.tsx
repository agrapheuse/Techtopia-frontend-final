import React, {useContext} from "react";
import {Paper, TableContainer} from "@mui/material";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {usePointsOfInterest} from "../../../hooks/CustomHooks.tsx";
import AttractionRow from "../AttractionRow/AttractionRow";
import FilterContext from "../../../context/FilterContext";

interface ListViewProps {
    nameFilter: string;
}

export default function ListView({ nameFilter }: ListViewProps) {
    const { attractionType , isOpen} = useContext(FilterContext);
    const {isLoading, isError, attractions, foodStands} = usePointsOfInterest({name: nameFilter, open: isOpen})

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
                        {(attractionType === 'attractions' || attractionType === 'all') ?
                            (
                            attractions.map((attraction) => (
                                <AttractionRow
                                    key={attraction.uuid.uuid}
                                    attraction={attraction}
                                />
                            ))) : (
                                <></>
                            )}
                        {(attractionType === 'foodStands' || attractionType === 'all') ?
                            (
                            foodStands.map((foodStand) => (
                                <AttractionRow
                                    key={foodStand.uuid.uuid}
                                    attraction={foodStand}
                                />
                            ))) : (
                                <></>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>)

}