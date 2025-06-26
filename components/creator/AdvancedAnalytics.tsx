"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"

interface AnalyticsData {
  followers: number
  engagement: number
  reach: number
  impressions: number
  likes: number
  comments: number
  shares: number
  revenue: number
  growth: number
}

interface CampaignPerformance {
  id: string
  name: string
  platform: string
  reach: number
  engagement: number
  clicks: number
  conversions: number
  revenue: number
  status: "active" | "completed" | "paused"
}

export function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const analyticsData: AnalyticsData = {
    followers: 125000,
    engagement: 4.2,
    reach: 850000,
    impressions: 1200000,
    likes: 45000,
    comments: 3200,
    shares: 1800,
    revenue: 8500,
    growth: 12.5,
  }

  const campaignPerformance: CampaignPerformance[] = [
    {
      id: "1",
      name: "Summer Fitness Challenge",
      platform: "Instagram",
      reach: 450000,
      engagement: 4.8,
      clicks: 12500,
      conversions: 850,
      revenue: 3200,
      status: "active",
    },
    {
      id: "2",
      name: "Healthy Living Tips",
      platform: "Instagram",
      reach: 320000,
      engagement: 3.9,
      clicks: 8900,
      conversions: 620,
      revenue: 2400,
      status: "completed",
    },
    {
      id: "3",
      name: "Workout Motivation",
      platform: "Instagram",
      reach: 280000,
      engagement: 4.1,
      clicks: 7600,
      conversions: 520,
      revenue: 1900,
      status: "active",
    },
  ]

  const platformData = [
    { name: "Instagram", followers: 85000, engagement: 4.5, growth: 15.2 },
    { name: "Facebook", followers: 25000, engagement: 3.2, growth: 8.7 },
    { name: "Twitter", followers: 15000, engagement: 2.8, growth: 5.4 },
  ]

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600"
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.followers)}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${getGrowthColor(analyticsData.growth)}`}>
                    +{analyticsData.growth}%
                  </span>
                  <span className="ml-1">{getGrowthIcon(analyticsData.growth)}</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold">{analyticsData.engagement}%</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-green-600">+0.3%</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 text-green-600" />
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.reach)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-green-600">+8.2%</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 text-green-600" />
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">${formatNumber(analyticsData.revenue)}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-green-600">+15.4%</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 text-green-600" />
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Engagement Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(analyticsData.likes)}</span>
                      <Progress value={75} className="w-20" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(analyticsData.comments)}</span>
                      <Progress value={45} className="w-20" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Shares</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(analyticsData.shares)}</span>
                      <Progress value={30} className="w-20" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Growth Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Follower Growth</span>
                    <span className="text-sm text-green-600 font-medium">+{analyticsData.growth}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Engagement Growth</span>
                    <span className="text-sm text-green-600 font-medium">+0.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Reach Growth</span>
                    <span className="text-sm text-green-600 font-medium">+8.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Revenue Growth</span>
                    <span className="text-sm text-green-600 font-medium">+15.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignPerformance.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Instagram className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">{campaign.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Reach</p>
                        <p className="font-medium">{formatNumber(campaign.reach)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Engagement</p>
                        <p className="font-medium">{campaign.engagement}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-medium">${formatNumber(campaign.revenue)}</p>
                      </div>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformData.map((platform) => (
              <Card key={platform.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {platform.name === "Instagram" && <Instagram className="w-5 h-5 text-pink-600" />}
                    {platform.name === "Facebook" && <Facebook className="w-5 h-5 text-blue-600" />}
                    {platform.name === "Twitter" && <Twitter className="w-5 h-5 text-blue-400" />}
                    {platform.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Followers</span>
                    <span className="font-medium">{formatNumber(platform.followers)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="font-medium">{platform.engagement}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth</span>
                    <span className="font-medium text-green-600">+{platform.growth}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Age 18-24</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Age 25-34</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Age 35-44</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-20" />
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Age 45+</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">United States</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">United Kingdom</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Canada</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Australia</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
