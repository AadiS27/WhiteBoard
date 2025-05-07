import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
       <div className="flex items-center p-5 bg-green-500 gap-x-4 shadow-md">
        <div className="hidden lg:flex-1 lg:flex bg-amber-300">
            {/*Add search bar here*/}
            Search
        </div>
        <UserButton/>
       </div>
    );
    }