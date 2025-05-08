'use client';

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Footer } from "./footer";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

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
