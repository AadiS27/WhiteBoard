import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

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
            <DialogContent className="p-0 max-w-[800px] w-full"> 
                <DialogTitle className="text-center">Invite your team</DialogTitle>
                <OrganizationProfile routing="hash"/>
            </DialogContent>
        </Dialog>
    )};
