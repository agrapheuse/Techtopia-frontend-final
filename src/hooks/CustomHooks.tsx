import { useQuery } from 'react-query'
import { getPointsOfInterest, getStaffMembers, getTicketsForAUser } from '../services/DataService'
import { PointOfInterest } from '../model/PointOfInterest'
import { Attraction } from '../model/Attraction'
import { FoodStand } from '../model/FoodStand'

function isAttraction(point: PointOfInterest): point is Attraction {
    return (point as Attraction).minHeight !== undefined
}

function isFoodStand(point: PointOfInterest): point is FoodStand {
    return (point as FoodStand).menu !== undefined
}

function separatePointsOfInterest(points: PointOfInterest[] | undefined): {
    attractions: Attraction[]
    foodStands: FoodStand[]
} {
    const attractions: Attraction[] = []
    const foodStands: FoodStand[] = []

    if (points) {
        for (const point of points) {
            if (isAttraction(point)) {
                attractions.push(point)
            } else if (isFoodStand(point)) {
                foodStands.push(point)
            } else {
                console.warn('Unexpected PointOfInterest type:', point)
            }
        }
    }

    return { attractions, foodStands }
}

export function usePointsOfInterest({ name, open }: { name: string | null; open: boolean | null }) {
    const {
        isLoading,
        isError,
        data: pointsOfInterest,
        refetch,
    } = useQuery(['pointsOfInterest', { name, open }], () => getPointsOfInterest({ name, open }))

    const { attractions, foodStands } = separatePointsOfInterest(pointsOfInterest)

    return {
        isLoading,
        isError,
        attractions,
        foodStands,
        refetch,
    }
}

export function useTickets({ email, date }: { email: string; date: Date | null }) {
    const {
        isLoading,
        isError,
        data: tickets,
        refetch,
    } = useQuery(['tickets', { email }], () => getTicketsForAUser({ email, date }))

    return {
        isLoading,
        isError,
        tickets: tickets || [],
        refetch,
    }
}

export function useStaffMembers({ uuid }: { uuid: string | null }) {
    const {
        isLoading,
        isError,
        data: staffMembers
    } = useQuery(['staffMembers', {uuid}], () => getStaffMembers(uuid))

    return {
        isLoading,
        isError,
        staffMembers: staffMembers || [],
    }
}
