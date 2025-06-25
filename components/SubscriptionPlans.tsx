"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Crown,
  Star,
  Zap,
  Users,
  TrendingUp,
  Eye,
  Target,
  CheckCircle,
  X,
  CreditCard,
  Shield,
  Gift,
  Sparkles,
} from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  billing: "monthly" | "yearly"
  features: string[]
  popular?: boolean
  maxCampaigns?: number
  maxInfluencers?: number
  prioritySupport?: boolean
  analytics?: boolean
  customBranding?: boolean
}

interface PaymentMethod {
  id: string
  type: "card" | "paypal"
  last4?: string
  brand?: string
  isDefault: boolean
}

export function SubscriptionPlans({ userRole }: { userRole: "creator" | "brand" }) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)

  const creatorPlans: Plan[] = [
    {
      id: "creator-free",
      name: "Free",
      price: 0,
      billing: "monthly",
      features: [
        "Basic profile visibility",
        "Apply to 5 campaigns/month",
        "Standard support",
        "Basic analytics",
      ],
    },
    {
      id: "creator-pro",
      name: "Creator Pro",
      price: billingCycle === "monthly" ? 29 : 290,
      billing: billingCycle,
      features: [
        "Enhanced profile visibility",
        "Unlimited campaign applications",
        "Priority in brand searches",
        "Advanced analytics & insights",
        "Direct messaging with brands",
        "Featured creator badge",
        "Priority support",
      ],
      popular: true,
    },
    {
      id: "creator-elite",
      name: "Creator Elite",
      price: billingCycle === "monthly" ? 79 : 790,
      billing: billingCycle,
      features: [
        "All Pro features",
        "Top priority in searches",
        "Exclusive brand partnerships",
        "Personal account manager",
        "Custom content tools",
        "Revenue optimization",
        "24/7 priority support",
        "Exclusive events access",
      ],
    },
  ]

  const brandPlans: Plan[] = [
    {
      id: "brand-starter",
      name: "Starter",
      price: billingCycle === "monthly" ? 99 : 990,
      billing: billingCycle,
      features: [
        "Create up to 3 campaigns",
        "Access to 1,000+ influencers",
        "Basic matching algorithm",
        "Standard support",
        "Basic campaign analytics",
      ],
      maxCampaigns: 3,
    },
    {
      id: "brand-pro",
      name: "Brand Pro",
      price: billingCycle === "monthly" ? 299 : 2990,
      billing: billingCycle,
      features: [
        "Unlimited campaigns",
        "Access to 10,000+ influencers",
        "Advanced AI matching",
        "Priority influencer access",
        "Advanced analytics & reporting",
        "Custom campaign templates",
        "Priority support",
        "Brand verification badge",
      ],
      popular: true,
      maxCampaigns: -1,
    },
    {
      id: "brand-enterprise",
      name: "Enterprise",
      price: billingCycle === "monthly" ? 999 : 9990,
      billing: billingCycle,
      features: [
        "All Pro features",
        "Access to all influencers",
        "Custom AI matching",
        "White-label solutions",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 premium support",
        "Exclusive influencer network",
      ],
      maxCampaigns: -1,
      customBranding: true,
    },
  ]

  const plans = userRole === "creator" ? creatorPlans : brandPlans

  const handleSubscribe = (plan: Plan) => {
    setSelectedPlan(plan)
    setShowPaymentDialog(true)
  }

  const handlePayment = () => {
    // In a real app, this would integrate with Stripe/PayPal
    console.log("Processing payment for:", selectedPlan?.name)
    setShowPaymentDialog(false)
    setSelectedPlan(null)
  }

  const getPopularBadge = () => (
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1">
        <Crown className="w-3 h-3 mr-1" />
        Most Popular
      </Badge>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your {userRole === "creator" ? "Creator" : "Brand"} Plan
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {userRole === "creator" 
            ? "Get discovered by top brands and grow your influence"
            : "Find the perfect influencers and scale your campaigns"
          }
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
            Monthly
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="relative"
          >
            <div className={`w-6 h-6 bg-blue-600 rounded-full transition-transform ${
              billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
            }`} />
          </Button>
          <span className={`text-sm ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
            Yearly
            <Badge variant="secondary" className="ml-2 text-xs">
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-2 border-purple-200 shadow-lg' : ''}`}
          >
            {plan.popular && getPopularBadge()}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500 ml-2">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              {plan.price === 0 && (
                <p className="text-sm text-gray-500 mt-2">Forever free</p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full mt-6 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                    : ''
                }`}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.price === 0 ? "Get Started Free" : "Subscribe Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{selectedPlan?.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="text-xl font-bold">
                  ${selectedPlan?.price}
                  <span className="text-sm text-gray-500 ml-1">
                    /{selectedPlan?.billing === "monthly" ? "month" : "year"}
                  </span>
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label>Payment Method</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Credit Card</p>
                    <p className="text-sm text-gray-500">Secure payment via Stripe</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <Label>Card Information</Label>
              <Input placeholder="Card number" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVC" />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={handlePayment}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ${selectedPlan?.price}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Features Comparison */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">Why Choose Artemis?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Smart Matching</h4>
            <p className="text-gray-600 text-sm">
              AI-powered algorithm matches you with the perfect partners
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Grow Together</h4>
            <p className="text-gray-600 text-sm">
              Build lasting partnerships that benefit both parties
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Secure Payments</h4>
            <p className="text-gray-600 text-sm">
              Safe and transparent payment processing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 