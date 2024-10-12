import prisma from "@/app/libs/prismadb"; 
export interface IBookParams {
    userId?: string;
    title?: string; 
    format?: string; 
    audience?: string; 
    publisher?: string; 
    pageCount?: number; 
    startDate?: string; 
    endDate?: string; 
    author?: string; 
    locationValue?: string; 
    category?: string;  
}
export default async function getBooks(params: IBookParams) {
    try {
        const {userId, pageCount, startDate, endDate, author, publisher, title,
            audience, format, category} = params;
        let query: any = {}; 
        if (userId) {
            query.userId = userId; 
        }
        if (author) {
            query.author = { 
                contains: author, 
                mode: 'insensitive' 
            };  
        }
        if (category) {
            query.category = category; 
        }
        if (title) {
            query.title = { 
                contains: title, 
                mode: 'insensitive' 
            }; 
        }
        if (publisher) {
            query.publisher = {
                contains: publisher,
                mode: 'insensitive'
            };
        }
        if (format) {
            query.format = {
                contains: format,
                mode: 'insensitive'
            };
        }
        if (audience) {
            query.audience = {
                contains: audience,
                mode: 'insensitive'
            };
        }
        if (pageCount) {
            query.pageCount = {
                gte: +pageCount
            }
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate}, 
                                startDate: {lte: startDate},
                            }, 
                            { startDate: {lte: endDate}, 
                             endDate: {gte: endDate}
                        }
                        ]
                    }
                }
            }
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