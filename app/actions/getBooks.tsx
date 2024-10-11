import prisma from "@/app/libs/prismadb"; 
export default async function getBooks() {
    try {
        const listings = await prisma.book.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listings;
    } catch (error: any) {
        throw new Error(error); 
    }
}