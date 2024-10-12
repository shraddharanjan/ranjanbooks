"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    const searchModal = useSearchModal(); 
    const params = useSearchParams(); 
    const pageCount = params?.get('pageCount'); 
    const format = params?.get('format'); 
    const author = params?.get('author'); 
 
        const pageCountLabel = useMemo(() => {
            if (pageCount) {
                return `${pageCount} Pages`; 
            }
            return 'Any length';
        }, [pageCount]);
        const formatLabel = useMemo(() => {
            if (format) {
                return `${format}`; 
            }
            return 'Any format';
        }, [format]);
        const authorLabel = useMemo(() => {
            if (author) {
                return `${author}`; 
            }
            return 'Any author';
        }, [author]);


        

    return ( 
    <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
                {formatLabel}
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                {authorLabel}
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">
                    {pageCountLabel}
                </div>
                <div className="p-2 bg-purple-600 rounded-full text-white"> 
                    <BiSearch size={18} /> 
                </div>

            </div>

        </div>
        
    </div> );
}
 
export default Search;