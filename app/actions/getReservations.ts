import prisma from "@/app/libs/prismadb"; 
interface IParams {
    bookId?: string; 
    userId?: string; 
    authorId?: string; 
}
export default async function getReservations(
    params: IParams
) {
    try {
    const {bookId, userId, authorId} = params; 
    const query: any = {}; 
    if (bookId) {
        query.bookId = bookId;
    }
    if (userId) {
        query.userId = userId; 
    }
    if (authorId) { 
        query.book = {userId: authorId}
    }
    const reservations = await prisma.reservation.findMany({
        where: query, 
        include: {
            book: true,
        }, 
        orderBy: {createdAt: 'desc'}
    }); 
    const safeReservations = reservations.map((reservation) => ({
    ...reservation, createdAt: reservation.createdAt.toISOString(), 
    startDate: reservation.startDate.toISOString(), endDate: reservation.endDate.toString(),
    listing: {
        ...reservation.book, createdAt: reservation.book.createdAt.toISOString()
    }
    })
);
return safeReservations; 
    } catch (error: any) {
        throw new Error(error); 
    }
}