"use client";

import Image from "next/image";
import { useOrganization,useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface SidebarItemsProps {
    id: string;
    name: string;
    icon: string;
}

export const SidebarItems = ({
    id,
    name,
    icon,
}: SidebarItemsProps) => {
    const {organization} = useOrganization();
    const {setActive} = useOrganizationList();

    const isActive = organization?.id === id;

    const handleClick = () => {
    if (isActive) return
    if (setActive) {
      setActive({ organization: id })
    }
  }
    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={10} alignOffset={-10}>
            <Image
                src={icon}
                onClick={handleClick}
                alt={name}
                fill
                className={cn(
                    "rounded-md cursor-pointer opacity-60 hover:opacity-100 transition",
                    isActive && "opacity-100"
                )}
            />
            </Hint>
          
        </div>
    );  
}