import prisma from "@/app/libs/prismadb"; 
export interface IBookParams {
    userId?: string; 
}
export default async function getBooks(params: IBookParams) {
    try {
        const {userId} = params;
        let query: any = {}; 
        if (userId) {
            query.userId = userId; 
        }
        const books = await prisma.book.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const safeBooks = books.map((book) => ({
            ...book, createdAt: book.createdAt.toISOString(), 
        }))
        return safeBooks;
    } catch (error: any) {
        throw new Error(error); 
    }
}