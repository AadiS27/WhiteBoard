'use client';

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Hint } from "@/components/hint";
import { Separator } from "./seperator";
import { useRenameModal } from "../../../../store/use-rename-modal";
import { Action } from "@/components/action";
import { Menu } from "lucide-react";


interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export const Info = ({ boardId }: InfoProps) => {
  const router = useRouter()
const { onOpen } = useRenameModal();
  const handleClick = () => {
    router.push("/")
  }

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  })

  if (!data) {
    return (
      <div className="absolute top-2 right-2 bg-white rounded-md px-3 h-12 flex items-center shadow-md">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" height={40} width={40} />
        
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-2 right-2 bg-white rounded-md px-3 h-12 flex items-center shadow-md">
      <div className="flex items-center gap-2">
        <Hint label="Go to dashboard">
          <Button className="p-0 h-9" variant="ghost" onClick={handleClick}>
            <Image src="/logo.svg" alt="Logo" height={40} width={40} />
            <span className={cn("font-semibold text-xl ml-2", font.className)}>Boardly</span>
          </Button>
        </Hint>

        <Separator className="h-6" orientation="vertical" />
        <Hint label="Rename board">
        <Button className="font-normal text-sm h-auto p-1" variant="ghost" onClick={()=>onOpen(data._id,data.title)}>
          {data.title}
        </Button>
        </Hint>
        <Separator className="h-6" orientation="vertical" />
        <Action
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={5}>
            <div>
                <Hint label="Main menu" >
                <Button variant="ghost" className="h-9 w-9 p-0">
                    <Menu/>
                </Button>
                </Hint>
            </div>
        </Action>
      </div>
    </div>
  )
}
