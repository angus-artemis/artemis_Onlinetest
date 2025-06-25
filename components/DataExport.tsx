"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, FileText, Share2, Mail, Calendar, BarChart3, Users, TrendingUp, Plus } from "lucide-react"

export function DataExport() {
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["follower-growth", "engagement-rate", "top-posts"])
  const [isExporting, setIsExporting] = useState(false)

  const exportFormats = [
    { value: "pdf", label: "PDF Report", icon: FileText, description: "Professional report with charts" },
    { value: "csv", label: "CSV Data", icon: BarChart3, description: "Raw data for analysis" },
    { value: "png", label: "PNG Charts", icon: TrendingUp, description: "High-quality chart images" },
  ]

  const timeframes = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" },
    { value: "custom", label: "Custom range" },
  ]

  const availableMetrics = [
    { id: "follower-growth", label: "Follower Growth", icon: Users },
    { id: "engagement-rate", label: "Engagement Rate", icon: TrendingUp },
    { id: "top-posts", label: "Top Performing Posts", icon: BarChart3 },
    { id: "audience-insights", label: "Audience Demographics", icon: Users },
    { id: "posting-times", label: "Optimal Posting Times", icon: Calendar },
    { id: "hashtag-performance", label: "Hashtag Analysis", icon: BarChart3 },
    { id: "content-performance", label: "Content Type Performance", icon: TrendingUp },
    { id: "competitor-analysis", label: "Competitor Comparison", icon: BarChart3 },
  ]

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]))
  }

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Create a mock download
    const fileName = `artemis-report-${selectedTimeframe}.${selectedFormat}`
    const blob = new Blob(["Mock export data"], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)

    setIsExporting(false)
  }

  const handleShare = async (platform: string) => {
    const shareText = "Check out my Instagram growth stats from Artemis! 📈 #SocialMediaGrowth #Artemis"
    const shareUrl = "https://artemis.app/share/report/abc123"

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`)
    } else if (platform === "linkedin") {
      window.open(`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`)
    } else if (platform === "email") {
      window.open(`mailto:?subject=My Artemis Growth Report&body=${shareText} ${shareUrl}`)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-500" />
            Export Your Data
          </CardTitle>
          <p className="text-sm text-gray-600">Download your analytics and insights in various formats</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Export Format</label>
            <div className="grid grid-cols-1 gap-3">
              {exportFormats.map((format) => (
                <div
                  key={format.value}
                  className={`p-3 border rounded-xl cursor-pointer transition-colors ${
                    selectedFormat === format.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedFormat(format.value)}
                >
                  <div className="flex items-center gap-3">
                    <format.icon
                      className={`w-5 h-5 ${selectedFormat === format.value ? "text-blue-600" : "text-gray-500"}`}
                    />
                    <div>
                      <p className="font-medium text-sm">{format.label}</p>
                      <p className="text-xs text-gray-500">{format.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Time Period</label>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Metrics Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Include Metrics</label>
            <div className="grid grid-cols-1 gap-2">
              {availableMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                  <Checkbox
                    id={metric.id}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <metric.icon className="w-4 h-4 text-gray-500" />
                  <label htmlFor={metric.id} className="text-sm font-medium cursor-pointer flex-1">
                    {metric.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Export Preview */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-sm mb-2">Export Preview</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Format: {exportFormats.find((f) => f.value === selectedFormat)?.label}</p>
              <p>Period: {timeframes.find((t) => t.value === selectedTimeframe)?.label}</p>
              <p>Metrics: {selectedMetrics.length} selected</p>
              <p>
                Estimated size: {selectedFormat === "pdf" ? "2.3 MB" : selectedFormat === "csv" ? "156 KB" : "890 KB"}
              </p>
            </div>
          </div>

          {/* Export Button */}
          <Button
            onClick={handleExport}
            disabled={isExporting || selectedMetrics.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {isExporting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Export...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-green-500" />
            Share Your Success
          </CardTitle>
          <p className="text-sm text-gray-600">Show off your growth achievements</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Achievement Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <p className="text-2xl font-bold text-green-600">+127%</p>
              <p className="text-xs text-green-700">Engagement Growth</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <p className="text-2xl font-bold text-blue-600">+2.3k</p>
              <p className="text-xs text-blue-700">New Followers</p>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("twitter")}>
              <div className="w-5 h-5 bg-blue-400 rounded mr-3"></div>
              Share on Twitter
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("linkedin")}>
              <div className="w-5 h-5 bg-blue-600 rounded mr-3"></div>
              Share on LinkedIn
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleShare("email")}>
              <Mail className="w-5 h-5 mr-3" />
              Share via Email
            </Button>
          </div>

          {/* Custom Share Message */}
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-600 mb-2">Share message:</p>
            <p className="text-sm">
              "Just hit a new milestone! 📈 My Instagram engagement is up 127% thanks to @ArtemisApp's AI insights!
              #SocialMediaGrowth #ContentCreator"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Scheduled Reports
          </CardTitle>
          <p className="text-sm text-gray-600">Get regular insights delivered to your inbox</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-sm">Weekly Growth Report</p>
                <p className="text-xs text-gray-500">Every Monday at 9:00 AM</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-sm">Monthly Analytics Summary</p>
                <p className="text-xs text-gray-500">First Monday of each month</p>
              </div>
              <Badge className="bg-gray-100 text-gray-800">Paused</Badge>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Schedule New Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Automated Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="monthly">Monthly Analytics</SelectItem>
                      <SelectItem value="quarterly">Quarterly Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Schedule Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
