'use client';

import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import { memo } from "react";
import { useSelectionBounds } from "../../../../../hooks/use-selection";
import { ColorPicker } from "./color";
import { useDeleteLayers } from "../../../../../hooks/use-delete";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2, Trash2Icon } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();

    const deletLayers=useDeleteLayers();

    const moveToBack=useMutation(({storage})=>{
    
        const liveLayersIds=storage.get("layersIds");

        const indices:number[]=[];

        const arr=liveLayersIds.toArray();

        for(let i=0;i<arr.length;i++){
            if(selection.includes(arr[i])){
                indices.push(i);
            }
        }

        for (let i=0;i<indices.length;i++){
            liveLayersIds.move(indices[i],i);
        
        }
    },[selection])

    const moveToFront=useMutation(({storage})=>{
    
        const liveLayersIds=storage.get("layersIds");

        const indices:number[]=[];

        const arr=liveLayersIds.toArray();

        for(let i=0;i<arr.length;i++){
            if(selection.includes(arr[i])){
                indices.push(i);
            }
        }

        for(let i=indices.length-1;i>=0;i--){
            liveLayersIds.move(indices[i],arr.length-1-i);
        }
    },[selection])


    const setFill=useMutation(({
        storage
    },fill:Color)=>{
        const liveLayers=storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id)=>{
            liveLayers.get(id)?.set("fill",fill);
        })
    },[selection,setLastUsedColor]);
    if (!selectionBounds) return null;

    const x = selectionBounds.x + selectionBounds.width / 2 + camera.x;
    const y = selectionBounds.y + camera.y - 16;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -100%)`,
        }}
      >
        <ColorPicker
        onChange={setFill}/>
        <div className="flex flex-col items-center gap-y-3 pl-2 ml-2 border-l border-gray-200">
           <Hint label="Bring to front" side="right">
            <Button variant="board" size='icon' onClick={moveToFront}>
            <BringToFront/>
            </Button>
           </Hint>
           <Hint label="Send to Back" side="right">
            <Button variant="board" size='icon' onClick={moveToBack}>
            <SendToBack/>
            </Button>
           </Hint>
        <Hint label="Delete" side="right">
        <Button variant="board" size='icon' onClick={deletLayers}>
            <Trash2/>
        </Button>
        </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
