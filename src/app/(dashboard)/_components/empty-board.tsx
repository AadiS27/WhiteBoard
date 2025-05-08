import { Button } from "@/components/ui/button";
import Image from "next/image";

export const EmptyBoard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
           <Image src="/board.avif" height={250} width={250} alt="Empty state illustration" className="object-contain" />
            <h1 className="text-2xl font-bold">No boards found</h1>
            <p className="text-gray-500">Create a new board to get started.</p>
            <Button className="mt-4" variant="outline">
                Create Board
            </Button>
        </div>
    );
}