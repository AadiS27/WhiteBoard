import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    src?:string;
    name?:string;
    fallback?:string;
    bordercolor?:string;
}

export const UserAvatar = ({ src, name, fallback, bordercolor }: UserAvatarProps) => {
    return (
        <Hint label={name||"Teamate"}>
            <Avatar className={`w-8 h-8 ${bordercolor}`}>
                <AvatarImage src={src} alt={name} />
                <AvatarFallback className="text-xs font-bold">{fallback}</AvatarFallback>
            </Avatar>
        </Hint>
    );
};