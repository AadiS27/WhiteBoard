import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "../../store/use-rename-modal";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";


export const RenameModal = () => {
    const {mutate,pending}=useApiMutation(api.board.update);
const {isOpen,onClose,initialValues}=useRenameModal();
const [title,setTitle]=useState(initialValues.title);

useEffect(() => {
    setTitle(initialValues.title);
}
,[initialValues.title]);

const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({id:initialValues.id,title}).then(() => {
        onClose();
        toast.success("Board updated successfully")
    }
    ).catch(() => {
       toast.error("Failed to update board")
    });

};
    return(
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename Board</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Enter a new name for the board.
            </DialogDescription>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                disabled={pending}
                maxLength={50}
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Board Title"/>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                        Cancel
                        </Button>
                        
                    </DialogClose>
                    <Button disabled={pending} type="submit" >
                            Save
                        </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>   
    )
}