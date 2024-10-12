import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"; 
import getCurrentUser from "@/app/actions/getCurrentUser";
export async function POST(
    request: Request 
) {
    const currentUser = await getCurrentUser(); 
    if (!currentUser) {
        return NextResponse.error(); 
    }
    const body = await request.json(); 
    const {bookId, startDate, endDate, totalPrice} = body; 
    if (!bookId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error(); 
    }
    const bookAndReservation = await prisma.book.update({
        where: {
            id: bookId
        }, 
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate, endDate, totalPrice
                }
            }
        }
    }); 
    return NextResponse.json(bookAndReservation); 
}