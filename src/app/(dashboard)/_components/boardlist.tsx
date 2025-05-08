'use client'

import Image from "next/image";
import { EmptyBoard } from "./empty-board";

interface BoardListProps {
    favourites: string | null;
    search: string | null;
    organizationId: string;
}

export const BoardList = ({favourites,search,organizationId}:BoardListProps) => {
    const data=[];//TODO: fetch data from the server

    if(!data?.length &&search){
     return(
        <div className="flex overflow-auto p-6 bg-background items-center justify-center h-full flex-col">
            <Image src="/pirates.gif" height={250} width={250} alt="Empty state illustration" className="object-contain" />
            <h1 className="text-2xl font-bold">No results found</h1>
            <p className="text-muted-foreground">Try searching for something else</p>
        </div>
     )
    } 

    if(!data?.length &&favourites){
        return(
            <div className="flex overflow-auto p-6 bg-background items-center justify-center h-full flex-col"> 
              <Image src="/favouritese.avif" height={250} width={250} alt="Empty state illustration" className="object-contain" />
                <h1 className="text-2xl font-bold">No favourite boards</h1>
            </div>
        )
       } 
       if(!data?.length){
        return(
            <EmptyBoard/>
        )
       }
    return(
        <div className="flex-1 overflow-auto p-6 bg-background">
           { JSON.stringify({search,favourites})}
        </div>

    )
}