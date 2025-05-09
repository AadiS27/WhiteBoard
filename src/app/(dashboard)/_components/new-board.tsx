"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { useApiMutation } from "../../../../hooks/use-api-mutation"
import { api } from "../../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
  className?: string
}

export const NewBoardButton = ({ orgId, disabled, className }: NewBoardButtonProps) => {
  const router=useRouter();
  const { mutate, pending } = useApiMutation(api.board.create)
  const [isHovered, setIsHovered] = useState(false)

  const handleCreate = () => {
    if (!orgId) {
      toast.error("Organization ID is required")
      return
    }

    toast.promise(
      mutate({
        orgId,
        title: "New Board",
      }),
      {
        loading: "Creating new board...",
        success: "Board created successfully!",
        error: "Failed to create board",
      },
    )
  }

  return (
    <Button
      disabled={disabled || pending}
      onClick={handleCreate}
      variant="outline"
      size="lg"
      className={cn(
        "h-auto w-full relative p-6 flex flex-col items-center justify-center gap-2",
        "bg-card hover:bg-card/80 border-dashed border-2",
        "transition-all duration-300",
        isHovered && "border-primary/50",
        pending && "opacity-70 cursor-not-allowed",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Create new board"
    >
      {pending ? (
        <>
          <Skeleton className="h-6 w-6 rounded-full mb-2" />
          <Skeleton className="h-4 w-24" />
        </>
      ) : (
        <>
          <div className="rounded-full bg-primary/10 p-2 mb-2">
            <Plus className={cn("h-6 w-6 text-primary/80", isHovered && "text-primary")} />
          </div>
          <span className="font-medium">Create Board</span>
        </>
      )}
    </Button>
  )
}
