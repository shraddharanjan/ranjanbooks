"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeBook, SafeUser } from "../types";
import React, { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BookCard from "../components/books/BookCard";
interface LibraryClientProps {
  books: SafeBook[];
  currentUser?: SafeUser | null;
}
const LibraryClient: React.FC<LibraryClientProps> = ({
  books,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  }, []);
  return (
    <Container>
      <Heading
        title="Books"
        subtitle="List of your books"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            data={book}
            actionId={book.id}
            onAction={onCancel}
            disabled={deletingId === book.id}
            actionLabel="Delete book"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default LibraryClient;