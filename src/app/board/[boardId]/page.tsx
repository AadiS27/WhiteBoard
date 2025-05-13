import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { LoadingScreen } from "./_components/canvas-loading";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardIdPage = async({
     params
}:BoardIdPageProps) => {
    const parames = await params;
     const boardId =  parames.boardId;
    return (
        <Room roomId={boardId} fallback={<LoadingScreen/>}>
        <Canvas boardId={boardId}/>
       </Room>
    );
    }
export default BoardIdPage;