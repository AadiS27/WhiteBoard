'use client';

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Footer } from "./footer";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Action } from "@/components/action";
import { MoreHorizontal } from "lucide-react";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavourite: boolean;
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
  const { userId } = useAuth();
  const authorLabel = authorId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`} className="group w-full">
      <div className="rounded-xl overflow-hidden bg-card border border-border shadow-sm transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring">
        <div className="relative w-full h-32">
          <Image
            src={imageUrl || "/1.png"}
            alt={title}
            fill
            className="object-cover"
          />
          <Action id={id} title={title} side="right" sideOffset={10}>
            <button className="absolute top-1 right-1  opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none z-50">
            <MoreHorizontal className="text-muted-foreground opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Action>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold truncate">{title}</h3>
          <Footer
            isFavourite={isFavourite}
           
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            onClick={() => {}}
            disabled={false}
          />
        </div>
      </div>
    </Link>
  );
};
