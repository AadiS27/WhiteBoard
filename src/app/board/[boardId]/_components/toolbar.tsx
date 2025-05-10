'use client';

import { Circle, MousePointer2, Pen, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";



interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (state: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo
}: ToolbarProps
) => {
return(
    <div className="absolute right-[50%] bottom-2 translate-x-[50%]  rounded-md p-3 h-12 flex items-center ">
        <div className="bg-white rounded-md p-2 flex gap-x-2 items-center shadow-md">
         <ToolButton
         label="Select"
         icon={MousePointer2 }
            onClick={()=>setCanvasState({mode:CanvasMode.None})}
            isActive={
                canvasState.mode === CanvasMode.None||
                canvasState.mode === CanvasMode.Translating||
                canvasState.mode === CanvasMode.SelectionNet||
                canvasState.mode === CanvasMode.Pressing||
                canvasState.mode === CanvasMode.Resizing
            }
            />
              <ToolButton
         label="Text"
         icon={Type }
            onClick={()=>setCanvasState({
                mode:CanvasMode.Inserting,
            layerType:LayerType.Text})}
            isActive={
                canvasState.mode === CanvasMode.Inserting&&
                canvasState.layerType === LayerType.Text
            }
            />
            <ToolButton
            label="Sticky Note"
            icon={StickyNote }
            onClick={()=>setCanvasState({
                mode:CanvasMode.Inserting,
            layerType:LayerType.Note})}
             isActive={
                canvasState.mode === CanvasMode.Inserting&&
                canvasState.layerType === LayerType.Note
            }
            />
            <ToolButton
            label="Rectangle"
            icon={Square }
             onClick={()=>setCanvasState({
                mode:CanvasMode.Inserting,
            layerType:LayerType.Rectangle})}
             isActive={
                canvasState.mode === CanvasMode.Inserting&&
                canvasState.layerType === LayerType.Rectangle
            }
            />
            <ToolButton
            label="Ellipse"
            icon={Circle }
             onClick={()=>setCanvasState({
                mode:CanvasMode.Inserting,
            layerType:LayerType.Ellipse})}
             isActive={
                canvasState.mode === CanvasMode.Inserting&&
                canvasState.layerType === LayerType.Ellipse
            }
            />
            <ToolButton
            label="Pencil"
            icon={Pen}
            onClick={()=>setCanvasState({
                mode:CanvasMode.Pencil})}
             isActive={
                canvasState.mode === CanvasMode.Pencil
            }
            />
        </div>
        <div className="bg-white rounded-md p-2 flex gap-x-2 items-center shadow-md ml-2">
        <ToolButton
            label="Undo"
            icon={Undo2}
            onClick={undo}
            isDisabled={!canUndo}
            />
            <ToolButton
            label="Redo"
            icon={Redo2}
            onClick={redo}
            isDisabled={!canRedo}
            />
        </div>
    </div>
)

}