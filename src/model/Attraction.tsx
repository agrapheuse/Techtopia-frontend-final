import { PointOfInterest } from "./PointOfInterest";

export interface Attraction extends PointOfInterest {
    uuid: {uuid: string};
    name: string;
    description: string;
    posX: number;
    posY: number;
    picturePath: string;
    open: boolean;
    minAge: number;
    type: string;
}