'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { toast } from "sonner";
export const EmptyBoard = () => {
    const {organization}=useOrganization();
    const {mutate,pending}=useApiMutation(api.board.create);
    const handleCreate=()=>{
        if(!organization){
            return;
        }
        mutate({
            orgId:organization.id,
            title:"New Board",
        })
        .then((id)=>{
            toast.success("Board created successfully");
            //TODO: Redirect to the new board page
        })
        .catch(()=>{
            toast.error("Error creating board: ");
        });

    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full">
           <Image src="/board.avif" height={250} width={250} alt="Empty state illustration" className="object-contain" />
            <h1 className="text-2xl font-bold">No boards found</h1>
            <p className="text-gray-500">Create a new board to get started.</p>
            <Button disabled={pending} onClick={handleCreate} className="mt-4" variant="outline">
                Create Board
            </Button>
        </div>
    );
}