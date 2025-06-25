"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Heart,
  CalendarIcon,
  BarChart3,
  FileText,
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
} from "lucide-react"
import { useDashboardData } from "./hooks/useDashboardData"
import { LoadingScreen } from "./components/LoadingScreen"
import { AnimatedCounter } from "./components/AnimatedCounter"
import { InteractiveChart } from "./components/InteractiveChart"
import type { Post } from "./types/dashboard"
import { LoginPage } from "./components/LoginPage"
import { CreatorRecommendations } from "./components/creator/CreatorRecommendations"
import { BrandHome } from "./components/brand/BrandHome"
import { BrandCalendar } from "./components/brand/BrandCalendar"
import { BrandInsights } from "./components/brand/BrandInsights"
import { BrandReport } from "./components/brand/BrandReport"
import { BrandSettings } from "./components/brand/BrandSettings"
import { AccountConnection } from "./components/onboarding/AccountConnection"

export default function InfluencerDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [newPost, setNewPost] = useState<Partial<Post>>({
    type: "Post",
    status: "draft",
  })
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

  const handleCreatePost = () => {
    if (newPost.content && newPost.date && newPost.time) {
      addNewPost({
        date: newPost.date,
        time: newPost.time,
        type: newPost.type as Post["type"],
        content: newPost.content,
        status: newPost.status as Post["status"],
      })
      setNewPost({ type: "Post", status: "draft" })
      setShowNewPostDialog(false)
    }
  }

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
            className={`grid w-full ${userRole === "creator" ? "grid-cols-6" : "grid-cols-5"} bg-white border-b sticky top-0 z-10`}
          >
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3">
              <Home className="w-4 h-4" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex flex-col gap-1 py-3">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-xs">Calendar</span>
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
            <TabsTrigger value="brand" className="flex flex-col gap-1 py-3">
              <FileText className="w-4 h-4" />
              <span className="text-xs">{userRole === "creator" ? "Brand" : "Report"}</span>
            </TabsTrigger>
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
                    <p className="text-sm text-gray-600">Your best performing content types</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contentPerformance.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              item.type === "Reels"
                                ? "bg-pink-100"
                                : item.type === "Carousels"
                                  ? "bg-blue-100"
                                  : item.type === "Stories"
                                    ? "bg-green-100"
                                    : "bg-gray-100"
                            }`}
                          >
                            {item.type === "Reels" ? (
                              <Play className="w-4 h-4 text-pink-600" />
                            ) : item.type === "Carousels" ? (
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                            ) : item.type === "Stories" ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.type}</p>
                            <p className="text-xs text-gray-500">{item.posts} posts</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{item.engagement}%</p>
                          <div className="flex items-center gap-1">
                            {item.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : item.trend === "down" ? (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            ) : (
                              <div className="w-3 h-3 bg-gray-400 rounded-full" />
                            )}
                            <span
                              className={`text-xs ${
                                item.trend === "up"
                                  ? "text-green-600"
                                  : item.trend === "down"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {item.trend === "up" ? "Growing" : item.trend === "down" ? "Declining" : "Stable"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandHome />
            )}
          </TabsContent>

          {/* Calendar Tab with Interactive Features */}
          <TabsContent value="calendar" className="p-0">
            {userRole === "creator" ? (
              <div className="p-4 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Content Calendar</CardTitle>
                        <p className="text-sm text-gray-600">Plan your posts for maximum impact</p>
                      </div>
                      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                            <Plus className="w-4 h-4 mr-1" />
                            New Post
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Post</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Content</label>
                              <Textarea
                                placeholder="What's your post about?"
                                value={newPost.content || ""}
                                onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Date</label>
                                <Input
                                  type="date"
                                  value={newPost.date || ""}
                                  onChange={(e) => setNewPost((prev) => ({ ...prev, date: e.target.value }))}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Time</label>
                                <Input
                                  type="time"
                                  value={newPost.time || ""}
                                  onChange={(e) => setNewPost((prev) => ({ ...prev, time: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Type</label>
                                <Select
                                  value={newPost.type}
                                  onValueChange={(value) =>
                                    setNewPost((prev) => ({ ...prev, type: value as Post["type"] }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Post">Post</SelectItem>
                                    <SelectItem value="Reel">Reel</SelectItem>
                                    <SelectItem value="Carousel">Carousel</SelectItem>
                                    <SelectItem value="Story">Story</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <Select
                                  value={newPost.status}
                                  onValueChange={(value) =>
                                    setNewPost((prev) => ({ ...prev, status: value as Post["status"] }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="idea">Idea</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button onClick={handleCreatePost} className="w-full">
                              Create Post
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border-0"
                    />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Upcoming Posts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {posts
                      .filter((p) => p.status !== "published")
                      .map((post, index) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{post.date.split(" ")[1]}</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{post.content}</p>
                              <p className="text-xs text-gray-500">
                                {post.time} • {post.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(post.status)}>
                              {getStatusIcon(post.status)}
                              <span className="ml-1">{post.status}</span>
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const nextStatus =
                                  post.status === "idea" ? "draft" : post.status === "draft" ? "scheduled" : "published"
                                updatePostStatus(post.id, nextStatus)
                              }}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandCalendar />
            )}
          </TabsContent>

          {/* Enhanced Insights Tab */}
          <TabsContent value="insights" className="p-0">
            {userRole === "creator" ? (
              <div className="p-4 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Growth Analytics</CardTitle>
                    <p className="text-sm text-gray-600">Your account is on fire! 🔥</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Follower Growth</span>
                        <span className="font-semibold text-green-600">+{weeklyGrowth.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(weeklyGrowth * 8, 100)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span className="font-semibold text-blue-600">{avgEngagement}%</span>
                      </div>
                      <Progress value={avgEngagement * 10} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Content Consistency</span>
                        <span className="font-semibold text-purple-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    {/* Interactive Chart */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-sm mb-3">Engagement Trend</h4>
                      <InteractiveChart
                        data={analyticsData}
                        dataKey="engagement"
                        color="#3B82F6"
                        title="Engagement Rate"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Best Posting Times</CardTitle>
                    <p className="text-sm text-gray-600">When your audience is most active</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-orange-50 rounded-xl">
                        <p className="text-lg font-bold text-orange-600">6:30 PM</p>
                        <p className="text-sm text-orange-700">Weekdays</p>
                        <p className="text-xs text-orange-600 mt-1">Peak engagement</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-lg font-bold text-blue-600">10:00 AM</p>
                        <p className="text-sm text-blue-700">Weekends</p>
                        <p className="text-xs text-blue-600 mt-1">High reach</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Audience Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-purple-600">68%</p>
                        <p className="text-xs text-gray-600">Female</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">25-34</p>
                        <p className="text-xs text-gray-600">Top Age</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">US</p>
                        <p className="text-xs text-gray-600">Top Country</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandInsights />
            )}
          </TabsContent>

          {/* Recommendations Tab - Creator Only */}
          {userRole === "creator" && (
            <TabsContent value="recommendations" className="p-0">
              <CreatorRecommendations />
            </TabsContent>
          )}

          {/* Enhanced Brand Report Tab */}
          <TabsContent value="brand" className="p-0">
            {userRole === "creator" ? (
              <div className="p-4 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Brand Partnerships</CardTitle>
                    <p className="text-sm text-gray-600">Your collaboration opportunities</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">You're Brand-Ready!</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Your engagement rate qualifies you for premium partnerships
                      </p>
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                        Explore Opportunities
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Available Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {brandOpportunities.map((opportunity) => (
                      <div key={opportunity.id} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-sm">{opportunity.brand}</h4>
                            <p className="text-xs text-gray-500">{opportunity.category}</p>
                          </div>
                          <Badge
                            className={
                              opportunity.status === "available"
                                ? "bg-green-100 text-green-800"
                                : opportunity.status === "negotiating"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {opportunity.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Estimated Pay:</span>
                            <span className="font-medium">{opportunity.estimatedPay}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Requirements:</span>
                            <span className="font-medium">{opportunity.requirements}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium">{opportunity.deadline}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-3"
                          variant={opportunity.status === "available" ? "default" : "outline"}
                          disabled={opportunity.status === "negotiating"}
                        >
                          {opportunity.status === "available"
                            ? "Apply Now"
                            : opportunity.status === "negotiating"
                              ? "In Progress"
                              : "View Details"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <BrandReport />
            )}
          </TabsContent>

          {/* Enhanced Settings Tab */}
          <TabsContent value="settings" className="p-0">
            {userRole === "creator" ? (
              <div className="p-4 space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">Notifications</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">Connected Accounts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">3 connected</Badge>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">Privacy & Security</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">Language & Region</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">Help & Support</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-600">Sign Out</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <p className="text-sm text-gray-600">Manage your social media connections</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-pink-500" />
                        <div>
                          <span className="text-sm font-medium">Instagram</span>
                          <p className="text-xs text-gray-500">@alexfitness • 24.5k followers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b opacity-50">
                      <div className="flex items-center gap-3">
                        <Youtube className="w-5 h-5 text-red-500" />
                        <span className="text-sm">YouTube</span>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Coming Soon
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-2 opacity-50">
                      <div className="flex items-center gap-3">
                        <Twitter className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">Twitter/X</span>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Coming Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>App Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Version</span>
                      <span>2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated</span>
                      <span>Dec 10, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Usage</span>
                      <span>12.4 MB</span>
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
