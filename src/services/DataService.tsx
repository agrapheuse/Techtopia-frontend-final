import axios from 'axios'
import { PointOfInterest } from '../model/PointOfInterest'
import { Ticket, TicketProps } from '../model/Ticket'
import { StaffMember } from '../model/StaffMember'

export const getPointsOfInterest = async ({ name, open }: { name: string | null; open: boolean | null }) => {
    axios.defaults.baseURL = 'http://localhost:8091'
    let url = `/pointOfInterest?`
    if (name) url += `name=${name}&`
    if (open) url += `open=${open}`
    const pointOfInterest = await axios.get<PointOfInterest[]>(url)
    return pointOfInterest.data
}

export const getTicketsForAUser = async ({ email, date }: { email: string; date: Date | null }) => {
    axios.defaults.baseURL = 'http://localhost:8095'
    let url = `/tickets/fetchByEmail?email=${email}`
    if (date) url += `date=${date}&`

    const tickets = await axios.get<Ticket[]>(url)
    return tickets.data
}

export const getTicketStatus = async ({ uuid }: { uuid: string }) => {
    axios.defaults.baseURL = 'http://localhost:8094'
    const status = await axios.get<string>(`/tickets/ticketStatus?ticketUUID=${uuid}`)
    return status.data
}

export const enterPark = async (uuid: string) => {
    axios.defaults.baseURL = 'http://localhost:8094'
    return await axios.post<void>(`/ticketActivity/enter?ticketUUID=${uuid}`)
}

export const exitPark = async (uuid: string) => {
    axios.defaults.baseURL = 'http://localhost:8094'
    return await axios.post<void>(`/ticketActivity/exit?ticketUUID=${uuid}`)
}

const createTicket = async (newTicket: TicketProps) => {
    axios.defaults.baseURL = 'http://localhost:8095'
    try {
        const response = await axios.post<void>('/tickets/create', newTicket)
        return response.data
    } catch (error) {
        console.error('Error creating ticket:', error)
        throw error
    }
}

export const createTicketsOneByOne = async (tickets: TicketProps[]) => {
    try {
        const results = []
        for (const ticket of tickets) {
            const result = await createTicket(ticket)
            results.push(result)
        }
        return results
    } catch (error) {
        console.error('Error creating tickets:', error)
        return []
    }
}

export const changeOpenStatus = async (uuid: string, openStatus: boolean) => {
    axios.defaults.baseURL = 'http://localhost:8092'
    try {
        const response = await axios.patch<void>(`/pointOfInterest/changeOpenStatus?uuid=${uuid}&open=${openStatus}`)
        return response.data
    } catch (error) {
        console.error('Error creating ticket:', error)
        throw error
    }
}

export const getStaffMembers = async (uuid: string | null) => {
    axios.defaults.baseURL = 'http://localhost:8092'

    if (uuid) {
        const staffMembers = await axios.get<StaffMember[]>(`/staffMember/staffOfPOI?uuid=${uuid}`)
        return staffMembers.data
    } else {
        const staffMembers = await axios.get<StaffMember[]>("/staffMember")
        return staffMembers.data
    }
}
