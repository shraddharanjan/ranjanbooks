import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReadsClient from "./ReadsClient";
const ReadsPage = async () =>{ 
    const currentUser = await getCurrentUser(); 
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorised" subtitle="Please login" /> 
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        userId: currentUser.id
    }); 
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No trips found" subtitle="Looks like you haven't reserved
                any trips." /> 
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ReadsClient reservations={reservations} currentUser={currentUser}  /> 
        </ClientOnly>
    )
}
export default ReadsPage; 