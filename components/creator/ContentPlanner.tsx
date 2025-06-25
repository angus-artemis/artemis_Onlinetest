"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, TrendingUp, Zap, Target, Plus, Play, ImageIcon, Eye, Sparkles } from "lucide-react"

export function ContentPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showNewPost, setShowNewPost] = useState(false)

  const scheduledPosts = [
    {
      id: "1",
      date: "Dec 15",
      time: "6:30 PM",
      type: "Reel",
      title: "Morning Workout Routine",
      description: "5-minute energizing morning routine",
      predictedEngagement: 12.4,
      optimalTime: true,
      hashtags: ["#MorningWorkout", "#FitnessMotivation", "#HealthyLifestyle"],
      status: "scheduled",
    },
    {
      id: "2",
      date: "Dec 16",
      time: "7:00 AM",
      type: "Carousel",
      title: "Protein-Rich Breakfast Ideas",
      description: "5 quick breakfast recipes for busy mornings",
      predictedEngagement: 9.8,
      optimalTime: false,
      hashtags: ["#HealthyBreakfast", "#ProteinPacked", "#MealPrep"],
      status: "draft",
    },
    {
      id: "3",
      date: "Dec 17",
      time: "2:00 PM",
      type: "Story",
      title: "Behind the Scenes",
      description: "Gym session prep and mindset",
      predictedEngagement: 15.2,
      optimalTime: true,
      hashtags: ["#BTS", "#GymLife", "#Mindset"],
      status: "idea",
    },
  ]

  const contentSuggestions = [
    {
      id: "1",
      type: "Trending Topic",
      title: "New Year Fitness Resolutions",
      reason: "Trending 156% this week",
      suggestedTime: "Dec 18, 6:30 PM",
      expectedEngagement: 14.2,
      difficulty: "Easy",
      hashtags: ["#NewYearGoals", "#FitnessResolution", "#2025Goals"],
    },
    {
      id: "2",
      type: "Audience Request",
      title: "Home Workout Equipment Review",
      reason: "Requested by 23 followers",
      suggestedTime: "Dec 19, 7:00 PM",
      expectedEngagement: 11.8,
      difficulty: "Medium",
      hashtags: ["#HomeGym", "#FitnessEquipment", "#WorkoutGear"],
    },
    {
      id: "3",
      type: "Competitor Gap",
      title: "Mental Health & Fitness",
      reason: "Underserved topic in your niche",
      suggestedTime: "Dec 20, 8:00 PM",
      expectedEngagement: 13.5,
      difficulty: "Medium",
      hashtags: ["#MentalHealth", "#FitnessJourney", "#Wellness"],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Reel":
        return <Play className="w-4 h-4 text-pink-600" />
      case "Carousel":
        return <ImageIcon className="w-4 h-4 text-blue-600" />
      case "Story":
        return <Eye className="w-4 h-4 text-green-600" />
      default:
        return <ImageIcon className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "idea":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Content Calendar */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                Content Calendar
              </CardTitle>
              <p className="text-sm text-gray-600">Plan and schedule your content for maximum impact</p>
            </div>
            <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Post Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reel">Reel</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Post title" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Describe your content" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Time</label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hashtags</label>
                    <Input placeholder="#fitness #motivation #health" />
                  </div>
                  <Button className="w-full">Schedule Post</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border-0" />
        </CardContent>
      </Card>

      {/* Scheduled Posts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
          <p className="text-sm text-gray-600">Your scheduled content pipeline</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(post.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <p className="text-xs text-gray-500">{post.description}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3 text-gray-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>{post.time}</span>
                  {post.optimalTime && <Badge className="bg-green-100 text-green-700 ml-1">Optimal</Badge>}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                  <span>{post.predictedEngagement}% predicted</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-gray-400" />
                  <span>{post.type}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {post.hashtags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Content Suggestions */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            AI Content Suggestions
          </CardTitle>
          <p className="text-sm text-gray-600">Trending topics and opportunities for your niche</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {contentSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge className="bg-orange-100 text-orange-700">{suggestion.type}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">{suggestion.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{suggestion.expectedEngagement}%</p>
                  <p className="text-xs text-gray-500">expected engagement</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>{suggestion.suggestedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-gray-400" />
                  <span>{suggestion.difficulty} to create</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                  <span>High potential</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {suggestion.hashtags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500">
                  Use This Idea
                </Button>
                <Button size="sm" variant="outline">
                  Save for Later
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
