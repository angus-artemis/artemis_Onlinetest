import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Target, Download } from "lucide-react"
import { InteractiveChart } from "../InteractiveChart"

export function BrandInsights() {
  // Mock data
  const analyticsData = Array.from({ length: 30 }).map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))

    return {
      date: date.toISOString().split("T")[0],
      reach: 5000 + Math.floor(Math.random() * 1000) * (i / 5),
      engagement: 5 + Math.random() * 5,
      followers: 0,
      impressions: 0,
    }
  })

  const campaignMetrics = [
    { name: "Reach", value: 287500, target: 300000, percentage: 95.8 },
    { name: "Engagement", value: 8.3, target: 10, percentage: 83 },
    { name: "Conversions", value: 865, target: 1000, percentage: 86.5 },
    { name: "ROI", value: 3.2, target: 3, percentage: 106.7 },
  ]

  const audienceInsights = [
    { demographic: "Age 18-24", percentage: 35 },
    { demographic: "Age 25-34", percentage: 42 },
    { demographic: "Age 35-44", percentage: 15 },
    { demographic: "Age 45+", percentage: 8 },
  ]

  return (
    <div className="p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Campaign Analytics
          </CardTitle>
          <p className="text-sm text-gray-600">Performance across all campaigns</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3">Reach Trend</h4>
            <InteractiveChart data={analyticsData} dataKey="reach" color="#3B82F6" title="Reach" />
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-3">Engagement Trend</h4>
            <InteractiveChart data={analyticsData} dataKey="engagement" color="#8B5CF6" title="Engagement Rate" />
          </div>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Campaign Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {campaignMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.name}</span>
                <span className="font-semibold">
                  {metric.name === "ROI"
                    ? `${metric.value}x`
                    : metric.name === "Engagement"
                      ? `${metric.value}%`
                      : metric.value.toLocaleString()}
                  <span className="text-gray-500 text-xs ml-1">
                    /{" "}
                    {metric.name === "ROI"
                      ? `${metric.target}x`
                      : metric.name === "Engagement"
                        ? `${metric.target}%`
                        : metric.target.toLocaleString()}
                  </span>
                </span>
              </div>
              <Progress
                value={metric.percentage}
                className="h-2"
                indicatorClassName={metric.percentage >= 100 ? "bg-green-500" : ""}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Audience Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {audienceInsights.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.demographic}</span>
                <span className="font-semibold">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
