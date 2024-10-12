import getBookById from "@/app/actions/getBookById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import BookClient from "./BookClient";
import getReservations from "@/app/actions/getReservations";
interface IParams {
    bookId?: string; 
}
const BookPage = async ({params}: {params: IParams}) => {
    const book = await getBookById(params); 
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser(); 
    if (!book) {
        return (
            <ClientOnly>
                <EmptyState /> 
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <BookClient book={book} reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    ); 
}
export default BookPage; 