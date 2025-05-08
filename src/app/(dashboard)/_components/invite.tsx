'use client'
import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Dialog,DialogContent,DialogTrigger,DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Invite = () => {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" >
                    <Plus className="h-4 w-4 mr-2"/>Invite
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 w-[1011rem]"> 
                <VisuallyHidden><DialogTitle  className="text-center">Invite your team</DialogTitle></VisuallyHidden>
                <OrganizationProfile routing="hash"/>
            </DialogContent>
        </Dialog>
    )};
