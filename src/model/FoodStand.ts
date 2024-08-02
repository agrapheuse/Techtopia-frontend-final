import { PointOfInterest } from "./PointOfInterest";

export interface FoodStand extends PointOfInterest{
    uuid: {uuid: string};
    name: string;
    description: string;
    posX: number;
    posY: number;
    picturePath: string;
    open: boolean;
    menu: string;
}