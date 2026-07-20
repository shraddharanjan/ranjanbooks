"use client";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import BookCategory from "./BookCategory";

 
interface BookInfoProps {
    user: SafeUser; 
    plot: string; 
    audience: string; 
    format: string;
    publisher?: string | null; 
    pageCount: number;
    category: {
        icon: IconType;
        label: string; 
        description: string;
    } | undefined
}
const BookInfo: React.FC<BookInfoProps> = ({user, plot, audience, format, pageCount, publisher, category,
}) => {
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div> On loan from {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light
                text-neutral-500">
                    <div>
                        Pages: {pageCount}
                    </div>
                    <div>
                        Publisher: {publisher} 
                    </div>
                    <div>
                        Audience: {audience}
                    </div>
                    <div>
                        Format: {format} 
                    </div>
                    
                </div>
            </div>
            <hr /> 
            {category && (
                <BookCategory icon={category.icon} label={category.label}
                description={category.description} />
            )}
            <hr /> 
            <div className="text-lg font-light text-neutral-500" >
                Plot: 
                <br/> 
                {plot}
            </div>
            <hr />
        </div>
    )
}
export default BookInfo; 