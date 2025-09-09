"use client"

import { useEffect, useRef } from "react"

interface VoiceVisualizerProps {
  isRecording: boolean
  audioStream?: MediaStream
}

export function VoiceVisualizer({ isRecording, audioStream }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode>()

  useEffect(() => {
    if (!isRecording || !audioStream || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

 
    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(audioStream)

    analyser.fftSize = 256
    source.connect(analyser)
    analyserRef.current = analyser

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!analyserRef.current || !ctx) return

      analyserRef.current.getByteFrequencyData(dataArray)

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, "#ffffff")
        gradient.addColorStop(1, "#666666")

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      audioContext.close()
    }
  }, [isRecording, audioStream])

  if (!isRecording) return null

  return (
    <div className="mb-3 flex justify-center">
      <canvas ref={canvasRef} width={200} height={60} className="rounded-lg bg-black/20 backdrop-blur-sm" />
    </div>
  )
}
