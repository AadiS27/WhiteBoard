"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@liveblocks/react/suspense";

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
    const info=useOther(connectionId,(user)=>user?.info);
    const cursor=useOther(connectionId,(user)=>user.presence.cursor);
    const name=info?.name||"Teammate";

    console.log({info});

    if(!cursor) {
        return null;
    }
    
    const { x, y } = cursor;
return(
   <foreignObject
   style={{
    transform:`translateX(${x}px) translateY(${y}px)`,
   }}
   height={50}
   width={name.length*10+24}
   className="relative drop-shadow-md">
   
    <MousePointer2
    className="h-5 w-5"
    style={{
         fill: `hsl(${(connectionId * 40) % 360}, 80%, 60%)`,
            color: `hsl(${(connectionId * 40) % 360}, 80%, 60%)`,
    }}/>
    <div
    className="absolute left-0 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
    style={{
        backgroundColor: `hsl(${(connectionId * 40) % 360}, 80%, 60%)` }}>
        {name}
    </div>
   </foreignObject>
)})

Cursor.displayName = "Cursor";