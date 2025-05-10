'use client';

import { Circle, MousePointer2, Pen, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"

export const Toolbar = () => {
return(
    <div className="absolute right-[50%] bottom-2 translate-x-[50%]  rounded-md p-3 h-12 flex items-center ">
        <div className="bg-white rounded-md p-2 flex gap-x-2 items-center shadow-md">
         <ToolButton
         label="Select"
         icon={MousePointer2 }
            onClick={()=>{}}
            isActive={false}
            />
              <ToolButton
         label="Text"
         icon={Type }
            onClick={()=>{}}
            isActive={false}
            />
            <ToolButton
            label="Sticky Note"
            icon={StickyNote }
            onClick={()=>{}}
            isActive={false}
            />
            <ToolButton
            label="Rectangle"
            icon={Square }
            onClick={()=>{}}
            isActive={false}
            />
            <ToolButton
            label="Ellipse"
            icon={Circle }
            onClick={()=>{}}
            isActive={false}
            />
            <ToolButton
            label="Pen"
            icon={Pen}
            onClick={()=>{}}
            isActive={false}
            />
        </div>
        <div className="bg-white rounded-md p-2 flex gap-x-2 items-center shadow-md ml-2">
        <ToolButton
            label="Undo"
            icon={Undo2}
            onClick={()=>{}}
            isDisabled={true}
            />
            <ToolButton
            label="Redo"
            icon={Redo2}
            onClick={()=>{}}
            isDisabled={true}
            />
        </div>
    </div>
)

}