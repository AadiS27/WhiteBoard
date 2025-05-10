"use client";

import { ReactNode, use } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useSelf } from "@liveblocks/react/suspense";


interface RoomProps {
    children: ReactNode;
    roomId: string;   
    fallback?:NonNullable<ReactNode>|null;
}
export function Room({ children ,roomId,fallback}: RoomProps) {
  
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}