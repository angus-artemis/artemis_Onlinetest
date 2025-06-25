"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Zap,
  Globe,
  Lock,
  Server,
} from "lucide-react"

interface DataSource {
  name: string
  status: "connected" | "syncing" | "error" | "pending"
  lastSync: string
  dataPoints: number
  apiCalls: number
  apiLimit: number
}

interface MetricData {
  metric: string
  value: number
  change: number
  source: string
  lastUpdated: string
}

export function DataIntegration() {
  const [activeSync, setActiveSync] = useState<string | null>(null)

  const dataSources: DataSource[] = [
    {
      name: "Instagram Basic Display API",
      status: "connected",
      lastSync: "2 minutes ago",
      dataPoints: 1247,
      apiCalls: 89,
      apiLimit: 200,
    },
    {
      name: "Instagram Graph API",
      status: "connected",
      lastSync: "5 minutes ago",
      dataPoints: 856,
      apiCalls: 156,
      apiLimit: 200,
    },
    {
      name: "Meta Business API",
      status: "syncing",
      lastSync: "Syncing now...",
      dataPoints: 423,
      apiCalls: 67,
      apiLimit: 200,
    },
  ]

  const realtimeMetrics: MetricData[] = [
    { metric: "Followers", value: 24567, change: 2.3, source: "Instagram API", lastUpdated: "1 min ago" },
    { metric: "Engagement Rate", value: 8.7, change: 0.4, source: "Calculated", lastUpdated: "2 min ago" },
    { metric: "Reach (24h)", value: 15420, change: -5.2, source: "Instagram Insights", lastUpdated: "5 min ago" },
    { metric: "Profile Views", value: 892, change: 12.1, source: "Instagram API", lastUpdated: "3 min ago" },
  ]

  const dataProcessingSteps = [
    { step: "API Data Fetch", description: "Retrieve data from Instagram APIs", status: "completed" },
    { step: "Data Validation", description: "Verify data integrity and completeness", status: "completed" },
    { step: "Engagement Calculation", description: "Calculate engagement rates and trends", status: "completed" },
    { step: "AI Analysis", description: "Generate insights and recommendations", status: "processing" },
    { step: "Dashboard Update", description: "Update user interface with new data", status: "pending" },
  ]

  const handleManualSync = async (sourceName: string) => {
    setActiveSync(sourceName)
    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setActiveSync(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "syncing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Artemis Data Integration</h1>
          <p className="text-gray-600">How we gather and process your social media insights</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Real-time Data Dashboard
                </CardTitle>
                <p className="text-sm text-gray-600">Live metrics from your connected accounts</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {realtimeMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{metric.metric}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {metric.source}
                        </Badge>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold">{metric.value.toLocaleString()}</span>
                        <span className={`text-sm ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Updated {metric.lastUpdated}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Flow Diagram */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Flow Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Instagram APIs</p>
                        <p className="text-xs text-gray-600">Basic Display, Graph, Business APIs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Every 5 minutes</p>
                      <p className="text-xs text-gray-500">Auto-sync</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-gray-300"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Server className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Artemis Processing Engine</p>
                        <p className="text-xs text-gray-600">Data validation, calculation, AI analysis</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Real-time</p>
                      <p className="text-xs text-gray-500">Processing</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-gray-300"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Your Dashboard</p>
                        <p className="text-xs text-gray-600">Insights, recommendations, analytics</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Instant</p>
                      <p className="text-xs text-gray-500">Updates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Connected Data Sources</CardTitle>
                <p className="text-sm text-gray-600">APIs and services providing your insights</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {dataSources.map((source, index) => (
                  <div key={index} className="p-4 border rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-sm text-gray-600">Last sync: {source.lastSync}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(source.status)}>
                          {source.status === "syncing" && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                          {source.status === "connected" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {source.status === "error" && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {source.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleManualSync(source.name)}
                          disabled={activeSync === source.name}
                        >
                          {activeSync === source.name ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Data Points</p>
                        <p className="font-medium">{source.dataPoints.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">API Usage</p>
                        <p className="font-medium">
                          {source.apiCalls}/{source.apiLimit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rate Limit</p>
                        <Progress value={(source.apiCalls / source.apiLimit) * 100} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* What Data We Collect */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Collection Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Profile Data</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>Follower count & growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-green-500" />
                        <span>Profile views & reach</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-500" />
                        <span>Account insights</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Content Data</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>Likes & engagement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span>Comments & interactions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <span>Shares & saves</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Processing Pipeline</CardTitle>
                <p className="text-sm text-gray-600">How we transform raw data into actionable insights</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataProcessingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : step.status === "processing"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : step.status === "processing" ? (
                          <RefreshCw className="w-4 h-4 text-white animate-spin" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{step.step}</p>
                        <p className="text-xs text-gray-600">{step.description}</p>
                      </div>
                      <Badge
                        className={
                          step.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : step.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Processing */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Pattern Recognition</h4>
                    <p className="text-xs text-gray-600">
                      Our AI analyzes your posting patterns, engagement trends, and audience behavior to identify what
                      works best for your account.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Predictive Analytics</h4>
                    <p className="text-xs text-gray-600">
                      Machine learning models predict optimal posting times, content types, and hashtags based on your
                      historical performance.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Trend Analysis</h4>
                    <p className="text-xs text-gray-600">
                      We analyze trending content in your niche and compare it with your performance to suggest relevant
                      opportunities.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Personalized Recommendations</h4>
                    <p className="text-xs text-gray-600">
                      Every suggestion is tailored to your unique audience, content style, and growth goals using
                      advanced algorithms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-500" />
                  Privacy & Security
                </CardTitle>
                <p className="text-sm text-gray-600">How we protect your data and respect your privacy</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-medium text-sm text-green-800 mb-2">What We Access</h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Public profile information</li>
                      <li>• Post engagement metrics</li>
                      <li>• Follower count and growth</li>
                      <li>• Content performance data</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl">
                    <h4 className="font-medium text-sm text-red-800 mb-2">What We DON'T Access</h4>
                    <ul className="text-xs text-red-700 space-y-1">
                      <li>• Private messages or DMs</li>
                      <li>• Personal contact information</li>
                      <li>• Ability to post on your behalf</li>
                      <li>• Private account content</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-sm text-blue-800 mb-2">Data Security</h4>
                  <p className="text-xs text-blue-700">
                    All data is encrypted in transit and at rest. We use industry-standard security practices and never
                    share your personal data with third parties without explicit consent.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-medium text-sm text-purple-800 mb-2">Your Control</h4>
                  <p className="text-xs text-purple-700">
                    You can disconnect your accounts, delete your data, or modify permissions at any time. We provide
                    full transparency into what data we collect and how it's used.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
