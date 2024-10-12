"use client";
import BookHead from "@/app/components/books/BookHead";
import BookInfo from "@/app/components/books/BookInfo";
import BookReservation from "@/app/components/books/BookReservation";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeBook, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(), 
    endDate: new Date(), 
    key: 'selection'
};

interface BookClientProps {
    reservations?: Reservation[]; 
    book: SafeBook & {user: SafeUser}; 
    currentUser?: SafeUser | null; 
}

const BookClient: React.FC<BookClientProps> = ({book, reservations = [], currentUser}) => {
    const loginModal = useLoginModal(); 
    const router = useRouter(); 
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate), 
                end: new Date(reservation.endDate)
            }); 
            dates = [...dates, ...range];
        });
        return dates; 
    }, [reservations]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [totalPrice, setTotalPrice] = useState(book.price); 
    const [dateRange, setDateRange] = useState<Range>(initialDateRange); 
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen(); 
        }
        setIsLoading(true); 
        axios.post('/api/reservations', {
            totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate, 
            bookId: book?.id
        }).then(() => {
            toast.success("Listing reserved!"); 
            setDateRange(initialDateRange); 
            router.refresh(); 
        }).catch(() => {
            toast.error("Something went wrong")
        }).finally(() => {
            setIsLoading(false); 
        })
    }, [totalPrice, dateRange, book?.id, router, currentUser, loginModal ]);
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            ); 
            if (dayCount && book.price) {
                setTotalPrice(dayCount * book.price);
            } else {
                setTotalPrice(book.price);
            }
        }
    }, [dateRange, book.price]); 
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

                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <BookReservation price={book.price} totalPrice={totalPrice} dateRange={dateRange}
                            onChangeDate={(value) => setDateRange(value)} onSubmit={onCreateReservation}
                            disabled={isLoading} disabledDates={disabledDates} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default BookClient; 