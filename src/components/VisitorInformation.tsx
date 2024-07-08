import React, {useState} from "react";
import InfoViewToggle from "./InfoViewToggle/InfoViewToggle";
import ListView from "./ListView/ListView";
import MapView from "./MapView/MapView";
import "./VisitorInformation.css";


export default function VisitorInformation() {
    const [toggleState, setToggleState] = useState("list");

    return (
        <div className="info-view-page-container">
            <InfoViewToggle toggleState={toggleState} setToggleState={setToggleState} />
            <div className="info-view-content">
                {toggleState === "list" ? (
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
