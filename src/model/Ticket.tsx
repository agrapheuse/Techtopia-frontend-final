export interface TicketProps {
    ageType: string | undefined;
    ticketOption: string | undefined;
}

export interface Ticket {
    date: Date;
    name: string;
    age: number;
    gender: string;
    ticketOption: string;
    ageType: string;
    email: string;
}