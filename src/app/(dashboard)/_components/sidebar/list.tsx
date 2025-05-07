'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { SidebarItems } from "./items";

export const OrgList = () => {
const {userMemberships} = useOrganizationList({
    userMemberships:{
        infinite:true,
    }
})

if(!userMemberships.data?.length) return null;

return(
    <ul className="space-y-4">
        {userMemberships.data.map((mem) => (
           <SidebarItems
                key={mem.organization.id}
                id={mem.organization.id}
                name={mem.organization.name}
                icon={mem.organization.imageUrl || ""}
            />
        ))
}

    </ul>
)
}