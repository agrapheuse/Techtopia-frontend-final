import React, {useState} from "react";
import InfoViewToggle from "./InfoViewToggle/InfoViewToggle";
import ListView from "./ListView/ListView";
import MapView from "./MapView/MapView";
import "./VisitorInformation.css";


export default function VisitorInformation() {
    const [toggleStateList, setToggleStateList] = useState("map");

    return (
        <div className="info-view-page-container">
            <InfoViewToggle toggleStateList={toggleStateList} setToggleStateList={setToggleStateList} />
            <div className="info-view-content">
                {toggleStateList === "list" ? (
                    <div className="list-view-container">
                        <ListView />
                    </div>
                ) : (
                    <div className="map-view-container">
                        <MapView />
                    </div>
                )}
            </div>
        </div>
    );
}
