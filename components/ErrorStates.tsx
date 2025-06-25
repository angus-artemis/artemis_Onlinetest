"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, RefreshCw, Clock, Shield, Instagram, Server, HelpCircle } from "lucide-react"

interface ErrorStateProps {
  type: "connection" | "rate-limit" | "sync-failed" | "offline" | "api-error" | "auth-expired"
  onRetry?: () => void
  onContactSupport?: () => void
}

export function ErrorState({ type, onRetry, onContactSupport }: ErrorStateProps) {
  const errorConfigs = {
    connection: {
      icon: Instagram,
      title: "Instagram Connection Issue",
      description: "We're having trouble connecting to your Instagram account.",
      details: "This might be due to Instagram API changes or your account permissions.",
      action: "Reconnect Account",
      color: "red",
      canRetry: true,
    },
    "rate-limit": {
      icon: Clock,
      title: "Rate Limit Reached",
      description: "Instagram has temporarily limited our data requests.",
      details: "We'll automatically retry in 1 hour. Your data will be updated then.",
      action: "Check Again Later",
      color: "yellow",
      canRetry: false,
    },
    "sync-failed": {
      icon: RefreshCw,
      title: "Data Sync Failed",
      description: "We couldn't update your latest Instagram data.",
      details: "This is usually temporary. Your previous data is still available.",
      action: "Retry Sync",
      color: "orange",
      canRetry: true,
    },
    offline: {
      icon: Wifi,
      title: "You're Offline",
      description: "Check your internet connection to get the latest data.",
      details: "You can still view your previously loaded analytics.",
      action: "Retry Connection",
      color: "gray",
      canRetry: true,
    },
    "api-error": {
      icon: Server,
      title: "Service Temporarily Unavailable",
      description: "Our servers are experiencing high traffic.",
      details: "We're working to resolve this. Please try again in a few minutes.",
      action: "Try Again",
      color: "red",
      canRetry: true,
    },
    "auth-expired": {
      icon: Shield,
      title: "Session Expired",
      description: "Your Instagram authorization has expired.",
      details: "Please reconnect your account to continue receiving updates.",
      action: "Reconnect Instagram",
      color: "blue",
      canRetry: true,
    },
  }

  const config = errorConfigs[type]

  const getColorClasses = (color: string) => {
    const colors = {
      red: "border-red-200 bg-red-50",
      yellow: "border-yellow-200 bg-yellow-50",
      orange: "border-orange-200 bg-orange-50",
      gray: "border-gray-200 bg-gray-50",
      blue: "border-blue-200 bg-blue-50",
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const getIconColor = (color: string) => {
    const colors = {
      red: "text-red-600",
      yellow: "text-yellow-600",
      orange: "text-orange-600",
      gray: "text-gray-600",
      blue: "text-blue-600",
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  return (
    <Card className={`border-0 shadow-lg ${getColorClasses(config.color)}`}>
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center`}>
          <config.icon className={`w-8 h-8 ${getIconColor(config.color)}`} />
        </div>

        <h3 className="font-semibold text-lg mb-2">{config.title}</h3>
        <p className="text-gray-600 mb-3">{config.description}</p>
        <p className="text-sm text-gray-500 mb-6">{config.details}</p>

        <div className="space-y-3">
          {config.canRetry && onRetry && (
            <Button onClick={onRetry} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              {config.action}
            </Button>
          )}

          {onContactSupport && (
            <Button variant="outline" onClick={onContactSupport} className="w-full">
              <HelpCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          )}
        </div>

        {/* Status indicator */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div
              className={`w-2 h-2 rounded-full ${config.color === "red" ? "bg-red-500" : config.color === "yellow" ? "bg-yellow-500" : "bg-gray-400"}`}
            ></div>
            <span>
              {type === "rate-limit"
                ? "Next update in 47 minutes"
                : type === "offline"
                  ? "Offline mode active"
                  : "Monitoring connection..."}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">{children}</div>
}

// Global error states for different scenarios
export function ConnectionError() {
  return (
    <div className="p-4">
      <ErrorState
        type="connection"
        onRetry={() => window.location.reload()}
        onContactSupport={() => window.open("mailto:support@artemis.app")}
      />
    </div>
  )
}

export function RateLimitError() {
  return (
    <div className="p-4">
      <Alert className="border-yellow-200 bg-yellow-50">
        <Clock className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Rate limit reached.</strong> Instagram limits how often we can fetch your data. We'll automatically
          update your analytics in 1 hour.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function OfflineMode() {
  return (
    <div className="p-4">
      <Alert className="border-gray-200 bg-gray-50">
        <Wifi className="h-4 w-4 text-gray-600" />
        <AlertDescription className="text-gray-800">
          <strong>You're offline.</strong> Showing your last synced data. Connect to the internet to get the latest
          updates.
        </AlertDescription>
      </Alert>
    </div>
  )
}
