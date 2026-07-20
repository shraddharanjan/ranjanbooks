"use client";

import {
  SafeBook,
  SafeReservation,
  SafeUser,
} from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Button from "../Button";
import HeartButton from "../HeartButton";

interface BookCardProps {
  data: SafeBook;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const BookCard: React.FC<BookCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    return reservation ? reservation.totalPrice : data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <article
      onClick={() => router.push(`/books/${data.id}`)}
      className="
        group
        col-span-1
        flex
        h-full
        cursor-pointer
        flex-col
      "
    >
      <div
        className="
          relative
          aspect-[2/3]
          w-full
          overflow-hidden
          rounded-xl
          bg-neutral-100
          transition
          duration-300
          group-hover:-translate-y-1
          group-hover:shadow-lg
        "
      >
        <Image
          src={data.imageSrc}
          alt={`${data.title} by ${data.author}`}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 768px) 50vw,
            (max-width: 1024px) 33vw,
            25vw
          "
          className="
            object-contain
            p-2
            transition-transform
            duration-300
            group-hover:scale-[1.02]
          "
        />

        <div className="absolute right-3 top-3">
          <HeartButton
            bookId={data.id}
            currentUser={currentUser}
          />
        </div>
      </div>

      <div className="flex min-h-[172px] flex-1 flex-col pt-4">
        <div className="min-h-[70px]">
          <h2
            className="
              line-clamp-2
              text-lg
              font-semibold
              leading-snug
              text-neutral-900
              transition
              group-hover:text-purple-700
            "
          >
            {data.title}
          </h2>

          <p className="mt-1 line-clamp-1 text-sm text-neutral-600">
            {data.author}
          </p>
        </div>

        <p className="mt-2 line-clamp-1 text-sm text-neutral-500">
          {reservationDate || data.category}
        </p>

        <div className="mt-auto flex items-baseline gap-1 pt-3">
          <span className="font-semibold text-neutral-900">
            ${price}
          </span>

          {!reservation && (
            <span className="text-sm text-neutral-500">
              / day
            </span>
          )}
        </div>

        {onAction && actionLabel && (
          <div className="mt-4">
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default BookCard;