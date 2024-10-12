import React from "react";
import { SafeBook, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import BookCard from "../components/books/BookCard";
interface FavoritesClientProps {
    books: SafeBook[]; 
    currentUser?: SafeUser | null; 
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({books, currentUser}) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of books you have favorited!" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {books.map((book) => (
                    <BookCard currentUser={currentUser} key={book.id} data={book} /> 
                ))}
            </div>
        </Container>
    )
}
export default FavoritesClient; 