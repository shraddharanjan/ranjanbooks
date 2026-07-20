"use client";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null; 
}

const Navbar = ({currentUser}: NavbarProps) => {
    return ( 
    <div className="fixed bg-white z-10 shadow-sm w-full" >
        <div className="border-b border-neutral-200 py-2">
            <Container> 
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo /> 
                    <Search /> 
                    <UserMenu currentUser={currentUser} /> 

                </div>
            </Container>
        </div>
        <Categories />



    </div> );
}
 
export default Navbar;