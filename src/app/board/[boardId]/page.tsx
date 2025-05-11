import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { LoadingScreen } from "./_components/canvas-loading";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = async({
     params
}:BoardIdPageProps) => {
     const boardId =  params.boardId;
    return (
        <Room roomId={boardId} fallback={<LoadingScreen/>}>
        <Canvas boardId={boardId}/>
       </Room>
    );
    }
export default BoardIdPage;