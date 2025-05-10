import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { LoadingScreen } from "./_components/canvas-loading";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = ({
    params
}:BoardIdPageProps) => {
    return (
        <Room roomId={params.boardId} fallback={<LoadingScreen/>}>
        <Canvas boardId={params.boardId}/>
       </Room>
    );
    }
export default BoardIdPage;