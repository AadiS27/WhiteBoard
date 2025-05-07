import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "./ui/tooltip";

export interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

export const Hint = ({
    label,
    children,
    side = "top",
    align = "center",
    sideOffset = 4,
    alignOffset = 0,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                className="text-white bg-black border-black"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

