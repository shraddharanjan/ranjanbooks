"use client";

import { SafeUser } from "@/app/types";
import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface BookHeadProps {
  title: string;
  author: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const BookHead: React.FC<BookHeadProps> = ({
  title,
  author,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <section className="flex flex-col gap-5">
      <Heading title={title} subtitle={author} />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[520px]
          overflow-hidden
          rounded-2xl
          bg-neutral-100
          p-4
          sm:p-6
        "
      >
        <div className="relative aspect-[2/3] w-full">
          <Image
            alt={`${title} book cover`}
            src={imageSrc}
            fill
            priority
            sizes="(max-width: 640px) 90vw, 520px"
            className="object-contain"
          />
        </div>

        <div className="absolute right-4 top-4">
          <HeartButton
            bookId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </section>
  );
};

export default BookHead;