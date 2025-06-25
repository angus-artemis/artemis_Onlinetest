"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  DollarSign,
  Shield,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Zap,
  Star,
  AlertCircle,
  Lock,
} from "lucide-react"

interface PaymentDetails {
  amount: number
  currency: string
  paymentMethod: "card" | "paypal" | "bank"
  description: string
  campaignId: string
  influencerId: string
  deliverables: string[]
  timeline: string
  escrowEnabled: boolean
}

interface Influencer {
  id: string
  name: string
  avatar: string
  followers: number
  engagement: number
  price: number
  rating: number
  completedProjects: number
}

export function PaymentProcessor({ 
  influencer, 
  campaignTitle 
}: { 
  influencer: Influencer
  campaignTitle: string 
}) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: influencer.price,
    currency: "USD",
    paymentMethod: "card",
    description: "",
    campaignId: "campaign-1",
    influencerId: influencer.id,
    deliverables: [],
    timeline: "",
    escrowEnabled: true,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const deliverables = [
    "Instagram Post",
    "Instagram Story",
    "TikTok Video",
    "YouTube Video",
    "Blog Post",
    "Twitter Post",
    "Facebook Post",
  ]

  const timelineOptions = [
    "1 week",
    "2 weeks", 
    "1 month",
    "2 months",
    "3 months",
  ]

  const handleDeliverableToggle = (deliverable: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(deliverable)
        ? prev.deliverables.filter(d => d !== deliverable)
        : [...prev.deliverables, deliverable]
    }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    setPaymentSuccess(true)
    
    // Close dialog after showing success
    setTimeout(() => {
      setShowPaymentDialog(false)
      setPaymentSuccess(false)
      setPaymentStep(1)
    }, 2000)
  }

  const getStepProgress = () => {
    return (paymentStep / 3) * 100
  }

  const renderPaymentStep = () => {
    switch (paymentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label>Campaign Description</Label>
              <Textarea
                placeholder="Describe what you want the influencer to create..."
                value={paymentDetails.description}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            <div>
              <Label>Deliverables</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {deliverables.map((deliverable) => (
                  <div key={deliverable} className="flex items-center space-x-2">
                    <Checkbox
                      id={deliverable}
                      checked={paymentDetails.deliverables.includes(deliverable)}
                      onCheckedChange={() => handleDeliverableToggle(deliverable)}
                    />
                    <Label htmlFor={deliverable} className="text-sm">{deliverable}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Timeline</Label>
              <Select 
                value={paymentDetails.timeline} 
                onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, timeline: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="escrow"
                checked={paymentDetails.escrowEnabled}
                onCheckedChange={(checked) => setPaymentDetails(prev => ({ ...prev, escrowEnabled: !!checked }))}
              />
              <Label htmlFor="escrow" className="text-sm">
                Use escrow protection (recommended)
              </Label>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Influencer:</span>
                  <span className="font-medium">{influencer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Campaign:</span>
                  <span className="font-medium">{campaignTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deliverables:</span>
                  <span className="font-medium">{paymentDetails.deliverables.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">{paymentDetails.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span>Escrow Protection:</span>
                  <span className="font-medium">{paymentDetails.escrowEnabled ? "Yes" : "No"}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${paymentDetails.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Payment Method</Label>
              <div className="space-y-2 mt-2">
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

                <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Direct bank transfer (3-5 business days)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm mb-6">
                Your payment is protected by our secure payment system and escrow protection
              </p>
            </div>

            <div className="space-y-4">
              <Label>Card Information</Label>
              <Input placeholder="Card number" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVC" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-blue-600 hover:underline">Payment Agreement</a>
              </Label>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Payment Protection</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your payment is held securely until the project is completed and approved. 
                    If there are any issues, we'll help resolve them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Hire {influencer.name}
            </DialogTitle>
          </DialogHeader>

          {!paymentSuccess ? (
            <>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Step {paymentStep} of 3</span>
                  <span>{Math.round(getStepProgress())}%</span>
                </div>
                <Progress value={getStepProgress()} className="w-full" />
              </div>

              {/* Step Content */}
              {renderPaymentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setPaymentStep(Math.max(1, paymentStep - 1))}
                  disabled={paymentStep === 1}
                >
                  Previous
                </Button>

                {paymentStep < 3 ? (
                  <Button
                    onClick={() => setPaymentStep(paymentStep + 1)}
                    disabled={
                      (paymentStep === 1 && (!paymentDetails.description || paymentDetails.deliverables.length === 0 || !paymentDetails.timeline)) ||
                      (paymentStep === 2 && !paymentDetails.paymentMethod)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay ${paymentDetails.amount.toLocaleString()}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Payment Successful!</h3>
              <p className="text-gray-600">
                Your payment has been processed and the project is now active.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Button 
        onClick={() => setShowPaymentDialog(true)}
        className="bg-green-600 hover:bg-green-700"
      >
        <DollarSign className="w-4 h-4 mr-2" />
        Hire for ${influencer.price.toLocaleString()}
      </Button>
    </>
  )
} 