import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  Play,
  ImageIcon,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { AnimatedCounter } from "../AnimatedCounter"

export function CreatorRecommendations() {
  // Mock data based on analytics
  const recommendations = [
    {
      id: "1",
      type: "content-type",
      priority: "high",
      title: "Post More Reels",
      description: "Your Reels get 43% higher engagement than other content types",
      impact: "Potential +2.1k followers/month",
      action: "Create 3 more Reels this week",
      confidence: 94,
      category: "Content Strategy",
      icon: Play,
      color: "pink",
    },
    {
      id: "2",
      type: "timing",
      priority: "high",
      title: "Optimize Posting Times",
      description: "Your audience is most active between 6-8 PM on weekdays",
      impact: "Potential +27% engagement",
      action: "Schedule posts for 6:30 PM",
      confidence: 89,
      category: "Timing",
      icon: Clock,
      color: "orange",
    },
    {
      id: "3",
      type: "content-style",
      priority: "medium",
      title: "Add More Behind-the-Scenes",
      description: "BTS content performs 31% better than standard workout posts",
      impact: "Potential +15% engagement",
      action: "Share your pre-workout routine",
      confidence: 82,
      category: "Content Style",
      icon: Sparkles,
      color: "purple",
    },
    {
      id: "4",
      type: "hashtags",
      priority: "medium",
      title: "Update Hashtag Strategy",
      description: "5 of your current hashtags are oversaturated",
      impact: "Potential +12% reach",
      action: "Use trending fitness hashtags",
      confidence: 76,
      category: "Hashtags",
      icon: Target,
      color: "blue",
    },
    {
      id: "5",
      type: "collaboration",
      priority: "low",
      title: "Collaborate with Micro-Influencers",
      description: "Cross-promotion could expand your reach by 25%",
      impact: "Potential +1.5k followers",
      action: "Reach out to 3 similar creators",
      confidence: 71,
      category: "Growth",
      icon: Users,
      color: "green",
    },
  ]

  const contentIdeas = [
    {
      id: "1",
      title: "Morning Routine Reel",
      description: "5 AM wake-up to first workout",
      estimatedEngagement: 12.4,
      bestTime: "7:00 AM",
      hashtags: "#MorningMotivation #5AMClub #FitnessRoutine",
      type: "Reel",
    },
    {
      id: "2",
      title: "Workout Form Tutorial",
      description: "Proper deadlift technique carousel",
      estimatedEngagement: 9.8,
      bestTime: "6:30 PM",
      hashtags: "#DeadliftForm #FitnessTips #WorkoutTutorial",
      type: "Carousel",
    },
    {
      id: "3",
      title: "Transformation Tuesday",
      description: "Before/after progress comparison",
      estimatedEngagement: 11.2,
      bestTime: "2:00 PM",
      hashtags: "#TransformationTuesday #FitnessJourney #Progress",
      type: "Post",
    },
  ]

  const weeklyGoals = [
    { goal: "Post 3 Reels", current: 1, target: 3, percentage: 33 },
    { goal: "Engage with 50 comments", current: 32, target: 50, percentage: 64 },
    { goal: "Use trending hashtags", current: 2, target: 5, percentage: 40 },
    { goal: "Post at optimal times", current: 4, target: 7, percentage: 57 },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      pink: "bg-pink-100 text-pink-600",
      orange: "bg-orange-100 text-orange-600",
      purple: "bg-purple-100 text-purple-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
    }
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600"
  }

  return (
    <div className="p-4 space-y-6">
      {/* AI Insights Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-indigo-500" />
            <CardTitle className="text-lg">Artemis AI Recommendations</CardTitle>
          </div>
          <p className="text-sm text-gray-600">Powered by Artemis intelligence and trending insights</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">
                <AnimatedCounter end={94} suffix="%" />
              </p>
              <p className="text-xs text-gray-600">Accuracy Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                <AnimatedCounter end={5} />
              </p>
              <p className="text-xs text-gray-600">New Insights</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                +<AnimatedCounter end={2.8} suffix="k" />
              </p>
              <p className="text-xs text-gray-600">Potential Reach</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Recommendations */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Priority Actions
          </CardTitle>
          <p className="text-sm text-gray-600">High-impact recommendations for this week</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.slice(0, 3).map((rec) => (
            <div key={rec.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(rec.color)}`}>
                  <rec.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{rec.title}</h3>
                    <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {rec.confidence}% confident
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-green-600 font-medium">{rec.impact}</p>
                      <p className="text-xs text-gray-500">{rec.action}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Content Ideas */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Content Ideas for You
          </CardTitle>
          <p className="text-sm text-gray-600">AI-generated content suggestions based on trends</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {contentIdeas.map((idea) => (
            <div key={idea.id} className="p-3 border rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      idea.type === "Reel" ? "bg-pink-100" : idea.type === "Carousel" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {idea.type === "Reel" ? (
                      <Play className={`w-3 h-3 ${idea.type === "Reel" ? "text-pink-600" : "text-gray-600"}`} />
                    ) : idea.type === "Carousel" ? (
                      <ImageIcon className="w-3 h-3 text-blue-600" />
                    ) : (
                      <ImageIcon className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                  <h4 className="font-medium text-sm">{idea.title}</h4>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {idea.estimatedEngagement}% est. engagement
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">Best time: {idea.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">{idea.type}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                  Use Idea
                </Button>
              </div>
              <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">{idea.hashtags}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            This Week's Goals
          </CardTitle>
          <p className="text-sm text-gray-600">Track your progress toward optimal performance</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{goal.goal}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {goal.current}/{goal.target}
                  </span>
                  {goal.percentage >= 100 && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              </div>
              <Progress
                value={goal.percentage}
                className="h-2"
                indicatorClassName={goal.percentage >= 100 ? "bg-green-500" : ""}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* All Recommendations */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.slice(3).map((rec) => (
            <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(rec.color)}`}>
                  <rec.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="text-xs text-gray-500">{rec.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                  {rec.priority}
                </Badge>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
