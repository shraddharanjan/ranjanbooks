
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"; 
interface IParams {
    bookId?: string; 
}
export async function POST(
    request: Request, 
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser(); 
    if (!currentUser) {
        return NextResponse.error(); 
    }
        const {bookId} = params; 
        if (!bookId || typeof bookId !== 'string') {
            throw new Error("Invalid Id"); 
        }
        let favoriteIds = [...(currentUser.favoriteIds || [])]; 
        favoriteIds.push(bookId); 
        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });
        return NextResponse.json(user); 
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
        throw new Error('Invalid ID'); 
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== bookId);
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    }); 
    return NextResponse.json(user); 
}