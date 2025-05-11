import { Camera, Color } from "@/types/canvas"
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
