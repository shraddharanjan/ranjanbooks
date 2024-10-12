import prisma from "@/app/libs/prismadb"; 
export default async function getBooks() {
    try {
        const books = await prisma.book.findMany({
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