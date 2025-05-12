"use client"

import type React from "react"

import { useState } from "react"
import { colorToHex } from "@/lib/utils"
import type { Color } from "@/types/canvas"
import { Check } from "lucide-react"

interface ColorPickerProps {
  onChange: (color: Color) => void
  selectedColor?: Color
}

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`

// Extended color palette with more options
const COLORS: Color[] = [
  // Blacks & Grays
  { r: 0, g: 0, b: 0 }, // Black
  { r: 51, g: 51, b: 51 }, // Dark Gray
  { r: 102, g: 102, b: 102 }, // Medium Gray
  { r: 153, g: 153, b: 153 }, // Light Gray
  { r: 204, g: 204, b: 204 }, // Lighter Gray
  { r: 255, g: 255, b: 255 }, // White

  // Reds
  { r: 244, g: 67, b: 54 }, // Red
  { r: 229, g: 115, b: 115 }, // Light Red
  { r: 183, g: 28, b: 28 }, // Dark Red
  { r: 255, g: 138, b: 128 }, // Coral

  // Oranges
  { r: 255, g: 152, b: 0 }, // Orange
  { r: 255, g: 183, b: 77 }, // Light Orange
  { r: 230, g: 81, b: 0 }, // Dark Orange

  // Yellows
  { r: 255, g: 235, b: 59 }, // Yellow
  { r: 255, g: 245, b: 157 }, // Light Yellow
  { r: 249, g: 168, b: 37 }, // Amber

  // Greens
  { r: 76, g: 175, b: 80 }, // Green
  { r: 165, g: 214, b: 167 }, // Light Green
  { r: 27, g: 94, b: 32 }, // Dark Green
  { r: 46, g: 125, b: 50 }, // Forest Green

  // Blues
  { r: 33, g: 150, b: 243 }, // Blue
  { r: 144, g: 202, b: 249 }, // Light Blue
  { r: 13, g: 71, b: 161 }, // Dark Blue
  { r: 0, g: 188, b: 212 }, // Cyan

  // Purples
  { r: 156, g: 39, b: 176 }, // Purple
  { r: 186, g: 104, b: 200 }, // Light Purple
  { r: 74, g: 20, b: 140 }, // Dark Purple
  { r: 103, g: 58, b: 183 }, // Deep Purple

  // Pinks
  { r: 233, g: 30, b: 99 }, // Pink
  { r: 240, g: 98, b: 146 }, // Light Pink
  { r: 136, g: 14, b: 79 }, // Dark Pink

  // Browns
  { r: 121, g: 85, b: 72 }, // Brown
  { r: 161, g: 136, b: 127 }, // Light Brown
  { r: 62, g: 39, b: 35 }, // Dark Brown
]

export const ColorPicker = ({ onChange, selectedColor }: ColorPickerProps) => {
  const [customColor, setCustomColor] = useState<string>("#000000")

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value)

    // Convert hex to RGB and call onChange
    const hex = e.target.value.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      onChange({ r, g, b })
    }
  }

  const isSelected = (color: Color): boolean => {
    if (!selectedColor) return false
    return color.r === selectedColor.r && color.g === selectedColor.g && color.b === selectedColor.b
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <style>{scrollbarStyles}</style>
      <h3 className="text-sm font-medium mb-2 text-gray-700">Colors</h3>
      <div className="h-[120px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color, idx) => (
            <ColorButton key={idx} color={color} onClick={onChange} isSelected={isSelected(color)} />
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <label htmlFor="custom-color" className="text-xs font-medium text-gray-700 block mb-1">
          Custom Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="custom-color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={handleCustomColorChange}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
            pattern="^#[0-9A-Fa-f]{6}$"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  )
}

interface ColorButtonProps {
  color: Color
  onClick: (color: Color) => void
  isSelected: boolean
}

const ColorButton = ({ color, onClick, isSelected }: ColorButtonProps) => {
  const hexColor = colorToHex(color)
  const isDark = color.r * 0.299 + color.g * 0.587 + color.b * 0.114 < 128

  return (
    <button
      className="w-8 h-8 flex items-center justify-center rounded-md hover:opacity-90 transition border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary relative"
      style={{ backgroundColor: hexColor }}
      onClick={() => onClick(color)}
      title={hexColor}
      aria-label={`Pick color ${hexColor}`}
    >
      {isSelected && <Check className={`w-4 h-4 ${isDark ? "text-white" : "text-black"}`} aria-hidden="true" />}
    </button>
  )
}
