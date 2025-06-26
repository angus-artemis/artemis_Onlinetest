"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageSquare,
  Eye,
  Share2,
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react"
import { InteractiveChart } from "../InteractiveChart"
import { AnimatedCounter } from "../AnimatedCounter"

interface AnalyticsData {
  followers: number
  following: number
  totalPosts: number
  totalLikes: number
  totalComments: number
  totalViews: number
  totalShares: number
  engagementRate: number
  growthRate: number
  reachRate: number
  impressions: number
  profileViews: number
  websiteClicks: number
  emailClicks: number
  phoneClicks: number
  textClicks: number
}

interface AudienceData {
  ageGroups: { [key: string]: number }
  gender: { [key: string]: number }
  topCountries: { country: string; percentage: number }[]
  topCities: { city: string; percentage: number }[]
  deviceTypes: { [key: string]: number }
  activeHours: { [key: string]: number }
}

interface ContentPerformance {
  id: string
  title: string
  type: "image" | "video" | "carousel" | "story"
  postedAt: Date
  likes: number
  comments: number
  shares: number
  views: number
  reach: number
  impressions: number
  engagement: number
  hashtags: string[]
  caption: string
  thumbnail: string
}

export function AdvancedAnalytics() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d")
  const [activeTab, setActiveTab] = useState("overview")

  const analyticsData: AnalyticsData = {
    followers: 125000,
    following: 850,
    totalPosts: 342,
    totalLikes: 2850000,
    totalComments: 125000,
    totalViews: 8500000,
    totalShares: 45000,
    engagementRate: 4.2,
    growthRate: 12.5,
    reachRate: 8.7,
    impressions: 12500000,
    profileViews: 45000,
    websiteClicks: 1250,
    emailClicks: 450,
    phoneClicks: 320,
    textClicks: 180,
  }

  const audienceData: AudienceData = {
    ageGroups: {
      "13-17": 8,
      "18-24": 35,
      "25-34": 45,
      "35-44": 10,
      "45-54": 2,
    },
    gender: {
      "Female": 65,
      "Male": 35,
    },
    topCountries: [
      { country: "United States", percentage: 45 },
      { country: "Canada", percentage: 15 },
      { country: "Australia", percentage: 12 },
      { country: "United Kingdom", percentage: 10 },
      { country: "Germany", percentage: 8 },
    ],
    topCities: [
      { city: "Los Angeles", percentage: 12 },
      { city: "New York", percentage: 10 },
      { city: "Toronto", percentage: 8 },
      { city: "Sydney", percentage: 7 },
      { city: "London", percentage: 6 },
    ],
    deviceTypes: {
      "Mobile": 78,
      "Desktop": 18,
      "Tablet": 4,
    },
    activeHours: {
      "6-9 AM": 15,
      "9-12 PM": 25,
      "12-3 PM": 20,
      "3-6 PM": 18,
      "6-9 PM": 12,
      "9-12 AM": 10,
    },
  }

  const contentPerformance: ContentPerformance[] = [
    {
      id: "1",
      title: "Morning Workout Routine",
      type: "video",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 5200,
      comments: 450,
      shares: 180,
      views: 85000,
      reach: 125000,
      impressions: 150000,
      engagement: 4.8,
      hashtags: ["#fitness", "#workout", "#morningroutine"],
      caption: "Start your day with this energizing workout! 💪",
      thumbnail: "/placeholder.jpg",
    },
    {
      id: "2",
      title: "Healthy Meal Prep Ideas",
      type: "carousel",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      likes: 4800,
      comments: 320,
      shares: 150,
      views: 72000,
      reach: 110000,
      impressions: 135000,
      engagement: 4.2,
      hashtags: ["#mealprep", "#healthy", "#nutrition"],
      caption: "Easy meal prep ideas for the week ahead! 🥗",
      thumbnail: "/placeholder.jpg",
    },
    {
      id: "3",
      title: "Gym Motivation",
      type: "image",
      postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      likes: 4500,
      comments: 280,
      shares: 120,
      views: 65000,
      reach: 95000,
      impressions: 115000,
      engagement: 3.9,
      hashtags: ["#motivation", "#gym", "#fitness"],
      caption: "Push through the pain, embrace the gain! 🔥",
      thumbnail: "/placeholder.jpg",
    },
  ]

  const chartData = [
    { date: "2024-01-01", followers: 115000, engagement: 3.8, reach: 85000, impressions: 100000 },
    { date: "2024-01-08", followers: 117000, engagement: 4.1, reach: 92000, impressions: 110000 },
    { date: "2024-01-15", followers: 119000, engagement: 4.3, reach: 98000, impressions: 120000 },
    { date: "2024-01-22", followers: 121000, engagement: 4.0, reach: 105000, impressions: 125000 },
    { date: "2024-01-29", followers: 123000, engagement: 4.2, reach: 112000, impressions: 130000 },
    { date: "2024-02-05", followers: 125000, engagement: 4.2, reach: 118000, impressions: 135000 },
  ]

  const getGrowthIcon = (rate: number) => {
    return rate > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    )
  }

  const getGrowthColor = (rate: number) => {
    return rate > 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your growth and performance metrics</p>
        </div>
        <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Followers</p>
                    <p className="text-2xl font-bold">
                      <AnimatedCounter end={analyticsData.followers} />
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getGrowthIcon(analyticsData.growthRate)}
                      <span className={`text-sm font-medium ${getGrowthColor(analyticsData.growthRate)}`}>
                        +{analyticsData.growthRate}%
                      </span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                    <p className="text-2xl font-bold">{analyticsData.engagementRate}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      {getGrowthIcon(0.5)}
                      <span className="text-sm font-medium text-green-600">+0.5%</span>
                    </div>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold">
                      {(analyticsData.impressions / 1000).toFixed(1)}K
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getGrowthIcon(analyticsData.reachRate)}
                      <span className={`text-sm font-medium ${getGrowthColor(analyticsData.reachRate)}`}>
                        +{analyticsData.reachRate}%
                      </span>
                    </div>
                  </div>
                  <Eye className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold">
                      {(analyticsData.profileViews / 1000).toFixed(1)}K
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getGrowthIcon(8.2)}
                      <span className="text-sm font-medium text-green-600">+8.2%</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveChart 
                  data={chartData} 
                  dataKey="followers" 
                  color="#3B82F6" 
                  title="Followers"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveChart 
                  data={chartData} 
                  dataKey="engagement" 
                  color="#10B981" 
                  title="Engagement Rate (%)"
                />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm">Export Data</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">Schedule Post</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Target className="w-6 h-6" />
                  <span className="text-sm">Set Goals</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Award className="w-6 h-6" />
                  <span className="text-sm">View Achievements</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(audienceData.ageGroups).map(([age, percentage]) => (
                    <div key={age} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{age}</span>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(audienceData.gender).map(([gender, percentage]) => (
                    <div key={gender} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{gender}</span>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {audienceData.topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{country.country}</span>
                      </div>
                      <span className="text-sm text-gray-600">{country.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Types */}
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(audienceData.deviceTypes).map(([device, percentage]) => (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {device === "Mobile" ? (
                          <Smartphone className="w-4 h-4 text-gray-400" />
                        ) : device === "Desktop" ? (
                          <Monitor className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Smartphone className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm font-medium">{device}</span>
                      </div>
                      <span className="text-sm text-gray-600">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="space-y-4">
            {contentPerformance.map((content) => (
              <Card key={content.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{content.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {content.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {content.postedAt.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{content.caption}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{content.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          <span>{content.comments.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4 text-green-500" />
                          <span>{content.shares.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-purple-500" />
                          <span>{content.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-gray-500">Engagement:</span>
                        <Badge variant="secondary" className="text-xs">
                          {content.engagement}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Growth Tab */}
        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Followers Goal</span>
                      <span className="text-sm text-gray-600">150K / 200K</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Engagement Goal</span>
                      <span className="text-sm text-gray-600">4.2% / 5%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Posts Goal</span>
                      <span className="text-sm text-gray-600">342 / 365</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Performing Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(audienceData.activeHours)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([time, percentage]) => (
                      <div key={time} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{time}</span>
                        </div>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
