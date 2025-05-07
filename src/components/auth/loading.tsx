"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Loading = () => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [particles, setParticles] = useState<
    { width: number; height: number; left: number; top: number; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    // Simulate loading progress
    intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 7 + 3 // ⬅️ increase step size
          if (newProgress >= 100) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsComplete(true)
            return 100
          }
          return newProgress
        })
      }, 60) // ⬅️ increase frequency
      
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    // Generate particles only on the client to avoid hydration mismatch
    const generated = Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }))
    setParticles(generated)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-purple-700/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-l from-blue-700/30 to-transparent blur-3xl" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Brand element */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="text-4xl font-bold text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Boardly</span>
            </div>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Loading bar */}
        <div className="relative mb-8">
          <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Progress markers */}
          <div className="relative w-full flex justify-between mt-1">
            {[0, 25, 50, 75, 100].map((marker) => (
              <motion.div
                key={marker}
                className="absolute h-3 w-0.5"
                style={{
                  left: `${marker}%`,
                  backgroundColor: progress >= marker ? "rgb(56, 189, 248)" : "rgba(255, 255, 255, 0.2)",
                  transform: "translateX(-50%)",
                }}
                animate={{
                  height: progress >= marker ? 3 : 2,
                  opacity: progress >= marker ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress percentage */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            className="text-xs uppercase tracking-widest text-white/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {isComplete ? "Ready" : "Loading assets"}
          </motion.div>
          <motion.div
            className="text-xl font-medium text-white"
            key={Math.floor(progress)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(progress)}%
          </motion.div>
        </div>

        {/* Animated elements */}
        <div className="flex justify-center space-x-6 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                className="w-3 h-12 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600"
                animate={{
                  height: [12, 24, 12],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-1 right-0 h-2 w-5 bg-cyan-400 rounded-full blur-md"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Status message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isComplete ? "complete" : "loading"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm text-white/70"
          >
            {isComplete ? (
              <span className="text-cyan-400">Initialization complete. Launching...</span>
            ) : (
              <span>Preparing your experience...</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating particles (hydration-safe) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: p.width,
              height: p.height,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -p.top - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
