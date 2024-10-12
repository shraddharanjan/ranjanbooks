"use client";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
 
interface BookHeadProps {
    title: string; 
    author: string; 
    imageSrc: string; 
    id: string;
    currentUser?: SafeUser | null;
}
const BookHead: React.FC<BookHeadProps> = ({title, author, imageSrc,
    id, currentUser
}) => {

    return (
        <>
        <Heading title={title} subtitle={author} />
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image alt="Image" src={imageSrc} fill className="object-cover w-full"  /> 
            <div className="absolute top-5 right-5">
                <HeartButton bookId={id} currentUser={currentUser}/>
            </div>
            </div> 
        
        </>
    )
}
export default BookHead; 