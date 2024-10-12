import { Book, User } from "@prisma/client";

export type SafeBook = Omit<Book, 'createdAt'> & {
    createdAt: string; 
}
export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> 
& {
    createdAt: string; 
    updatedAt: string; 
    emailVerified: string | null; 
}