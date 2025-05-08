import { cn } from "@/lib/utils";
import { Star } from "lucide-react";


interface FooterProps{
    isFavourite:boolean;

    authorLabel:string;
    createdAtLabel:string;
    onClick:()=>void;
    disabled:boolean;
}

export const Footer=({isFavourite,authorLabel,createdAtLabel,disabled,onClick}:FooterProps)=>{
    return(
        <div className="relative  bg-white">
            
            <p className="opacity-0 group-hover:opacity-100 text-[13px] text-muted-foreground flex items-center gap-1">
                {authorLabel} {createdAtLabel}
            </p>
            <button disabled={disabled} onClick={onClick}
            className={cn(
                "absolute top-2 right-2 p-1 rounded-full transition-colors duration-200 hover:text-yellow-500",
                disabled && "cursor-not-allowed opacity-50",
            )}>
                <Star
                className={cn(
                    "h-4 w-4",
                    isFavourite && "fill-yellow-500 text-yellow-500",
                )}/>
            </button>
        </div>
    )
}