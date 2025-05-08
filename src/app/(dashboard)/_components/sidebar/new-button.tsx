'use client'
import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle
}from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const NewButton = () => {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create Organization" side="right" align="start" sideOffset={10} alignOffset={-10}>
                    <button className="bg-white/25 h-full w-full rounded-md items-center justify-center opacity-80 hover:opacity-100 flex transition-all duration-200 ease-in-out">
                        <Plus className="text-white" size={24}/>
                    </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-white border-none overflow-hidden">
        <div className="rounded-md shadow-lg">
         <VisuallyHidden> <DialogTitle className="text-black p-4">
            Create Organization
          </DialogTitle></VisuallyHidden>
          <div className=" pl-9 pt-7 pb-7">
            <CreateOrganization />
          </div>
        </div>
      </DialogContent>
        </Dialog>

    )
}