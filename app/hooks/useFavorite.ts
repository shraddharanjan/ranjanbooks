import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
interface IUseFavorite {
    bookId: string;
    currentUser?: SafeUser | null;
}
const useFavorite = ({
    bookId, 
    currentUser
}: IUseFavorite) => {
    const router = useRouter(); 
    const loginModal= useLoginModal(); 
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []; 
        return list.includes(bookId); 
    }, [currentUser, bookId]); 
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            let request; 
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${bookId}`); 
            } else {
                request = () => axios.post(`/api/favorites/${bookId}`);
            }
            await request(); 
            router.refresh();
            toast.success("Success"); 
        } catch (error) {
            toast.error("Something went wrong"); 
        }
    }, [currentUser, hasFavorited, bookId, loginModal, router]); 
    return {
        hasFavorited, toggleFavorite
    }
}
export default useFavorite; 