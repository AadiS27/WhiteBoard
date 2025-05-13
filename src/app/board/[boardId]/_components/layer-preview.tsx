'use client';
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { color } from "framer-motion";
import { colorToHex } from "@/lib/utils";
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
        case LayerType.Path:
            return (
                <Path
                key={id}
                points={layer.points}
                onPointerDown={(e)=>onLayerPointerDown(e,id)}
                x={layer.x}
                y={layer.y}
                fill={layer.fill?colorToHex(layer.fill):"transparent"}
                stroke={selectionColor || undefined}/>
            )
                case LayerType.Note:
            return(
                <Note
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return(
                <Text
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
                />
            )
        case LayerType.Ellipse:
            return(
                <Ellipse
                id={id}
                layer={layer}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}/>
            )
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
            // Handle unknown layer type
            console.error(`Unknown layer type: ${(layer as any).type}`);
            return null;
    }
    return (
       
       <div>

       </div>
    );
})

LayerPreview.displayName = "LayerPreview";