"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { User, Briefcase, TrendingUp, Users, Target, DollarSign, Sparkles, BarChart3, Eye, EyeOff } from "lucide-react"
import { AccountConnection } from "./onboarding/AccountConnection"

interface LoginPageProps {
  onLogin: (role: "creator" | "brand") => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<"creator" | "brand" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [showAccountConnection, setShowAccountConnection] = useState(false)

  const handleLogin = async () => {
    if (!selectedRole || !email || !password) return
    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userRole", selectedRole)
    }
    onLogin(selectedRole)
  }

  const handleSignup = async () => {
    if (!selectedRole || !email || !password) return
    setIsLoading(true)
    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userRole", selectedRole)
    }
    setShowAccountConnection(true)
  }

  const creatorFeatures = [
    { icon: TrendingUp, text: "AI-powered content suggestions" },
    { icon: BarChart3, text: "Advanced analytics & insights" },
    { icon: DollarSign, text: "Brand partnership opportunities" },
    { icon: Target, text: "Audience growth strategies" },
  ]

  const brandFeatures = [
    { icon: Users, text: "Creator discovery & matching" },
    { icon: BarChart3, text: "Campaign performance tracking" },
    { icon: Target, text: "ROI optimization tools" },
    { icon: Sparkles, text: "Content strategy insights" },
  ]

  if (showAccountConnection) {
    return <AccountConnection onComplete={() => onLogin(selectedRole!)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <img
              src="/images/artemis-logo.png"
              alt="Artemis Logo"
              className="w-full h-full object-contain rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Artemis</h1>
          <p className="text-gray-600">Influence • Growth • Precision</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">{isSignup ? "Sign Up" : "Welcome Back!"}</CardTitle>
            <p className="text-sm text-gray-600">Choose how you want to use Artemis</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole("creator")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === "creator"
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <User
                    className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === "creator" ? "text-purple-600" : "text-gray-600"
                    }`}
                  />
                  <p
                    className={`font-medium text-sm ${
                      selectedRole === "creator" ? "text-purple-700" : "text-gray-700"
                    }`}
                  >
                    Creator
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Influencer, Artist, Content Creator</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole("brand")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === "brand" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Briefcase
                    className={`w-6 h-6 mx-auto mb-2 ${selectedRole === "brand" ? "text-blue-600" : "text-gray-600"}`}
                  />
                  <p className={`font-medium text-sm ${selectedRole === "brand" ? "text-blue-700" : "text-gray-700"}`}>
                    Brand
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Business, Agency, Marketer</p>
                </motion.button>
              </div>
            </div>

            {/* Features Preview */}
            {selectedRole && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className={`p-4 rounded-xl ${selectedRole === "creator" ? "bg-gradient-to-r from-purple-50 to-pink-50" : "bg-blue-50"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={
                        selectedRole === "creator"
                          ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {selectedRole === "creator" ? "Creator Features" : "Brand Features"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {(selectedRole === "creator" ? creatorFeatures : brandFeatures).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <feature.icon
                          className={`w-4 h-4 ${selectedRole === "creator" ? "text-purple-600" : "text-blue-600"}`}
                        />
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={isSignup ? handleSignup : handleLogin}
              disabled={!selectedRole || !email || !password || isLoading}
              className={`w-full ${
                selectedRole === "creator"
                  ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600"
                  : selectedRole === "brand"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gray-400"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin inline-block"><TrendingUp className="w-4 h-4" /></span>
                  {isSignup ? "Signing up..." : "Logging in..."}
                </div>
              ) : isSignup ? "Sign Up" : "Log In"}
            </Button>

            {/* Demo Credentials */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Demo Credentials for Artemis:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded border border-purple-100">
                  <p className="font-medium text-purple-700">Creator</p>
                  <p className="text-purple-600">glenn@artemis.com</p>
                  <p className="text-purple-600">artemis123</p>
                </div>
                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <p className="font-medium text-blue-700">Brand</p>
                  <p className="text-blue-600">brand@artemis.com</p>
                  <p className="text-blue-600">artemis123</p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <button className="text-sm text-gray-600 hover:text-gray-800">Forgot your password?</button>
              <div className="text-sm text-gray-600">
                {isSignup ? (
                  <button className="text-purple-600 hover:text-purple-700 font-medium">Sign up</button>
                ) : (
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                    onClick={() => setIsSignup(!isSignup)}
                  >
                    Don't have an account? Sign up
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
