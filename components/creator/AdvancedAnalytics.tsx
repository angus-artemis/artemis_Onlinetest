"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Target, Clock, MapPin } from "lucide-react"

export function AdvancedAnalytics() {
  const audienceInsights = {
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 35, growth: "+2.3%" },
        { range: "25-34", percentage: 42, growth: "+1.8%" },
        { range: "35-44", percentage: 15, growth: "-0.5%" },
        { range: "45+", percentage: 8, growth: "+0.2%" },
      ],
      gender: {
        female: 68,
        male: 30,
        other: 2,
      },
      topLocations: [
        { city: "Los Angeles", percentage: 12 },
        { city: "New York", percentage: 8 },
        { city: "Miami", percentage: 6 },
        { city: "Chicago", percentage: 5 },
      ],
    },
    interests: [
      { category: "Fitness & Health", percentage: 85 },
      { category: "Nutrition", percentage: 72 },
      { category: "Lifestyle", percentage: 58 },
      { category: "Fashion", percentage: 45 },
      { category: "Travel", percentage: 38 },
    ],
    activityPatterns: {
      peakHours: ["6:00 PM", "7:30 PM", "9:00 PM"],
      peakDays: ["Tuesday", "Thursday", "Sunday"],
      engagementByHour: [
        { hour: "6 AM", engagement: 3.2 },
        { hour: "9 AM", engagement: 5.8 },
        { hour: "12 PM", engagement: 7.1 },
        { hour: "3 PM", engagement: 6.4 },
        { hour: "6 PM", engagement: 12.8 },
        { hour: "9 PM", engagement: 11.2 },
      ],
    },
  }

  const competitorAnalysis = [
    {
      name: "@fitnessguru_mike",
      followers: 28500,
      engagement: 7.2,
      avgLikes: 1850,
      contentGaps: ["Morning routines", "Meal prep"],
      opportunities: "Post more educational content",
    },
    {
      name: "@healthy_sarah",
      followers: 31200,
      engagement: 6.8,
      avgLikes: 1920,
      contentGaps: ["Workout tutorials", "Supplement reviews"],
      opportunities: "Focus on video content",
    },
    {
      name: "@athlete_alex",
      followers: 22800,
      engagement: 9.1,
      avgLikes: 1680,
      contentGaps: ["Recovery tips", "Mental health"],
      opportunities: "Collaborate on challenges",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Audience Deep Dive
          </CardTitle>
          <p className="text-sm text-gray-600">Understand who's engaging with your content</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="demographics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
            </TabsList>

            <TabsContent value="demographics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Age Distribution</h4>
                  {audienceInsights.demographics.ageGroups.map((group, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{group.range}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{group.percentage}%</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {group.growth}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={group.percentage} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Top Locations</h4>
                  {audienceInsights.demographics.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{location.city}</span>
                      </div>
                      <span className="text-sm font-medium">{location.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interests" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Audience Interests</h4>
                {audienceInsights.interests.map((interest, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{interest.category}</span>
                      <span className="font-medium">{interest.percentage}%</span>
                    </div>
                    <Progress value={interest.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Peak Activity Times</h4>
                  <div className="space-y-2">
                    {audienceInsights.activityPatterns.peakHours.map((hour, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">{hour}</span>
                        <Badge className="bg-orange-100 text-orange-700">Peak</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Best Days to Post</h4>
                  <div className="space-y-2">
                    {audienceInsights.activityPatterns.peakDays.map((day, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{day}</span>
                        <Badge className="bg-blue-100 text-blue-700">High Engagement</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Competitor Analysis
          </CardTitle>
          <p className="text-sm text-gray-600">See how you stack up against similar creators</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {competitorAnalysis.map((competitor, index) => (
            <div key={index} className="p-4 border rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-sm">{competitor.name}</h4>
                  <p className="text-xs text-gray-500">{competitor.followers.toLocaleString()} followers</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{competitor.engagement}% engagement</p>
                  <p className="text-xs text-gray-500">{competitor.avgLikes} avg likes</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Content Gaps:</p>
                  <div className="flex gap-1">
                    {competitor.contentGaps.map((gap, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-yellow-100 text-yellow-700">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-xs text-green-800">
                    <span className="font-medium">Opportunity:</span> {competitor.opportunities}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
