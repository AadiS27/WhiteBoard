'use client';

import { UserAvatar } from "./user-avatar";

import { useOthers,useSelf } from "@liveblocks/react/suspense";

const MAX_PARTICIPANTS = 2;
export const Participants = () => {
    const others = useOthers();
    const self = useSelf();
    const hasOthers = others.length > MAX_PARTICIPANTS;
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
            <div className="flex gap-x-2">
            {others.slice(0, MAX_PARTICIPANTS).map(({ connectionId, info }) => {
                return (
                    <UserAvatar
                        key={connectionId}
                        src={info?.imageUrl}
                        name={info?.name}
                        fallback={info?.name?.charAt(0)}
                        bordercolor="border-2 border-white"
                    />
                )
            })}

            {self&&(
                <UserAvatar
                src={self.info?.imageUrl}
                name={`${self.info?.name} (you)`}
                fallback={self.info?.name?.charAt(0)}
                />
            )}

            {hasOthers && (
                <UserAvatar
                    fallback={`+${others.length - MAX_PARTICIPANTS}`}
                    bordercolor="border-2 border-white"
                />
            )}
            </div>
        </div>
    );
}