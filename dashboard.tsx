"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Heart,
  BarChart3,
  Settings,
  Home,
  Clock,
  Target,
  Zap,
  Trophy,
  Users,
  Eye,
  ChevronRight,
  Play,
  ImageIcon,
  Plus,
  DollarSign,
  Sparkles,
  Share2,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Bell,
  Smartphone,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Lightbulb,
  Instagram,
  Youtube,
  Twitter,
  MessageSquare,
  Target as TargetIcon,
} from "lucide-react"
import { useDashboardData } from "./hooks/useDashboardData"
import { LoadingScreen } from "./components/LoadingScreen"
import { AnimatedCounter } from "./components/AnimatedCounter"
import { InteractiveChart } from "./components/InteractiveChart"
import type { Post } from "./types/dashboard"
import { LoginPage } from "./components/LoginPage"
import { CreatorRecommendations } from "./components/creator/CreatorRecommendations"
import { BrandHome } from "./components/brand/BrandHome"
import { BrandInsights } from "./components/brand/BrandInsights"
import { BrandSettings } from "./components/brand/BrandSettings"
import { AccountConnection } from "./components/onboarding/AccountConnection"
import { CampaignCreator } from "./components/brand/CampaignCreator"

export default function InfluencerDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"creator" | "brand" | null>(null)
  const [accountsConnected, setAccountsConnected] = useState(false)

  const {
    isLoading,
    analyticsData,
    posts,
    contentPerformance,
    brandOpportunities,
    contentSuggestions,
    updatePostStatus,
    addNewPost,
    getCurrentWeekGrowth,
    getAverageEngagement,
    followerCount,
  } = useDashboardData()

  const handleLogin = (role: "creator" | "brand") => {
    setUserRole(role)
    setIsAuthenticated(true)
    // Don't set accountsConnected to true yet - user needs to connect accounts
  }

  const handleAccountsConnected = () => {
    setAccountsConnected(true)
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (!accountsConnected) {
    return <AccountConnection onComplete={handleAccountsConnected} />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const weeklyGrowth = getCurrentWeekGrowth()
  const avgEngagement = getAverageEngagement()
  const topPost = posts.find((p) => p.status === "published" && p.likes)
  const currentSuggestion = contentSuggestions[selectedSuggestion] || contentSuggestions[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "idea":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="w-3 h-3" />
      case "scheduled":
        return <Clock className="w-3 h-3" />
      case "draft":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div
          className={`${
            userRole === "creator"
              ? "bg-gradient-to-r from-purple-600 to-blue-600"
              : "bg-gradient-to-r from-blue-600 to-indigo-600"
          } text-white p-6 rounded-b-3xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img
                  src="/images/artemis-logo.png"
                  alt="Artemis"
                  className="w-full h-full object-contain rounded-full shadow-sm"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userRole === "creator" ? "Hey Alex! 👋" : "Hey SportFit! 👋"}</h1>
                <p className="text-purple-100">
                  {userRole === "creator" ? "Artemis is helping you grow!" : "Artemis is optimizing your campaigns!"}
                </p>
              </div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {userRole === "creator" ? (
                <Trophy className="w-6 h-6 text-yellow-300" />
              ) : (
                <TrendingUp className="w-6 h-6 text-green-300" />
              )}
            </div>
          </div>

          {/* Quick Stats with Animation */}
          <div className="grid grid-cols-2 gap-4">
            {userRole === "creator" ? (
              <>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Followers</span>
                  </div>
                  <p className="text-xl font-bold">
                    <AnimatedCounter end={followerCount} />
                  </p>
                  <p className="text-xs text-green-200">
                    +<AnimatedCounter end={weeklyGrowth} suffix="%" /> this week
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">Engagement</span>
                  </div>
                  <p className="text-xl font-bold">
                    <AnimatedCounter end={avgEngagement} suffix="%" />
                  </p>
                  <p className="text-xs text-green-200">Above average!</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Creators</span>
                  </div>
                  <p className="text-xl font-bold">
                    <AnimatedCounter end={28} />
                  </p>
                  <p className="text-xs text-green-200">+5 this month</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">ROI</span>
                  </div>
                  <p className="text-xl font-bold">
                    <AnimatedCounter end={3.2} suffix="x" />
                  </p>
                  <p className="text-xs text-green-200">Above industry avg!</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className={`grid w-full ${
              userRole === "creator" 
                ? "grid-cols-6" 
                : "grid-cols-5"
            } bg-white border-b sticky top-0 z-10`}
          >
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3">
              <Home className="w-4 h-4" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex flex-col gap-1 py-3">
              <TargetIcon className="w-4 h-4" />
              <span className="text-xs">{userRole === "creator" ? "Campaigns" : "Create"}</span>
            </TabsTrigger>
            <TabsTrigger value="inbox" className="flex flex-col gap-1 py-3">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs">Inbox</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex flex-col gap-1 py-3">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Insights</span>
            </TabsTrigger>
            {userRole === "creator" && (
              <TabsTrigger value="recommendations" className="flex flex-col gap-1 py-3">
                <Lightbulb className="w-4 h-4" />
                <span className="text-xs">Tips</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="w-4 h-4" />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="p-0">
            {userRole === "creator" ? (
              <div className="p-4 space-y-6">
                {/* Content Suggestion Card with Carousel */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-pink-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <CardTitle className="text-lg">Perfect Time to Post!</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        {contentSuggestions.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedSuggestion(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === selectedSuggestion ? "bg-orange-500" : "bg-orange-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 rounded-full px-3 py-1">
                        <span className="text-sm font-semibold text-orange-700">{currentSuggestion?.day}</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{currentSuggestion?.time}</span>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {currentSuggestion?.confidence}% match
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-700 mb-3">{currentSuggestion?.caption}</p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-blue-700 font-medium">Trending hashtags:</p>
                        <p className="text-xs text-blue-600 mt-1">{currentSuggestion?.hashtags}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Create This Post
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Summary with Interactive Charts */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      This Week's Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          +<AnimatedCounter end={weeklyGrowth} suffix="%" />
                        </p>
                        <p className="text-sm text-gray-600">Follower Growth</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          <AnimatedCounter end={avgEngagement} suffix="%" />
                        </p>
                        <p className="text-sm text-gray-600">Avg Engagement</p>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">14-Day Trend</p>
                      <InteractiveChart data={analyticsData} dataKey="followers" color="#8B5CF6" title="Followers" />
                    </div>

                    {topPost && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">Top Post This Week</p>
                            <p className="text-sm text-gray-600">
                              <AnimatedCounter end={topPost.likes || 0} /> likes • {topPost.content}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-purple-600">{topPost.engagement}%</p>
                            <p className="text-xs text-gray-500">engagement</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* What's Working with Interactive Elements */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-500" />
                      What's Working
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Instagram className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Instagram</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          <AnimatedCounter end={4.8} suffix="%" />
                        </p>
                        <p className="text-xs text-green-600">engagement rate</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Youtube className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">YouTube</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          <AnimatedCounter end={6.2} suffix="%" />
                        </p>
                        <p className="text-xs text-blue-600">engagement rate</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">Fitness content is 🔥</p>
                          <p className="text-sm text-gray-600">Your workout videos get 3x more engagement</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Opportunities */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      Brand Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {brandOpportunities.slice(0, 2).map((opportunity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{opportunity.brand}</p>
                          <p className="text-sm text-gray-600">{opportunity.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-green-600 font-medium">${opportunity.budget}</span>
                            <span className="text-xs text-gray-500">{opportunity.platform}</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Apply
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Opportunities
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandHome />
            )}
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="p-4">
            {userRole === "brand" ? (
              <CampaignCreator />
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Campaigns</h2>
                  <p className="text-gray-600">Find and apply to brand campaigns that match your niche</p>
                </div>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src="/placeholder-logo.png" alt="SportFit Pro" className="w-10 h-10 rounded-lg" />
                        <div>
                          <CardTitle className="text-lg">Summer Fitness Challenge</CardTitle>
                          <p className="text-sm text-gray-600">SportFit Pro</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-700">
                        $2,500
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Create engaging fitness content promoting our new protein powder. 
                      Looking for authentic fitness influencers with engaged audiences.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>50K+ followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>2 weeks</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Inbox</h2>
                  <p className="text-gray-600">
                    {userRole === "creator" 
                      ? "Manage brand collaborations and applications" 
                      : "Review influencer applications and manage campaigns"
                    }
                  </p>
                </div>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No Messages Yet</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {userRole === "creator" 
                        ? "Start applying to campaigns to receive messages from brands"
                        : "Create campaigns to start receiving applications from influencers"
                      }
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      onClick={() => setActiveTab("campaigns")}
                    >
                      {userRole === "creator" ? "Browse Campaigns" : "Create Campaign"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="p-4">
            {userRole === "creator" ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveChart data={analyticsData} dataKey="followers" color="#8B5CF6" title="Followers" />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contentPerformance.map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{content.title}</p>
                            <p className="text-sm text-gray-500">{content.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{content.engagement}%</p>
                          <p className="text-xs text-gray-500">engagement</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandInsights />
            )}
          </TabsContent>

          {/* Recommendations Tab (Creator only) */}
          {userRole === "creator" && (
            <TabsContent value="recommendations" className="p-4">
              <CreatorRecommendations />
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="p-4">
            {userRole === "creator" ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Get notified about new opportunities</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Privacy Settings</p>
                        <p className="text-sm text-gray-500">Control your profile visibility</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Connected Accounts</p>
                        <p className="text-sm text-gray-500">Manage your social media connections</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandSettings />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


