"use client"; 

interface ClientProps {
    children: React.ReactNode; 
}

const Container = ({children}: ClientProps) => {
    return (
        <div className="max-w-[2550px] px-4 sm:px-2 md:px-10 xl:px-20 mx-auto">
            {children}
        </div>
    )
}

export default Container; 