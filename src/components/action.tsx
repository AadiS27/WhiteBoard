'use client';

import { ConfirmModal } from "./confirm-modal";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "../../hooks/use-api-mutation";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { useRenameModal } from "../store/use-rename-modal";
interface ActionProps {
    children: React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
}

export const Action = ({ children, side, sideOffset, id, title }: ActionProps) => {
    const {onOpen}=useRenameModal();
    const {mutate,pending}=useApiMutation(api.board.remove);

    const handleDelete = () => {
        if(pending){
            return;
        }
        mutate({id}).then(() => {
            toast.success("Board deleted successfully")
        }).catch(() => {
            toast.error("Failed to delete board")
        });
    };

    const handleCopyLink = () => {
        const link = `${window.location.origin}/board/${id}`;
        navigator.clipboard.writeText(link).then(() => {
           toast.success("Link copied to clipboard")
        }).catch(() => {
            toast.error("Failed to copy link")
        }
        );
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
            side={side}
            sideOffset={sideOffset}
            className="w-60">
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={handleCopyLink}>
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id,title)}>
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete Board"
                    description="Are you sure you want to delete this board? This action cannot be undone."
                    onConfirm={handleDelete}
                    disabled={pending}>
                  <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal" disabled={pending}>
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </Button>
                </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};