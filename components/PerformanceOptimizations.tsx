"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, Wifi, Database, Clock, CheckCircle, AlertTriangle } from "lucide-react"

// Loading skeleton component
export function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
            <div>
              <Skeleton className="h-6 w-32 bg-white/20 mb-2" />
              <Skeleton className="h-4 w-48 bg-white/20" />
            </div>
          </div>
          <Skeleton className="w-12 h-12 rounded-full bg-white/20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 rounded-2xl bg-white/10" />
          <Skeleton className="h-20 rounded-2xl bg-white/10" />
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Performance monitoring component
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    apiResponseTime: 0,
    cacheHitRate: 0,
    connectionStatus: "connected",
  })

  useEffect(() => {
    // Simulate performance monitoring
    const updateMetrics = () => {
      setMetrics({
        loadTime: 1200 + Math.random() * 800, // 1.2-2.0 seconds
        apiResponseTime: 150 + Math.random() * 200, // 150-350ms
        cacheHitRate: 85 + Math.random() * 10, // 85-95%
        connectionStatus: Math.random() > 0.1 ? "connected" : "slow",
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "slow":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return "text-green-600"
    if (value <= thresholds.fair) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-500" />
          Performance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
            <p className={`text-lg font-bold ${getPerformanceColor(metrics.loadTime, { good: 1500, fair: 2000 })}`}>
              {(metrics.loadTime / 1000).toFixed(1)}s
            </p>
            <p className="text-xs text-gray-600">Load Time</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <Database className="w-5 h-5 mx-auto mb-1 text-gray-600" />
            <p
              className={`text-lg font-bold ${getPerformanceColor(metrics.apiResponseTime, { good: 200, fair: 500 })}`}
            >
              {Math.round(metrics.apiResponseTime)}ms
            </p>
            <p className="text-xs text-gray-600">API Response</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Cache Hit Rate</span>
            <span className="font-medium">{Math.round(metrics.cacheHitRate)}%</span>
          </div>
          <Progress value={metrics.cacheHitRate} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Connection Status</span>
          </div>
          <Badge className={getStatusColor(metrics.connectionStatus)}>{metrics.connectionStatus}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Offline mode component
export function OfflineModeIndicator({ isOffline }: { isOffline: boolean }) {
  if (!isOffline) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-yellow-100 border border-yellow-200 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">You're offline</span>
          <span className="text-xs text-yellow-600">Showing cached data</span>
        </div>
      </div>
    </div>
  )
}

// Virtual scrolling for large lists
export function VirtualizedList({
  items,
  renderItem,
  itemHeight = 60,
}: {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  itemHeight?: number
}) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 })
  const containerHeight = 400 // Fixed height for the container

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.min(start + Math.ceil(containerHeight / itemHeight) + 1, items.length)
    setVisibleRange({ start, end })
  }

  const visibleItems = items.slice(visibleRange.start, visibleRange.end)
  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.start * itemHeight

  return (
    <div className="overflow-auto" style={{ height: containerHeight }} onScroll={handleScroll}>
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={visibleRange.start + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Image optimization component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => setIsLoading(false)
  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      {hasError ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load</span>
        </div>
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  )
}

// Connection status indicator
export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [lastSync, setLastSync] = useState(new Date())

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Simulate sync updates
    const syncInterval = setInterval(() => {
      if (isOnline) {
        setLastSync(new Date())
      }
    }, 30000) // Update every 30 seconds when online

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(syncInterval)
    }
  }, [isOnline])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`px-3 py-2 rounded-lg shadow-lg ${
          isOnline ? "bg-green-100 border border-green-200" : "bg-red-100 border border-red-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {isOnline ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-xs font-medium ${isOnline ? "text-green-800" : "text-red-800"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        {isOnline && <p className="text-xs text-green-600 mt-1">Last sync: {lastSync.toLocaleTimeString()}</p>}
      </div>
    </div>
  )
}
