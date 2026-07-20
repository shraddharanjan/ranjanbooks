"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: Record<string, unknown> = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        flex
        h-full
        min-w-[92px]
        shrink-0
        flex-col
        items-center
        justify-center
        gap-1.5
        border-b-2
        px-3
        text-center
        transition
        hover:text-neutral-900
        ${
          selected
            ? "border-purple-600 text-purple-700"
            : "border-transparent text-neutral-500"
        }
      `}
    >
      <Icon size={22} />

      <span className="whitespace-nowrap text-xs font-medium">
        {label}
      </span>
    </button>
  );
};

export default CategoryBox;