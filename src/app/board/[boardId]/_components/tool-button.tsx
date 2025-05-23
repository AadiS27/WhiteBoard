'use client';

import { LucideIcon } from "lucide-react";
import { Hint } from "@/components/hint";

import { Button } from "@/components/ui/button";

interface ToolButtonProps {
    label:string;
    icon:LucideIcon;
    onClick:()=>void;
    isActive?:boolean;
    isDisabled?:boolean;
}

export const ToolButton = ({ label, icon:Icon, onClick, isActive, isDisabled }:ToolButtonProps) => {
return(
    <Hint label={label}>
        <Button
        disabled={isDisabled}
        onClick={onClick}
        variant={isActive ? "board" : "ghost"}>
            <Icon/>
        </Button>
    </Hint>
)
}