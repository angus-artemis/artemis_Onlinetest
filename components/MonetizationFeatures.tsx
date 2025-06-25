"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Zap, BarChart3, Sparkles, Lock, Check, Star, TrendingUp, Target, Brain, Shield } from "lucide-react"

export function MonetizationFeatures() {
  const [currentPlan, setCurrentPlan] = useState("free")

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Connect 1 Instagram account",
        "Basic analytics (7 days)",
        "5 AI recommendations/month",
        "Standard support",
      ],
      limitations: ["Limited historical data", "Basic insights only", "No export features", "No brand partnerships"],
      cta: "Current Plan",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For serious content creators",
      features: [
        "Connect 3 Instagram accounts",
        "Advanced analytics (unlimited)",
        "Unlimited AI recommendations",
        "Content scheduling",
        "Competitor analysis",
        "PDF reports & exports",
        "Brand partnership matching",
        "Priority support",
      ],
      limitations: [],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For agencies and teams",
      features: [
        "Unlimited Instagram accounts",
        "White-label reports",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced AI features",
        "Custom training",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const usageLimits = {
    free: {
      accounts: { used: 1, limit: 1 },
      recommendations: { used: 3, limit: 5 },
      exports: { used: 0, limit: 0 },
      historicalData: { used: 7, limit: 7 },
    },
    pro: {
      accounts: { used: 1, limit: 3 },
      recommendations: { used: 23, limit: "unlimited" },
      exports: { used: 4, limit: "unlimited" },
      historicalData: { used: 365, limit: "unlimited" },
    },
  }

  const currentUsage = usageLimits[currentPlan as keyof typeof usageLimits]

  const premiumFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Insights",
      description: "Get deeper audience analysis and predictive recommendations",
      plan: "pro",
    },
    {
      icon: BarChart3,
      title: "Competitor Benchmarking",
      description: "Compare your performance against similar creators",
      plan: "pro",
    },
    {
      icon: Target,
      title: "Brand Partnership Matching",
      description: "Get matched with brands that fit your niche and audience",
      plan: "pro",
    },
    {
      icon: Shield,
      title: "White-label Reports",
      description: "Create branded reports for your clients",
      plan: "enterprise",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Current Plan Status */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-600" />
                Your Plan: {plans.find((p) => p.id === currentPlan)?.name}
              </CardTitle>
              <p className="text-sm text-gray-600">{plans.find((p) => p.id === currentPlan)?.description}</p>
            </div>
            {currentPlan === "free" && (
              <Badge className="bg-orange-100 text-orange-800">
                <Sparkles className="w-3 h-3 mr-1" />
                Upgrade Available
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usage Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Connected Accounts</span>
                <span>
                  {currentUsage.accounts.used}/{currentUsage.accounts.limit}
                </span>
              </div>
              <Progress value={(currentUsage.accounts.used / currentUsage.accounts.limit) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Recommendations</span>
                <span>
                  {currentUsage.recommendations.used}/
                  {currentUsage.recommendations.limit === "unlimited" ? "∞" : currentUsage.recommendations.limit}
                </span>
              </div>
              <Progress
                value={
                  currentUsage.recommendations.limit === "unlimited"
                    ? 25
                    : (currentUsage.recommendations.used / (currentUsage.recommendations.limit as number)) * 100
                }
                className="h-2"
              />
            </div>
          </div>

          {currentPlan === "free" && (
            <div className="bg-white rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-sm">Unlock More Features</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Upgrade to Pro to get unlimited AI recommendations, advanced analytics, and brand partnerships.
              </p>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500">
                Upgrade Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Premium Features Showcase */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Premium Features</CardTitle>
          <p className="text-sm text-gray-600">Unlock advanced capabilities with Pro and Enterprise plans</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                currentPlan === "free" ? "border-gray-200 bg-gray-50" : "border-green-200 bg-green-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentPlan === "free" ? "bg-gray-200" : "bg-green-100"
                  }`}
                >
                  <feature.icon className={`w-5 h-5 ${currentPlan === "free" ? "text-gray-500" : "text-green-600"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    {currentPlan === "free" && <Lock className="w-3 h-3 text-gray-400" />}
                    {currentPlan !== "free" && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {feature.plan === "pro" ? "Pro Feature" : "Enterprise Feature"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
          <p className="text-sm text-gray-600">Upgrade anytime to unlock more features</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-xl border transition-colors ${
                  plan.popular
                    ? "border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50"
                    : currentPlan === plan.id
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      {plan.popular && (
                        <Badge className="bg-purple-100 text-purple-700">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                      {currentPlan === plan.id && (
                        <Badge className="bg-green-100 text-green-700">
                          <Check className="w-3 h-3 mr-1" />
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{plan.price}</p>
                    <p className="text-xs text-gray-500">{plan.period}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Includes:</h5>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <Check className="w-3 h-3 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {plan.limitations.length > 0 && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Limitations:</h5>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : currentPlan === plan.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : ""
                  }`}
                  disabled={currentPlan === plan.id}
                  onClick={() => setCurrentPlan(plan.id)}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Your Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">23</p>
              <p className="text-xs text-blue-700">AI Recommendations Used</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-xs text-green-700">Reports Generated</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">156</p>
              <p className="text-xs text-purple-700">Analytics Views</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-xs text-orange-700">Brand Matches</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
