import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Search, Target, Play, ImageIcon, Filter } from "lucide-react"
import { AnimatedCounter } from "../AnimatedCounter"

interface Creator {
  id: string
  name: string
  handle: string
  followers: number
  engagement: number
  niche: string
  match: number
  avatar: string
}

interface Campaign {
  id: string
  name: string
  status: "active" | "draft" | "completed"
  budget: number
  spent: number
  reach: number
  engagement: number
  conversions: number
}

export function BrandHome() {
  // Mock data for brand perspective
  const topCreators: Creator[] = [
    {
      id: "1",
      name: "Alex Johnson",
      handle: "@alexfitness",
      followers: 24567,
      engagement: 8.7,
      niche: "Fitness",
      match: 94,
      avatar: "AJ",
    },
    {
      id: "2",
      name: "Sarah Williams",
      handle: "@sarahsports",
      followers: 35892,
      engagement: 7.2,
      niche: "Sports",
      match: 89,
      avatar: "SW",
    },
    {
      id: "3",
      name: "Mike Chen",
      handle: "@mikenutrition",
      followers: 18345,
      engagement: 9.1,
      niche: "Nutrition",
      match: 86,
      avatar: "MC",
    },
  ]

  const activeCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Collection Launch",
      status: "active",
      budget: 5000,
      spent: 2750,
      reach: 125000,
      engagement: 8.3,
      conversions: 342,
    },
    {
      id: "2",
      name: "Fitness Challenge",
      status: "draft",
      budget: 3500,
      spent: 0,
      reach: 0,
      engagement: 0,
      conversions: 0,
    },
    {
      id: "3",
      name: "Spring Promotion",
      status: "completed",
      budget: 4200,
      spent: 4200,
      reach: 187000,
      engagement: 7.8,
      conversions: 523,
    },
  ]

  const contentPerformance = [
    { type: "Reels", engagement: 12.4, posts: 8, trend: "up" },
    { type: "Carousels", engagement: 9.2, posts: 5, trend: "up" },
    { type: "Single Posts", engagement: 6.8, posts: 12, trend: "down" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Creator Discovery Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-lg">Creator Discovery</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search creators by niche, location, or audience..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Top Matches for Your Brand</h3>
              <Button variant="link" size="sm" className="text-blue-600 p-0">
                View All
              </Button>
            </div>

            {topCreators.map((creator) => (
              <div key={creator.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-medium">
                    {creator.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{creator.name}</p>
                    <p className="text-xs text-gray-500">
                      {creator.handle} • {creator.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">{creator.match}% match</Badge>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
            Find More Creators
          </Button>
        </CardContent>
      </Card>

      {/* Campaign Performance */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                <AnimatedCounter end={187000} />
              </p>
              <p className="text-sm text-gray-600">Total Reach</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">
                <AnimatedCounter end={8.3} suffix="%" />
              </p>
              <p className="text-sm text-gray-600">Avg Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                <AnimatedCounter end={865} />
              </p>
              <p className="text-sm text-gray-600">Conversions</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-sm">Active Campaigns</h3>
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{campaign.name}</p>
                    <p className="text-xs text-gray-500">
                      ${campaign.spent.toLocaleString()} of ${campaign.budget.toLocaleString()} spent
                    </p>
                  </div>
                  <Badge
                    className={
                      campaign.status === "active"
                        ? "bg-green-100 text-green-800"
                        : campaign.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
                {campaign.status === "active" && (
                  <>
                    <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1 mb-2" />
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500">Reach</p>
                        <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-medium">{campaign.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Conversions</p>
                        <p className="font-medium">{campaign.conversions}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Strategy */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Content Strategy
          </CardTitle>
          <p className="text-sm text-gray-600">Best performing content types</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {contentPerformance.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.type === "Reels" ? "bg-pink-100" : item.type === "Carousels" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {item.type === "Reels" ? (
                    <Play className="w-4 h-4 text-pink-600" />
                  ) : item.type === "Carousels" ? (
                    <ImageIcon className="w-4 h-4 text-blue-600" />
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
                <p className="text-xs text-gray-500">avg engagement</p>
              </div>
            </div>
          ))}

          <Button className="w-full">Create Content Brief</Button>
        </CardContent>
      </Card>
    </div>
  )
}
