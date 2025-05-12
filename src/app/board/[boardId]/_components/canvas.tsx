'use client';
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCallback, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@liveblocks/react";
import { CursorPresence } from "./cursor-presence";
import { findIntersectingLayersWithRectangle, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { useOthersMapped } from "@liveblocks/react/suspense";
import { set } from "date-fns";
import { SelectionBox } from "./selectionbox";
import { SelectionTools } from "./selectiontools";
import { update } from "../../../../../convex/board";

interface CanvasProps {
    boardId: string;
}

const MAX_LAYERS=1000;
const SELECTION_NET_SIZE=5;
export const Canvas=({boardId}:CanvasProps)=>{
    const layerIds=useStorage((root)=>root.layersIds);

      const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
        const history=useHistory();
    const canUndo=useCanUndo();
    const canRedo=useCanRedo();
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0,
    });
    const [camera,setCamera]=useState<Camera>({x:0,y:0});


    const onResizePointerDown=useCallback((
        corner:Side,
        initialBounds:XYWH
    )=>{
        history.pause();
        setCanvasState({
            mode:CanvasMode.Resizing,
            corner,
            initialBounds,
        });

    },[history])




    const onWheel=useCallback((e:React.WheelEvent)=>{
        setCamera((camera)=>({
            x:camera.x-e.deltaX,
            y:camera.y-e.deltaY,
        }))
        },[])




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

const unSelectLayers=useMutation((
    {self,setMyPresence}
)=>{
    if(self.presence.selection.length>0) {
        setMyPresence({
            selection:[],
        },{addToHistory:true});
    };
}
,[])

const updateSelectionNet=useMutation((
    {storage,setMyPresence},
    current:Point,
    origin:Point
)=>{
    const layers=storage.get("layers").toImmutable();
    setCanvasState({
        mode:CanvasMode.SelectionNet,
        current,
        origin,
    })

    const ids=findIntersectingLayersWithRectangle(
        layerIds ?? [],
        layers,
        origin,
        current
    )
    setMyPresence({
        selection:ids,
    });
},[layerIds]);

const startMultiSelection=useCallback((
    current:Point,
    origin:Point
)=>{
    if(Math.abs(current.x-origin.x)+Math.abs(current.y-origin.y)>SELECTION_NET_SIZE){
        console.log("start multi selection");
        setCanvasState({
            mode:CanvasMode.SelectionNet,
            origin,
            current})
    }
}
,[])


const resizeSelectedLayers=useMutation(({storage,self},point:Point)=>{
    if(canvasState.mode!==CanvasMode.Resizing) return;
    const bounds=resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point)

        const liveLayers=storage.get("layers");
        const layer=liveLayers.get(self.presence.selection[0]);

        if(layer){
            layer.update(bounds);
        }
},[canvasState]);


const translateSelectedLayers=useMutation((
    {storage,self},
    point:Point
)=>{
    if(canvasState.mode!==CanvasMode.Translating) return;

    const offset={
        x:point.x-canvasState.current.x,
        y:point.y-canvasState.current.y,
    }
    const liveLayers=storage.get("layers");

    for(const id of self.presence.selection){
        const layer=liveLayers.get(id);

        if(layer){
            layer.update({
                x:layer.get("x")+offset.x,
                y:layer.get("y")+offset.y,
            });
        }
    }
    setCanvasState({
        mode:CanvasMode.Translating,
        current:point,
    });
},[
    canvasState
])



    const onPointerUp=useMutation(({},e)=>{
        const point =pointerEventToCanvasPoint(e,camera);

        if(canvasState.mode==CanvasMode.None||canvasState.mode==CanvasMode.Pressing){
            unSelectLayers();

            setCanvasState({
                mode:CanvasMode.None,
            });
            return;
        }else if(canvasState.mode==CanvasMode.Inserting){
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
        insertLayer,
        unSelectLayers,
    ])

const onPointerDown=useCallback((
    e:React.PointerEvent 
)=>{
    const point=pointerEventToCanvasPoint(e,camera);
    if(canvasState.mode==CanvasMode.Pencil||canvasState.mode==CanvasMode.Inserting){
        return;
    }

    setCanvasState({origin:point,mode:CanvasMode.Pressing});
},[camera,canvasState.mode,setCanvasState])


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


        if(canvasState.mode==CanvasMode.Pressing){
            startMultiSelection(current,canvasState.origin);
        }else if(canvasState.mode==CanvasMode.SelectionNet){
          updateSelectionNet(current,canvasState.origin);
        }else if(canvasState.mode===CanvasMode.Translating){
            translateSelectedLayers(current);
        
        }else if(canvasState.mode===CanvasMode.Resizing){
            resizeSelectedLayers(current);
        }
       
        setMyPresence({cursor:current});
    },[canvasState,resizeSelectedLayers,camera,translateSelectedLayers])

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

            <SelectionTools
            camera={camera}
            setLastUsedColor={setLastUsedColor}
            />
            <svg className="h-[100vh] w-[100vw]"
            onWheel={onWheel}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}>
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
                    <SelectionBox
                    onResizePointerDown={onResizePointerDown}/>
                    {canvasState.mode==CanvasMode.SelectionNet&&canvasState.current!=null&&(
                        <rect
                        className="fill-blue-500/5 stroke-blue-500 stroke-1"
                        x={Math.min(canvasState.origin.x,canvasState.current.x)}
                        y={Math.min(canvasState.origin.y ,canvasState.current.y)}
                        width={Math.abs(canvasState.origin.x-canvasState.current.x)}
                        height={Math.abs(canvasState.origin.y-canvasState.current.y)}/>
                    )}
                    <CursorPresence/>
                </g>
            </svg>
        </main>
    );
}