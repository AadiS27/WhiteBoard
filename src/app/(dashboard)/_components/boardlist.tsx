'use client'
import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { EmptyBoard } from "./empty-board";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board";

interface BoardListProps {
    favourites: string | null;
    search: string | null;
    organizationId: string;
}

export const BoardList = ({favourites,search,organizationId}:BoardListProps) => {
    const data=useQuery(api.boards.get,{orgId: organizationId});//TODO: fetch data from the server


    if(data===undefined){
        return(
            <div className="flex overflow-auto p-6 bg-background items-center justify-center h-full flex-col">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        )
    }
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
           <h2 className="text-2xl font-bold mb-4">
            {favourites ? "Favourites" : search ? `Search results for "${search}"` : "All Boards"}
           </h2>
          
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 pb-10 gap-4">
           <NewBoardButton orgId={organizationId}/>
            {data.map((board) => (
                <BoardCard key={board._id} id={board._id} title={board.title} imageUrl={board.imageUrl}  authorId={board.authorId} authorName={board.imageUrl} createdAt={board._creationTime} orgId={board.orgId} isFavourite={true}/>
            ))}
           </div>
        </div>

    )
}