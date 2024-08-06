import React, { useEffect } from 'react'
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

export default function Menu() {
    useEffect(() => {
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className="menu-background">
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