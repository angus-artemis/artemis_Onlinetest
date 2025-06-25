"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Users,
  Sparkles,
  Globe,
  Hash,
  Camera,
  Cpu,
  Database,
  Activity,
} from "lucide-react"

export function ArtemisAI() {
  const aiModels = [
    {
      name: "Content Performance Analyzer",
      description: "Analyzes your post history to identify patterns",
      accuracy: 73,
      technology: "Statistical Analysis + Basic ML",
      dataPoints: "Your Instagram posts, engagement data, posting times",
      icon: TrendingUp,
      color: "purple",
      status: "Active",
    },
    {
      name: "Optimal Timing Suggestions",
      description: "Suggests posting times based on your audience activity",
      accuracy: 68,
      technology: "Time Series Analysis",
      dataPoints: "Your follower activity, engagement windows, timezone data",
      icon: Clock,
      color: "blue",
      status: "Active",
    },
    {
      name: "Hashtag Performance Tracker",
      description: "Tracks which hashtags work best for your content",
      accuracy: 71,
      technology: "Pattern Recognition",
      dataPoints: "Your hashtag usage, reach data, engagement correlation",
      icon: Hash,
      color: "green",
      status: "Active",
    },
    {
      name: "Trend Detection (Beta)",
      description: "Identifies trending topics in your niche",
      accuracy: 58,
      technology: "Basic NLP + Trend Analysis",
      dataPoints: "Public hashtag trends, industry content patterns",
      icon: Sparkles,
      color: "pink",
      status: "Beta",
    },
  ]

  const dataSourcesReal = [
    {
      source: "Instagram Basic Display API",
      type: "Profile & Media Data",
      dataPoints: ["Profile info", "Recent posts", "Basic metrics", "Media objects"],
      updateFrequency: "Every 30 minutes",
      limitations: "Limited to recent posts, basic engagement data",
      icon: Users,
    },
    {
      source: "Instagram Graph API",
      type: "Business Insights",
      dataPoints: ["Post insights", "Profile views", "Reach data", "Impressions"],
      updateFrequency: "Every hour",
      limitations: "Requires business account, 24-hour data delay",
      icon: BarChart3,
    },
    {
      source: "Manual Data Entry",
      type: "User Input",
      dataPoints: ["Goals", "Content categories", "Target audience", "Brand preferences"],
      updateFrequency: "As needed",
      limitations: "Relies on user accuracy and consistency",
      icon: Activity,
    },
    {
      source: "Public Trend Data",
      type: "Industry Benchmarks",
      dataPoints: ["Popular hashtags", "Content trends", "Industry averages", "Best practices"],
      updateFrequency: "Daily",
      limitations: "General trends, not account-specific",
      icon: Globe,
    },
  ]

  const aiCapabilities = [
    {
      capability: "Content Type Optimization",
      description: "Analyzes which content formats (Reels, Posts, Stories) perform best for your audience",
      example: "Recommends posting more Reels based on 43% higher engagement vs. static posts",
      icon: Camera,
    },
    {
      capability: "Audience Behavior Prediction",
      description: "Predicts when your specific audience is most active and engaged",
      example: "Identifies 6:30 PM weekdays as your optimal posting window with 89% confidence",
      icon: Users,
    },
    {
      capability: "Hashtag Performance Analysis",
      description: "Evaluates hashtag effectiveness and suggests trending alternatives",
      example: "Replaces oversaturated #fitness with trending #fitnessmotivation for +27% reach",
      icon: Hash,
    },
    {
      capability: "Content Gap Analysis",
      description: "Identifies content opportunities based on trending topics in your niche",
      example: "Suggests morning routine content based on 156% increase in related searches",
      icon: Target,
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      pink: "bg-pink-100 text-pink-600 border-pink-200",
      green: "bg-green-100 text-green-600 border-green-200",
    }
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <img
              src="/images/artemis-logo.png"
              alt="Artemis AI"
              className="w-full h-full object-contain rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Artemis AI Engine</h1>
          <p className="text-gray-600">Advanced machine learning powering your social media insights</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI System Overview */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Artemis AI System Architecture
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Multi-layered AI system combining real-time data analysis with predictive modeling
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Data Ingestion</h4>
                    <p className="text-xs text-gray-600 mt-1">Real-time Instagram API data + trend analysis</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <Cpu className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">AI Processing</h4>
                    <p className="text-xs text-gray-600 mt-1">Neural networks + machine learning models</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <Sparkles className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Smart Insights</h4>
                    <p className="text-xs text-gray-600 mt-1">Personalized recommendations + predictions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">73%</div>
                  <div className="text-xs text-gray-600">Avg Prediction Accuracy</div>
                  <div className="text-xs text-gray-500 mt-1">Improving with more data</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-xs text-gray-600">Posts Analyzed</div>
                  <div className="text-xs text-gray-500 mt-1">From connected accounts</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">1hr</div>
                  <div className="text-xs text-gray-600">Data Refresh Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Due to API limits</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-1">Beta</div>
                  <div className="text-xs text-gray-600">Current Version</div>
                  <div className="text-xs text-gray-500 mt-1">Continuously improving</div>
                </CardContent>
              </Card>
            </div>

            {/* Technology Stack */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-sm">Machine Learning</h4>
                    <p className="text-xs text-gray-600 mt-1">TensorFlow, PyTorch</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-sm">NLP Processing</h4>
                    <p className="text-xs text-gray-600 mt-1">BERT, GPT-4, Transformers</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-sm">Computer Vision</h4>
                    <p className="text-xs text-gray-600 mt-1">ResNet, YOLO, OpenCV</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-sm">Time Series</h4>
                    <p className="text-xs text-gray-600 mt-1">LSTM, Prophet, ARIMA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiModels.map((model, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getColorClasses(model.color)}`}
                      >
                        <model.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{model.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-700 mt-1">{model.accuracy}% accurate</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{model.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Accuracy</span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-gray-500">Technology:</span>
                        <span className="ml-1 font-medium">{model.technology}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Training Data:</span>
                        <p className="text-gray-700 mt-1">{model.dataPoints}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Real-time Data Sources</CardTitle>
                <p className="text-sm text-gray-600">Live data feeds powering Artemis AI recommendations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {dataSourcesReal.map((source, index) => (
                  <div key={index} className="p-4 border rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <source.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{source.source}</h4>
                        <p className="text-xs text-gray-500">{source.type}</p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {source.updateFrequency}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {source.dataPoints.map((point, idx) => (
                        <div key={idx} className="text-xs bg-gray-50 rounded px-2 py-1">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Processing Pipeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Data Processing Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-sm">Data Collection</p>
                      <p className="text-xs text-gray-600">Instagram APIs + trend monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-sm">Data Preprocessing</p>
                      <p className="text-xs text-gray-600">Cleaning, normalization, feature extraction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-pink-50 rounded-xl">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-sm">AI Analysis</p>
                      <p className="text-xs text-gray-600">Neural network processing + pattern recognition</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-sm">Insight Generation</p>
                      <p className="text-xs text-gray-600">Personalized recommendations + predictions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-6">
            <div className="space-y-4">
              {aiCapabilities.map((capability, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <capability.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{capability.capability}</h4>
                        <p className="text-sm text-gray-600 mb-2">{capability.description}</p>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-green-800">
                            <span className="font-medium">Example:</span> {capability.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Performance Metrics */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">+15%</div>
                    <div className="text-xs text-gray-600">Avg Engagement Increase</div>
                    <div className="text-xs text-gray-500">Early users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">+12%</div>
                    <div className="text-xs text-gray-600">Reach Improvement</div>
                    <div className="text-xs text-gray-500">With timing optimization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 mb-1">68%</div>
                    <div className="text-xs text-gray-600">Timing Accuracy</div>
                    <div className="text-xs text-gray-500">Improving weekly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1.3x</div>
                    <div className="text-xs text-gray-600">Growth Rate</div>
                    <div className="text-xs text-gray-500">Compared to baseline</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Current Limitations</CardTitle>
                <p className="text-sm text-gray-600">What we're working to improve</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h4 className="font-medium text-sm text-yellow-800 mb-2">API Constraints</h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Instagram limits data refresh to every 30-60 minutes</li>
                    <li>• Historical data access is limited to recent posts</li>
                    <li>• Some metrics have 24-48 hour delays</li>
                    <li>• Rate limits restrict how much data we can fetch</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-medium text-sm text-blue-800 mb-2">AI Accuracy</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Predictions improve with more data over time</li>
                    <li>• New accounts have limited historical data</li>
                    <li>• Industry trends may not apply to niche audiences</li>
                    <li>• Recommendations are suggestions, not guarantees</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Development Roadmap</CardTitle>
                <p className="text-sm text-gray-600">What's coming next</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Basic Analytics (Current)</p>
                      <p className="text-xs text-gray-600">Post performance, timing suggestions, hashtag tracking</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Enhanced Predictions (Q1 2025)</p>
                      <p className="text-xs text-gray-600">
                        Better accuracy with more training data, audience insights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Multi-Platform Support (Q2 2025)</p>
                      <p className="text-xs text-gray-600">TikTok, YouTube, Twitter integration</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Advanced AI Features (Q3 2025)</p>
                      <p className="text-xs text-gray-600">Content generation, competitor analysis, trend prediction</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle>How We're Improving</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p>
                      <strong>More Data:</strong> As more users join, our models get better at predictions
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>
                      <strong>User Feedback:</strong> We track which recommendations work to improve accuracy
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <p>
                      <strong>API Updates:</strong> We adapt to new Instagram features and data access
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>
                      <strong>Algorithm Refinement:</strong> Continuous testing and optimization of our models
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
