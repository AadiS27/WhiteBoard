"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Footer } from "./footer"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { Action } from "@/components/action"
import { MoreHorizontal, Sparkles } from "lucide-react"
import { useApiMutation } from "../../../../../hooks/use-api-mutation"
import { api } from "../../../../../convex/_generated/api"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavourite: boolean
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavourite,
}: BoardCardProps) => {
  const { userId } = useAuth()
  const authorLabel = authorId === userId ? "You" : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

  const { mutate: onFavourite, pending: pendingFavourite } = useApiMutation(api.board.favourite)
  const { mutate: onUnfavourite, pending: pendingUnfavourite } = useApiMutation(api.board.unfavourite)

  const handleFavourite = () => {
    if (isFavourite) {
      onUnfavourite({ id }).catch(() => toast.error("Failed to unfavourite board"))
    } else {
      onFavourite({ id, orgId }).catch(() => toast.error("Failed to favourite board"))
    }
  }

  return (
    <Link href={`/board/${id}`} className="group block w-full">
      <div
        className="relative rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 
                    hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative w-full h-40 overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10",
              isFavourite && "from-yellow-900/60",
            )}
          />

          <Image
            src={imageUrl || "/1.png"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {isFavourite && (
            <div className="absolute top-2 left-2 z-20 bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Favorite</span>
            </div>
          )}

          <Action id={id} title={title} side="right" sideOffset={10}>
            <button
              className="absolute top-2 right-2 z-20 bg-black/20 backdrop-blur-sm rounded-full p-1.5
                        opacity-0 group-hover:opacity-100 transition-all duration-200
                        hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="More options"
            >
              <MoreHorizontal className="text-white w-4 h-4" />
            </button>
          </Action>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">{title}</h3>

          <Footer
            isFavourite={isFavourite}
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            onClick={handleFavourite}
            disabled={pendingFavourite || pendingUnfavourite}
          />
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-xl pointer-events-none transition-all duration-300" />
      </div>
    </Link>
  )
}
