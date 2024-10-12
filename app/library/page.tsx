import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getBooks from "../actions/getBooks";
import ReadsClient from "../reads/ReadsClient";
import LibraryClient from "./LibraryClient";
const PropertiesPage = async () =>{ 
    const currentUser = await getCurrentUser(); 
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorised" subtitle="Please login" /> 
            </ClientOnly>
        )
    }
    const books = await getBooks({
        userId: currentUser.id
    }); 
    if (books.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No properties found" subtitle="Looks like you 
                have no properties." /> 
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <LibraryClient books={books} currentUser={currentUser}  /> 
        </ClientOnly>
    )
}
export default PropertiesPage; 