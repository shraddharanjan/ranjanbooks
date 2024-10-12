import getBookById from "@/app/actions/getBookById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import BookClient from "./BookClient";
interface IParams {
    bookId?: string; 
}
const BookPage = async ({params}: {params: IParams}) => {
    const book = await getBookById(params); 
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
            <BookClient book={book} currentUser={currentUser} />
        </ClientOnly>
    ); 
}
export default BookPage; 