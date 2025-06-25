"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Sparkles, TrendingUp, Users, Target, Zap } from "lucide-react"

interface DemoModeProps {
  onStartDemo: () => void
  onEndDemo: () => void
}

export function DemoMode({ onStartDemo, onEndDemo }: DemoModeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoSteps = [
    {
      title: "Welcome to Artemis!",
      description: "Your AI-powered social media growth platform",
      highlight: "dashboard-header",
      content: "Artemis analyzes your Instagram data to provide personalized recommendations for growth.",
    },
    {
      title: "Real-time Analytics",
      description: "See your follower growth and engagement trends",
      highlight: "analytics-cards",
      content: "Track your performance with live data from Instagram APIs.",
    },
    {
      title: "AI Recommendations",
      description: "Get personalized content suggestions",
      highlight: "content-suggestions",
      content: "Our AI analyzes your best-performing content to suggest optimal posting strategies.",
    },
    {
      title: "Content Calendar",
      description: "Plan and schedule your posts",
      highlight: "calendar-tab",
      content: "Schedule posts at optimal times based on your audience activity patterns.",
    },
    {
      title: "Brand Partnerships",
      description: "Discover collaboration opportunities",
      highlight: "brand-opportunities",
      content: "Connect with brands that match your niche and audience demographics.",
    },
  ]

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onEndDemo()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Auto-advance every 3 seconds when playing
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < demoSteps.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            clearInterval(interval)
            return prev
          }
        })
      }, 3000)
    }
  }

  const currentStepData = demoSteps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
          <p className="text-sm text-gray-600">{currentStepData.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-700">{currentStepData.content}</p>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Demo Progress</span>
              <span>
                {currentStep + 1} of {demoSteps.length}
              </span>
            </div>
            <Progress value={((currentStep + 1) / demoSteps.length) * 100} className="h-2" />
          </div>

          {/* Demo features showcase */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-medium">Real-time Analytics</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-medium">AI Recommendations</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-medium">Audience Insights</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Target className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <p className="text-xs font-medium">Brand Matching</p>
            </div>
          </div>

          {/* Sample metrics */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3">Sample Results</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">+127%</p>
                <p className="text-xs text-gray-600">Engagement Increase</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">+2.3k</p>
                <p className="text-xs text-gray-600">New Followers</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentStep(0)}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <Button onClick={handleNext} className="bg-gradient-to-r from-purple-500 to-blue-500">
              {currentStep === demoSteps.length - 1 ? "Start Using Artemis" : "Next"}
            </Button>
          </div>

          {/* Skip demo */}
          <div className="text-center">
            <Button variant="link" onClick={onEndDemo} className="text-sm text-gray-500">
              Skip Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
