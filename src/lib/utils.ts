import { Camera } from "@/types/canvas"
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
