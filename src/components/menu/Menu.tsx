import React from "react";
import MenuCard from "./MenuCard";
import "./Menu.css"

interface MenuItem {
    imagePath: string;
    cardName: string;
    path: string;
}

const menuItems: MenuItem[] = [
    {imagePath: '/map-icon.png', cardName: 'Map', path: '/visitorInformation'},
    {imagePath: '/ticket-icon.png', cardName: 'Ticket', path: '/tickets'},
    {imagePath: '/gate-icon.png', cardName: 'Park Gates', path: '/parkGate'},
];

const backgroundImageStyle = {
    backgroundImage: `url(/techtopia-banner.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    opacity: '0.7',
};

export default function Menu() {
    return (
        <div style={backgroundImageStyle}>
            <div className="title">
                <h1>Techtopia</h1>
            </div>

            <div className="menu-container">

                {menuItems.map((item) => (
                    <MenuCard key={item.cardName} {...item} />
                ))}
            </div>
        </div>
    );
}