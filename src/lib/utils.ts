import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/canvas"
import { clsx, type ClassValue } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pointerEventToCanvasPoint(
  e:React.PointerEvent,
  camera:Camera
){
return{
  x:Math.round(e.clientX)-camera.x,
  y:Math.round(e.clientY)-camera.y
}
}

export function colorToHex(color:Color){
  return `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b)
    .toString(16)
    .slice(1)}`;
}


export function resizeBounds(bounds:XYWH,corner:Side,point:Point):XYWH{
  const result={
    x:bounds.x,
    y:bounds.y,
    width:bounds.width,
    height:bounds.height,
  }

  if((corner&Side.Left)===Side.Left){
    result.x=Math.min(point.x,bounds.x+bounds.width);
    result.width=Math.abs(bounds.x+bounds.width-point.x);

  }
  if((corner&Side.Right)===Side.Right){
    result.x=Math.min(point.x,bounds.x);
    result.width=Math.abs(point.x-bounds.x);
  }

  if((corner&Side.Top)===Side.Top){
    result.y=Math.min(point.y,bounds.y+bounds.height);
    result.height=Math.abs(bounds.y+bounds.height-point.y);
  }
  if((corner&Side.Bottom)===Side.Bottom){
    result.y=Math.min(point.y,bounds.y);
    result.height=Math.abs(point.y-bounds.y);
  }

  return result;
}


export function findIntersectingLayersWithRectangle(
  layersIds:readonly string[],
  layers:ReadonlyMap<string,Layer>,
  a:Point,
  b:Point,
){
  const rect={
    x:Math.min(a.x,b.x),
    y:Math.min(a.y,b.y),
    width:Math.abs(a.x-b.x),
    height:Math.abs(a.y-b.y),
  }
  const ids=[];

  for (const layersId of layersIds){
    const layer=layers.get(layersId);

    if(layer==null){
      continue;
    }
    const {x,y,width,height}=layer;
    if(
      rect.x+rect.width>=x &&
      rect.x<=x+width &&
      rect.y+rect.height>=y &&
      rect.y<=y+height){
        ids.push(layersId);
      }
  }
  return ids;
}



export function getContrastingColor(color:Color){
  const brightness=(color.r*299+color.g*587+color.b*114)/1000;
  return brightness>128?"#000":"#fff";
}

export function penPointsToPath(
  points:number[][],
  color:Color,
):PathLayer{
  if(points.length<2){
    throw new Error("Not enough points to create a path");
  }

  let left=Number.POSITIVE_INFINITY;
  let right=Number.NEGATIVE_INFINITY;
  let top=Number.POSITIVE_INFINITY;
  let bottom=Number.NEGATIVE_INFINITY;

  for (const point of points){
    const [x,y]=point;
   if(x<left){
    left=x;
   }
    if(x>right){
      right=x;
    }
    if(y<top){
      top=y;
    }
    if(y>bottom){
      bottom=y;
    }
  }
  return{
    type:LayerType.Path,
    x:left,
    y:top,
    width:right-left,
    height:bottom-top,
    fill:color,
    points:points.map(([x,y,pressure])=>[x-left,y-top,pressure]),
  }
}


export function getSvgPathFromStroke(stroke:number[][]){
  if(!stroke.length){
    return"";
  }
  
  const d=stroke.reduce((acc,[x0,y0],i,arr)=>{
    const [xi,yi]=arr[(i+1)%arr.length];
    acc.push(x0,y0,(x0+xi)/2,(y0+yi)/2);
    return acc;
  },
["M",...stroke[0], "Q"]
);
d.push("Z");
  return d.join(" ");
  
}