import prisma from "@/app/libs/prismadb"; 
interface IParams {
    bookId?: string; 
}
export default async function getBookById( 
    params: IParams
) {
    try {
        const {bookId} = params; 
        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }, 
            include: {
                user: true
            }
        
        }); 
        if (!book) {
            return null; 
        }
        return {
            ...book, createdAt: book.createdAt.toISOString(),
            user: {
                ...book.user, 
                createdAt: book.user.createdAt.toISOString(), 
                updatedAt: book.user.updatedAt.toISOString(), 
                emailVerified: book.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}