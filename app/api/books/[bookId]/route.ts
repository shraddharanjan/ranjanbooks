import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"; 
interface IParams {
    bookId?: string; 
}
export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser(); 
    if (!currentUser) {
        return NextResponse.error(); 
    }
    const {bookId} = params; 
    if (!bookId || typeof bookId !== 'string') {
        throw new Error("Invalid ID"); 
    }
    const book = await prisma.book.deleteMany({
        where: {
            id: bookId, 
            userId: currentUser.id
        }
    });
    return NextResponse.json(book); 
}