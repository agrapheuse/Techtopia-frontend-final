import React, {useContext, useState} from "react";
import './MapView.css';
import {usePointsOfInterest} from "../../../tsx/CustomHooks";
import {Attraction} from "../../../model/Attraction";
import {FoodStand} from "../../../model/FoodStand";
import FilterContext from "../../../context/FilterContext";
import POIInformationDrawer from "../POIInformationDrawer";

interface MapViewProps {
    nameFilter: string;
}

export default function MapView({ nameFilter }: MapViewProps) {
    const { attractionType , isOpen} = useContext(FilterContext);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [clickedPOI, setClickedPOI] = useState<Attraction | FoodStand | null>(null);

    const [showingObject, setShowingObject] = useState<string>("")

    const {isLoading, isError, attractions, foodStands} = usePointsOfInterest({name: nameFilter, open: isOpen})

    if (isLoading || !attractions || !foodStands) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    const showInformation = (poi: Attraction | FoodStand) => {
        setClickedPOI(poi);
        setIsDrawerOpen(true);
        if ((poi as Attraction).minAge !== undefined) {
            setShowingObject("Attraction");
        } else {
            setShowingObject("FoodStand");
        }
    }

    return (
        <div className="map-container">
                <img src="/TechtopiaMap.png" alt="map" className="map-image"/>
                {(attractionType === 'attractions' || attractionType === 'all') ?
                    (
                        attractions.map((attraction: Attraction) => (
                    <div
                        key={attraction.uuid.uuid}
                        className={`map-marker ride`}
                        style={{
                            top: `${attraction.posY}%`,
                            left: `${attraction.posX}%`,
                        }}
                        onClick={() => showInformation(attraction)}
                    />
                ))) : (
                    <></>
                    )}
                {(attractionType === 'foodStands' || attractionType === 'all') ?
                    (
                        foodStands.map((foodStand: FoodStand) => (
                    <div
                        key={foodStand.uuid.uuid}
                        className={`map-marker food`}
                        style={{
                            top: `${foodStand.posY}%`,
                            left: `${foodStand.posX}%`,
                        }}
                        onClick={() => showInformation(foodStand)}
                    />
                ))) : (
                    <></>
                    )}
            <POIInformationDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} clickedPOI={clickedPOI} showingObject={showingObject}></POIInformationDrawer>
        </div>
    );
}