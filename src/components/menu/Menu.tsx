import React from "react";
import MenuCard from "./MenuCard";
import "./Menu.css"

interface MenuItem {
    imagePath: string;
    cardName: string;
    path: string;
}

const menuItems: MenuItem[] = [
    { imagePath: '/map-icon.png', cardName: 'Map', path: '/visitorInformation' },
    { imagePath: '/ticket-icon.png', cardName: 'Ticket', path: '/tickets' },
    { imagePath: '/gate-icon.png', cardName: 'Park Gates', path: '/parkGate' },
];

export default function Menu() {
    return (
        <div className="menu-container">
            {menuItems.map((item) => (
                <MenuCard key={item.cardName} {...item} />
            ))}
        </div>
    );
}