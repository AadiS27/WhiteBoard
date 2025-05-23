import { Kalam } from "next/font/google";
import ContentEditable,{ContentEditableEvent} from "react-contenteditable";

import { NoteLayer } from "@/types/canvas";
import {cn,colorToHex, getContrastingColor} from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const kalam=Kalam({
    subsets:["latin"],
    weight:"400",
    variable:"--font-kalam",
    display:"swap",
});

const calculateFontSize=(width:number,height:number)=>{
    const maxFontSize=96;
    const scaleFactor=0.15;
    const fontSizeBasedOnWidth=width*scaleFactor;
    const fontSizeBasedOnHeight=height*scaleFactor;

    return Math.min(maxFontSize,fontSizeBasedOnWidth,fontSizeBasedOnHeight);
}

interface NoteProps{
    id:string;
    layer:NoteLayer;
    onPointerDown:(e:React.PointerEvent,id:string)=>void;
    selectionColor:string|null;
}

export const Note=({
    layer,
    onPointerDown,
    id,
    selectionColor}:NoteProps)=>{
    const {x,y,width,height,fill,value}=layer;
    

    const updateValue=useMutation((
        {storage},newValue:string
    )=>{
        const liveLayers=storage.get("layers");
        liveLayers.get(id)?.set("value",newValue);
    },[]);

    const handleChange=(e:ContentEditableEvent)=>{
        updateValue(e.target.value);
    }
    return(
        <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e)=>onPointerDown(e,id)}
        style={{
            outline:selectionColor?`2px solid ${selectionColor}`:"none",
            backgroundColor:fill?colorToHex(fill):"transparent",
        }}
        className="drop-shadow-xl shadow-md">
            <ContentEditable
            html={value||"Text"}
            onChange={handleChange}
            className={cn(
                "w-full h-full flex items-center justify-center text-center  outline-none",kalam.className,
            )}
            style={{
                fontSize:calculateFontSize(width,height),
                color:fill?getContrastingColor(fill):"#000",
            }}/>
        </foreignObject>
    )
    }