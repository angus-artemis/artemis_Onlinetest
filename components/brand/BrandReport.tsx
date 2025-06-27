import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ChevronRight, Users, DollarSign, TrendingUp, BarChart3 } from "lucide-react"
import { AnimatedCounter } from "../AnimatedCounter"

export function BrandReport() {
  // Mock data
  const campaignSummary = {
    totalCampaigns: 12,
    activeCampaigns: 3,
    totalCreators: 28,
    totalSpend: 32500,
    totalReach: 875000,
    averageEngagement: 7.8,
    roi: 3.2,
  }

  const topPerformers = [
    {
      id: "1",
      name: "Glenn Chen",
      handle: "@glennchen_fitness",
      campaign: "Summer Collection",
      engagement: 12.4,
      roi: 4.2,
    },
    {
      id: "2",
      name: "Sarah Williams",
      handle: "@sarahsports",
      campaign: "Fitness Challenge",
      engagement: 10.8,
      roi: 3.7,
    },
    {
      id: "3",
      name: "Mike Chen",
      handle: "@mikenutrition",
      campaign: "Product Launch",
      engagement: 9.6,
      roi: 3.5,
    },
  ]

  return (
    <div className="p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Campaign Report
            </CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">Creators</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                <AnimatedCounter end={campaignSummary.totalCreators} />
              </p>
              <p className="text-xs text-blue-600">Across {campaignSummary.totalCampaigns} campaigns</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <p className="text-sm font-medium text-green-800">ROI</p>
              </div>
              <p className="text-2xl font-bold text-green-700">
                <AnimatedCounter end={campaignSummary.roi} suffix="x" />
              </p>
              <p className="text-xs text-green-600">Return on investment</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Campaign Summary</h3>
              <Badge className="bg-blue-100 text-blue-800">Last 90 days</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Spend</p>
                <p className="font-semibold">${campaignSummary.totalSpend.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Active Campaigns</p>
                <p className="font-semibold">{campaignSummary.activeCampaigns}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Reach</p>
                <p className="font-semibold">{campaignSummary.totalReach.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Avg Engagement</p>
                <p className="font-semibold">{campaignSummary.averageEngagement}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Top Performing Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topPerformers.map((creator) => (
            <div key={creator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-medium">
                  {creator.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm">{creator.name}</p>
                  <p className="text-xs text-gray-500">
                    {creator.handle} • {creator.campaign}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{creator.engagement}%</p>
                <p className="text-xs text-gray-500">{creator.roi}x ROI</p>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full flex items-center justify-center gap-1">
            View All Creators
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-xl">
            <p className="font-medium text-sm text-blue-800 mb-1">Increase Reel Content</p>
            <p className="text-xs text-blue-700">
              Reels are performing 43% better than static posts. Consider allocating more budget to video content.
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <p className="font-medium text-sm text-green-800 mb-1">Optimize Posting Times</p>
            <p className="text-xs text-green-700">
              Content posted between 6-8pm is generating 27% higher engagement. Adjust your campaign schedule
              accordingly.
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl">
            <p className="font-medium text-sm text-purple-800 mb-1">Expand Creator Network</p>
            <p className="text-xs text-purple-700">
              Mid-tier creators (10k-50k followers) are delivering 2.1x better ROI than larger accounts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
