"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export function LogoProcessor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const processLogo = () => {
    setIsProcessing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw the original image
      ctx.drawImage(img, 0, 0)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Process pixels to remove dark background
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Check if pixel is part of the dark background
        // Dark blue/gray background typically has low RGB values and similar R,G,B
        const brightness = (r + g + b) / 3
        const isBackground = brightness < 80 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30

        if (isBackground) {
          // Make background transparent
          data[i + 3] = 0 // Set alpha to 0 (transparent)
        }
      }

      // Put the processed image data back
      ctx.putImageData(imageData, 0, 0)

      // Convert to data URL
      const dataUrl = canvas.toDataURL("image/png")
      setProcessedImageUrl(dataUrl)
      setIsProcessing(false)
    }

    img.onerror = () => {
      setIsProcessing(false)
      console.error("Failed to load image")
    }

    img.src = "/images/artemis-logo.png"
  }

  const downloadProcessedLogo = () => {
    if (!processedImageUrl) return

    const link = document.createElement("a")
    link.download = "artemis-logo-transparent.png"
    link.href = processedImageUrl
    link.click()
  }

  useEffect(() => {
    processLogo()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Artemis Logo Background Removal</CardTitle>
            <p className="text-gray-600">Processing your logo to remove the dark background</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Logo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Original Logo</h3>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <img
                    src="/images/artemis-logo.png"
                    alt="Original Artemis Logo"
                    className="max-w-full h-auto max-h-64"
                  />
                </div>
              </div>

              {/* Processed Logo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Transparent Background</h3>
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-4 flex items-center justify-center relative">
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : processedImageUrl ? (
                    <img
                      src={processedImageUrl || "/placeholder.svg"}
                      alt="Processed Artemis Logo"
                      className="max-w-full h-auto max-h-64"
                    />
                  ) : (
                    <div>Processing failed</div>
                  )}
                </div>

                {processedImageUrl && (
                  <Button
                    onClick={downloadProcessedLogo}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Transparent Logo
                  </Button>
                )}
              </div>
            </div>

            {/* Preview on different backgrounds */}
            {processedImageUrl && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preview on Different Backgrounds</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 flex items-center justify-center border">
                    <img
                      src={processedImageUrl || "/placeholder.svg"}
                      alt="On White"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={processedImageUrl || "/placeholder.svg"}
                      alt="On Dark"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={processedImageUrl || "/placeholder.svg"}
                      alt="On Gradient"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={processedImageUrl || "/placeholder.svg"}
                      alt="On Colorful"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Canvas for processing (hidden) */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
