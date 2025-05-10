"use client"

import { useEffect, useState } from "react"
import { Circle, Square, Pencil, Type } from "lucide-react"

export function LoadingScreen({ }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing canvas...")

  useEffect(() => {
    const loadingMessages = [
      "Initializing canvas...",
      "Preparing drawing tools...",
      "Loading color palette...",
      "Setting up workspace...",
      "Almost ready...",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15

        // Update loading message based on progress
        const messageIndex = Math.min(Math.floor(newProgress / 25), loadingMessages.length - 1)
        setLoadingText(loadingMessages[messageIndex])

        if (newProgress >= 100) {
          clearInterval(interval)
          setLoadingText("Ready!")
          setTimeout(() => {
          
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20"
          style={{
            clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
            transition: "clip-path 0.4s ease-out",
          }}
        />

        <div
          className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Drawing Canvas</h1>

        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-48 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            {/* Animated drawing elements */}
            <div
              className="absolute animate-pulse opacity-30"
              style={{
                top: "20%",
                left: "30%",
                transform: `scale(${Math.min(progress / 25, 1)})`,
                transition: "transform 0.5s ease-out",
              }}
            >
              <Square size={40} className="text-blue-400" />
            </div>
            <div
              className="absolute animate-pulse opacity-30"
              style={{
                top: "50%",
                left: "60%",
                animationDelay: "0.5s",
                transform: `scale(${Math.min((progress - 25) / 25, 1)})`,
                transition: "transform 0.5s ease-out",
              }}
            >
              <Circle size={35} className="text-green-400" />
            </div>
            <div
              className="absolute animate-pulse opacity-30"
              style={{
                top: "60%",
                left: "25%",
                animationDelay: "1s",
                transform: `scale(${Math.min((progress - 50) / 25, 1)})`,
                transition: "transform 0.5s ease-out",
              }}
            >
              <Type size={30} className="text-purple-400" />
            </div>

            {/* Animated pencil drawing path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M20,50 C30,30 40,70 60,50 S80,30 90,50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.5"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Animated pencil that follows the path */}
            <div
              className="absolute animate-bounce"
              style={{
                animationDuration: "3s",
                right: `${Math.min(20 + progress * 0.6, 80)}%`,
                bottom: `${30 + Math.sin(progress / 10) * 15}%`,
                transition: "right 0.5s ease-out, bottom 0.5s ease-out",
              }}
            >
              <Pencil size={24} className="text-blue-500" />
            </div>

            {/* Canvas grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-sm font-medium text-gray-500 mb-2">{loadingText}</div>
          <div className="flex items-center justify-center gap-1.5">
            <div
              className={`h-2 w-2 rounded-full ${progress >= 33 ? "bg-blue-500" : "bg-gray-300"} transition-colors duration-300`}
              style={{ transform: progress >= 33 ? "scale(1.2)" : "scale(1)", transition: "transform 0.3s ease" }}
            ></div>
            <div
              className={`h-2 w-2 rounded-full ${progress >= 66 ? "bg-blue-500" : "bg-gray-300"} transition-colors duration-300`}
              style={{ transform: progress >= 66 ? "scale(1.2)" : "scale(1)", transition: "transform 0.3s ease" }}
            ></div>
            <div
              className={`h-2 w-2 rounded-full ${progress >= 99 ? "bg-blue-500" : "bg-gray-300"} transition-colors duration-300`}
              style={{ transform: progress >= 99 ? "scale(1.2)" : "scale(1)", transition: "transform 0.3s ease" }}
            ></div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 h-5">
          {progress < 100 ? `${Math.floor(progress)}%` : "Ready!"}
        </div>
      </div>

      <div className="mt-8 flex gap-6 justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-2 hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50">
            <Pencil size={20} className="text-blue-500" />
          </div>
          <span className="text-xs text-gray-600">Draw</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-2 hover:shadow-lg transition-shadow duration-300 hover:bg-green-50">
            <Square size={20} className="text-green-500" />
          </div>
          <span className="text-xs text-gray-600">Shape</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-2 hover:shadow-lg transition-shadow duration-300 hover:bg-purple-50">
            <Circle size={20} className="text-purple-500" />
          </div>
          <span className="text-xs text-gray-600">Circle</span>
        </div>
      </div>

      {/* Add subtle floating particles in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-200 opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-100px) translateX(20px); }
          100% { transform: translateY(-200px) translateX(0); opacity: 0; }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 10px 10px;
        }
      `}</style>
    </div>
  )
}
