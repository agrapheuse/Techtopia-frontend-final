import axios from 'axios'
import { PointOfInterest } from '../model/PointOfInterest'
import { Ticket, TicketDTO } from '../model/Ticket'
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

export const enterPark = async (uuid: string) => {
    axios.defaults.baseURL = 'http://localhost:8094'
    return await axios.post<void>(`/ticketActivity/enter?ticketUUID=${uuid}`)
}

export const exitPark = async (uuid: string) => {
    axios.defaults.baseURL = 'http://localhost:8094'
    return await axios.post<void>(`/ticketActivity/exit?ticketUUID=${uuid}`)
}

const createTicket = async (newTicket: TicketDTO) => {
    axios.defaults.baseURL = 'http://localhost:8095'
    try {
        return await axios.post<void>('/tickets/create', newTicket)
    } catch (error) {
        console.error('Error creating ticket:', error)
        throw error
    }
}

export const createTicketsOneByOne = async (tickets: TicketDTO[]) => {
    try {
        const results = []
        for (const ticket of tickets) {
            const result = await createTicket(ticket)
            results.push(result)
        }
        return results
    } catch (error) {
        console.error('Error creating tickets:', error)
        throw error
    }
}

export const changeOpenStatus = async (uuid: string, openStatus: boolean) => {
    axios.defaults.baseURL = 'http://localhost:8092'
    try {
        return await axios.patch<void>(`/pointOfInterest/changeOpenStatus?uuid=${uuid}&open=${openStatus}`)
    } catch (error) {
        console.error('Error updating open status:', error)
        throw error
    }
}

export const updateStaffMembers = async (uuid: string, staffUUIDs: string[]) => {
    axios.defaults.baseURL = 'http://localhost:8092'
    try {
        return await axios.patch<void>(
            `/pointOfInterest/updateStaffMembers?poiUuid=${uuid}&staffMemberUuids=${staffUUIDs}`
        )
    } catch (error) {
        console.error('Error updating staff members:', error)
        throw error
    }
}

export const getStaffMembers = async (uuid: string | null) => {
    axios.defaults.baseURL = 'http://localhost:8092'

    if (uuid) {
        const staffMembers = await axios.get<StaffMember[]>(`/staffMember/staffOfPOI?uuid=${uuid}`)
        return staffMembers.data
    } else {
        const staffMembers = await axios.get<StaffMember[]>('/staffMember')
        return staffMembers.data
    }
}
