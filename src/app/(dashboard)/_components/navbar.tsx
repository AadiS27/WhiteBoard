'use client'

import { OrganizationSwitcher, useOrganization, UserButton } from "@clerk/nextjs";

import { SearchInput } from "./search-input";
import { Invite } from "./invite";

export const Navbar = () => {
    const {organization}=useOrganization();
    return (
       <div className="flex items-center p-5 gap-x-4 ">
        <div className="hidden lg:flex-1 lg:flex">
          <SearchInput/>
            
        </div>
        <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
  hidePersonal
  appearance={{
    elements: {
      rootBox:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
      organizationSwitcherTrigger:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        backgroundColor: "#F9FAFB",
        color: "#111827",
        fontSize: "3rem",
        fontWeight: 600,
      },
      organizationPreview: "gap-2",
      organizationAvatar: "w-5 h-5",
    },
  }}
/>
        </div>
        {organization&&(
        <Invite/>
    )}
        <UserButton/>
       </div>
    );
    }