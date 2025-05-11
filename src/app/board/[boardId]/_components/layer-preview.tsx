'use client';
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Rectangle } from "./rectangle";
interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent,layerId:string) => void;
    selectionColor: string | null;
}

export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor,
}: LayerPreviewProps) => {
     const layer=useStorage((root)=>root.layers.get(id));
     if (!layer) {
        return null;
     }

     switch (layer.type) {
        case LayerType.Rectangle:
            return(
               <Rectangle
               id={id}
                layer={layer}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
               />
            );
        default:
            console.warn("Unknown layer type",layer.type);
            return null;
    }
    return (
       
       <div>

       </div>
    );
})

LayerPreview.displayName = "LayerPreview";