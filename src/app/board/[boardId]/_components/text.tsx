import { Kalam } from "next/font/google";
import ContentEditable,{ContentEditableEvent} from "react-contenteditable";

import { TextLayer } from "@/types/canvas";
import {cn,colorToHex} from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const kalam=Kalam({
    subsets:["latin"],
    weight:"400",
    variable:"--font-kalam",
    display:"swap",
});

const calculateFontSize=(width:number,height:number)=>{
    const maxFontSize=96;
    const scaleFactor=0.5;
    const fontSizeBasedOnWidth=width*scaleFactor;
    const fontSizeBasedOnHeight=height*scaleFactor;

    return Math.min(maxFontSize,fontSizeBasedOnWidth,fontSizeBasedOnHeight);
}

interface TextProps{
    id:string;
    layer:TextLayer;
    onPointerDown:(e:React.PointerEvent,id:string)=>void;
    selectionColor:string|null;
}

export const Text=({
    layer,
    onPointerDown,
    id,
    selectionColor}:TextProps)=>{
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
        }}>
            <ContentEditable
            html={value||"Text"}
            onChange={handleChange}
            className={cn(
                "w-full h-full flex items-center justify-center text-center drop-shadow-md outline-none",kalam.className,
            )}
            style={{
                fontSize:calculateFontSize(width,height),
                color:fill?colorToHex(fill):"#000",
            }}/>
        </foreignObject>
    )
    }