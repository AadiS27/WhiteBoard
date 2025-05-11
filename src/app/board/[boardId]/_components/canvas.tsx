'use client';
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCallback, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@liveblocks/react";
import { CursorPresence } from "./cursor-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { useOthersMapped } from "@liveblocks/react/suspense";
import { set } from "date-fns";

interface CanvasProps {
    boardId: string;
}

const MAX_LAYERS=1000;

export const Canvas=({boardId}:CanvasProps)=>{
    const layerIds=useStorage((root)=>root.layersIds);

      const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });
    const [camera,setCamera]=useState<Camera>({x:0,y:0});

    const onWheel=useCallback((e:React.WheelEvent)=>{
        setCamera((camera)=>({
            x:camera.x-e.deltaX,
            y:camera.y-e.deltaY,
        }))
        },[])

    const history=useHistory();
    const canUndo=useCanUndo();
    const canRedo=useCanRedo();


    const insertLayer=useMutation(({storage,setMyPresence},layerType:LayerType.Ellipse|LayerType.Note|LayerType.Rectangle|LayerType.Text,position:Point)=>
    {
      const liveLayers=storage.get("layers");
      if(liveLayers.size>=MAX_LAYERS) {
        return;
      }
      const liveLayerIds=storage.get("layersIds");
      const layerId=nanoid();
      const layer=new LiveObject({
        type:layerType,
        x:position.x,
        y:position.y,
        width:100,
        height:100,
        fill:lastUsedColor,
      })
      liveLayerIds.push(layerId);
      liveLayers.set(layerId,layer);


      setMyPresence({selection:[layerId]},{addToHistory:true});
        setCanvasState({
            mode:CanvasMode.None,
        });

    },[lastUsedColor]);

    const onPointerUp=useMutation(({},e)=>{
        const point =pointerEventToCanvasPoint(e,camera);

        if(canvasState.mode==CanvasMode.Inserting){
            insertLayer(canvasState.layerType,point);
        }
        else{
            setCanvasState
            ({
                mode:CanvasMode.None,
            });
        }
        history.resume
    },[
        camera,
        canvasState,
        history,
        insertLayer
    ])

    const selection =useOthersMapped((other)=>
        other.presence.selection
);
const connectionIdToColor = (connectionId: number) => {
  return `hsl(${(connectionId * 40) % 360}, 80%, 60%)`;
}
const layerIdsToColorSelection=useMemo(()=>{
    const layerIdsToColorSelection:Record<string,string>={};

    for (const user of selection){
        const[connectionId,selection]=user;
        for (const layerId of selection){
            layerIdsToColorSelection[layerId]=connectionIdToColor(connectionId);
        }
    }
    return layerIdsToColorSelection;
},[selection]);

const onLayerPointerDown=useMutation((
    {self,setMyPresence},
    e:React.PointerEvent,
    layerId:string
)=>{
    if(canvasState.mode==CanvasMode.Pencil||canvasState.mode==CanvasMode.Inserting){
        return;
    }
    history.pause();
    e.stopPropagation();
    const point=pointerEventToCanvasPoint(e,camera);
    if(!self.presence.selection.includes(layerId)){
        setMyPresence({
            selection:[layerId],
        },{addToHistory:true});
        
    }
    setCanvasState({mode:CanvasMode.Translating,current:point});
},[
    setCanvasState,
    camera,
    history,
    canvasState.mode
])

    const onPointerMove=useMutation(({setMyPresence},e:React.PointerEvent)=>{
        e.preventDefault();
    
        const current=pointerEventToCanvasPoint(e,camera);
        
        // console.log({current});
        setMyPresence({cursor:current});
    },[])

    const onPointerLeave=useMutation(({setMyPresence})=>{
        setMyPresence({cursor:null});
    }
    ,[])

    return (
        
        <main className="h-full w-full relative bg-neutral-300 touch-none">
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            canRedo={canRedo}
            canUndo={canUndo}
            undo={history.undo}
            redo={history.redo}/>
            <svg className="h-[100vh] w-[100vw]"
            onWheel={onWheel}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}>
                <g
                style={{
                    transform: `translate(${camera.x}px, ${camera.y}px)`,
                }}>
                    {layerIds?.map((layerId)=>(
                        <LayerPreview
                        key={layerId}
                        id={layerId}
                        onLayerPointerDown={onLayerPointerDown}
                        selectionColor={layerIdsToColorSelection[layerId]}
                        />
                    ))}
                    <CursorPresence/>
                </g>
            </svg>
        </main>
    );
}