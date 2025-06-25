"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
  Loader2,
  Shield,
  BarChart3,
  Users,
  TrendingUp,
  Zap,
  Eye,
} from "lucide-react"

interface ConnectedAccount {
  platform: string
  username: string
  followers: number
  isConnected: boolean
  lastSync: string
  permissions: string[]
}

interface AccountConnectionProps {
  onComplete: () => void
}

export function AccountConnection({ onComplete }: AccountConnectionProps) {
  const [connectionStep, setConnectionStep] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([
    {
      platform: "Instagram",
      username: "@alexfitness",
      followers: 24567,
      isConnected: false,
      lastSync: "",
      permissions: ["basic_info", "media", "insights"],
    },
  ])

  const connectionSteps = ["Connect Instagram Account", "Grant Permissions", "Initial Data Sync", "Setup Complete"]

  const handleInstagramConnect = async () => {
    setIsConnecting(true)
    setConnectionStep(1)

    // Simulate Instagram OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setConnectionStep(2)

    // Simulate permission granting
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setConnectionStep(3)

    // Simulate initial data sync
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Update connected account
    setConnectedAccounts((prev) =>
      prev.map((account) =>
        account.platform === "Instagram"
          ? { ...account, isConnected: true, lastSync: new Date().toISOString() }
          : account,
      ),
    )

    setConnectionStep(4)
    setIsConnecting(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("accountsConnected", "true")
    }
    setTimeout(() => onComplete(), 1000)
  }

  const dataPoints = [
    { icon: Users, label: "Follower Analytics", description: "Growth trends, demographics, and engagement patterns" },
    { icon: BarChart3, label: "Content Performance", description: "Likes, comments, shares, and reach for each post" },
    {
      icon: TrendingUp,
      label: "Engagement Insights",
      description: "Best posting times, hashtag performance, and audience activity",
    },
    { icon: Zap, label: "AI Recommendations", description: "Content suggestions based on your performance data" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <img
              src="/images/artemis-logo.png"
              alt="Artemis"
              className="w-full h-full object-contain rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Accounts</h1>
          <p className="text-gray-600">Link your social media to unlock powerful insights</p>
        </div>

        {connectionStep === 0 && (
          <div className="space-y-6">
            {/* What We'll Access */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  What We'll Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dataPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <point.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{point.label}</p>
                      <p className="text-xs text-gray-600">{point.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="border-0 shadow-lg bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-green-800 mb-1">Your Privacy is Protected</p>
                    <p className="text-xs text-green-700">
                      We only access public data and insights. We never post on your behalf or access private messages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connect Instagram */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Connect Instagram</h3>
                    <p className="text-sm text-gray-600">Start with your main Instagram account</p>
                  </div>
                  <Button
                    onClick={handleInstagramConnect}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Connect Instagram Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Other Platforms */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Other Platforms (Coming Soon)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl opacity-60">
                  <div className="flex items-center gap-3">
                    <Youtube className="w-5 h-5 text-red-500" />
                    <span className="text-sm">YouTube</span>
                  </div>
                  <Badge variant="secondary">Soon</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl opacity-60">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Twitter/X</span>
                  </div>
                  <Badge variant="secondary">Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {connectionStep > 0 && connectionStep < 4 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Connecting Instagram...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {connectionSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < connectionStep
                          ? "bg-green-500"
                          : index === connectionStep
                            ? "bg-blue-500"
                            : "bg-gray-200"
                      }`}
                    >
                      {index < connectionStep ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : index === connectionStep ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : (
                        <span className="text-xs text-gray-500">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm ${index <= connectionStep ? "text-gray-800 font-medium" : "text-gray-500"}`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <Progress value={(connectionStep / 4) * 100} className="h-2" />

              {connectionStep === 1 && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    🔐 You'll be redirected to Instagram to authorize Artemis. We only request access to public data and
                    insights.
                  </p>
                </div>
              )}

              {connectionStep === 2 && (
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-800">✅ Permissions granted! Now syncing your account data...</p>
                </div>
              )}

              {connectionStep === 3 && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-800">
                    📊 Analyzing your content and building your personalized dashboard...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {connectionStep === 4 && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-green-800 mb-2">All Set! 🎉</h3>
                <p className="text-sm text-green-700 mb-4">
                  Your Instagram account is connected and your data is being analyzed.
                </p>
                <Button
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  onClick={onComplete}
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Connected Account Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Connected Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                {connectedAccounts.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <div>
                        <p className="font-medium text-sm">{account.username}</p>
                        <p className="text-xs text-gray-500">{account.followers.toLocaleString()} followers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
