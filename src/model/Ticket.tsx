export interface TicketProps {
    ageType: string | undefined;
    ticketOption: string | undefined;
}

export interface Ticket {
    date: date;
    name: string;
    age: number;
    gender: string;
    option: string;
    ageType: string;
    email: string;
}