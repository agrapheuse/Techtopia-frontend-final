import * as React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import "./MenuCard.css"
import {useNavigate} from "react-router-dom";

interface MenuCardProps {
    imagePath: string;
    cardName: string;
    path: string;
}

const MenuCard: React.FC<MenuCardProps> = ({imagePath, cardName, path}) => {
    const navigate = useNavigate();

    return (
        <Card className="menu-card">
            <CardActionArea onClick={() => navigate(path)}>
                <CardMedia className="card-image"
                           component="img"
                           image={imagePath}
                           alt={cardName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align="center">
                        {cardName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MenuCard;
