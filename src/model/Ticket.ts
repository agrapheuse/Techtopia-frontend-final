export interface TicketProps {
    ageType: string | undefined;
    ticketOption: string | undefined;
    price: number | undefined;
}

export interface Ticket {
    uuid: {uuid: string}
    date: Date;
    name: string;
    age: number;
    gender: string;
    ticketOption: string;
    ageType: string;
    email: string;
    status: string;
}

export interface TicketDTO {
    date: Date;
    name: string;
    age: number;
    gender: string;
    ticketOption: string;
    ageType: string;
    email: string;
    status: string;
}