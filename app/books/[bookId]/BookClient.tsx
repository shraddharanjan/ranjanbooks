"use client";
import BookHead from "@/app/components/books/BookHead";
import BookInfo from "@/app/components/books/BookInfo";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { SafeBook, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
interface BookClientProps {
    reservations?: Reservation[]; 
    book: SafeBook & {user: SafeUser}; 
    currentUser?: SafeUser | null; 
}
const BookClient: React.FC<BookClientProps> = ({book, currentUser}) => {
    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === book.category); 
    }, [book.category])
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <BookHead title={book.title} imageSrc={book.imageSrc} 
                    author={book.author} id={book.id}
                    currentUser={currentUser}/>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <BookInfo user={book.user} audience={book.audience} format={book.format} publisher={book.publisher}  category={category} plot={book.plot}
                        pageCount={book.pageCount} />
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default BookClient; 