"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Edit,
  Save,
  Camera,
  MapPin,
  Globe,
  Mail,
  Phone,
  Users,
  TrendingUp,
  Star,
  Award,
  CheckCircle,
  Instagram,
  Twitter,
  Facebook,
  Link,
  Plus,
  X,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react"

interface Profile {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  location: string
  website: string
  email: string
  phone: string
  type: "influencer" | "brand"
  verified: boolean
  featured: boolean
  followers: number
  following: number
  engagement: number
  rating: number
  completedCampaigns: number
  responseTime: string
  languages: string[]
  categories: string[]
  platforms: {
    name: string
    username: string
    followers: number
    verified: boolean
  }[]
  portfolio: {
    id: string
    title: string
    description: string
    thumbnail: string
    views: number
    likes: number
    engagement: number
    platform: string
    postedAt: Date
  }[]
  pricing: {
    minBudget: number
    maxBudget: number
    currency: string
  }
  availability: string
  collaborationTypes: string[]
  achievements: {
    id: string
    title: string
    description: string
    date: Date
    icon: string
  }[]
  testimonials: {
    id: string
    author: string
    authorAvatar: string
    content: string
    rating: number
    date: Date
  }[]
}

export function ProfileSystem({ userRole }: { userRole: "creator" | "brand" }) {
  const [isEditing, setIsEditing] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock profile data
  const profile: Profile = {
    id: "1",
    name: userRole === "creator" ? "Glenn Chen" : "SportFit Pro",
    username: userRole === "creator" ? "@glennfitness" : "@sportfitpro",
    avatar: userRole === "creator" ? "/placeholder-user.jpg" : "/placeholder-logo.png",
    bio: userRole === "creator" 
      ? "Fitness & lifestyle content creator helping people achieve their health goals through sustainable workouts and nutrition tips. Certified personal trainer and nutrition coach."
      : "Leading fitness brand dedicated to helping people achieve their health and wellness goals. Premium quality supplements and workout equipment.",
    location: userRole === "creator" ? "Brisbane, Australia" : "Los Angeles, CA",
    website: userRole === "creator" ? "https://glennfitness.com" : "https://sportfitpro.com",
    email: userRole === "creator" ? "glenn@glennfitness.com" : "contact@sportfitpro.com",
    phone: userRole === "creator" ? "+1 (555) 123-4567" : "+1 (555) 987-6543",
    type: userRole === "creator" ? "influencer" : "brand",
    verified: true,
    featured: true,
    followers: userRole === "creator" ? 125000 : 85000,
    following: userRole === "creator" ? 850 : 1200,
    engagement: userRole === "creator" ? 4.2 : 3.8,
    rating: 4.8,
    completedCampaigns: userRole === "creator" ? 47 : 156,
    responseTime: "2-4 hours",
    languages: ["English", "Spanish"],
    categories: userRole === "creator" 
      ? ["Fitness", "Lifestyle", "Nutrition", "Wellness"]
      : ["Fitness", "Supplements", "Equipment", "Wellness"],
    platforms: [
      {
        name: "Instagram",
        username: userRole === "creator" ? "@glennfitness" : "@sportfitpro",
        followers: userRole === "creator" ? 125000 : 85000,
        verified: true,
      },
      {
        name: "Facebook",
        username: userRole === "creator" ? "Glenn Fitness" : "SportFit Pro",
        followers: userRole === "creator" ? 45000 : 32000,
        verified: true,
      },
      {
        name: "Twitter",
        username: userRole === "creator" ? "@glennfitness" : "@sportfitpro",
        followers: userRole === "creator" ? 28000 : 18000,
        verified: false,
      },
    ],
    portfolio: [
      {
        id: "1",
        title: "Morning Workout Routine",
        description: "Complete 30-minute morning workout for energy and strength",
        thumbnail: "/placeholder.jpg",
        views: 85000,
        likes: 5200,
        engagement: 4.8,
        platform: "Instagram",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: "2",
        title: "Healthy Meal Prep Guide",
        description: "Weekly meal prep ideas for busy professionals",
        thumbnail: "/placeholder.jpg",
        views: 72000,
        likes: 4800,
        engagement: 4.2,
        platform: "Instagram",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        id: "3",
        title: "Protein Powder Review",
        description: "Honest review of top protein powders in the market",
        thumbnail: "/placeholder.jpg",
        views: 65000,
        likes: 4500,
        engagement: 3.9,
        platform: "Instagram",
        postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
    ],
    pricing: {
      minBudget: userRole === "creator" ? 1500 : 500,
      maxBudget: userRole === "creator" ? 5000 : 10000,
      currency: "USD",
    },
    availability: "Available for collaborations",
    collaborationTypes: userRole === "creator" 
      ? ["Sponsored Posts", "Product Reviews", "Brand Ambassadorships", "Event Appearances"]
      : ["Influencer Campaigns", "Product Launches", "Brand Partnerships", "Event Sponsorships"],
    achievements: [
      {
        id: "1",
        title: "Top Creator Award",
        description: "Recognized as one of the top fitness creators of 2023",
        date: new Date("2023-12-01"),
        icon: "🏆",
      },
      {
        id: "2",
        title: "100K Followers",
        description: "Reached 100,000 followers milestone",
        date: new Date("2023-08-15"),
        icon: "👥",
      },
      {
        id: "3",
        title: "Verified Account",
        description: "Instagram verified account status",
        date: new Date("2023-05-20"),
        icon: "✓",
      },
    ],
    testimonials: [
      {
        id: "1",
        author: "Sarah Johnson",
        authorAvatar: "/placeholder-user.jpg",
        content: "Amazing collaboration experience! Professional, creative, and delivered exactly what we needed.",
        rating: 5,
        date: new Date("2024-01-15"),
      },
      {
        id: "2",
        author: "Mike Davis",
        authorAvatar: "/placeholder-user.jpg",
        content: "Great communication and high-quality content. Highly recommend working together!",
        rating: 5,
        date: new Date("2024-01-10"),
      },
    ],
  }

  const handleSave = () => {
    setIsEditing(false)
    // In real app, save to backend
    console.log("Profile saved")
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "twitter":
        return <Twitter className="w-4 h-4" />
      case "facebook":
        return <Facebook className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>
                  {profile.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {profile.featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 mb-2">@{profile.username}</p>
              
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  className="mb-4"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 mb-4">{profile.bio}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Website
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      {showStats && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statistics</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(false)}
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{profile.followers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{profile.engagement}%</p>
                <p className="text-sm text-gray-600">Engagement</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{profile.rating}</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{profile.completedCampaigns}</p>
                <p className="text-sm text-gray-600">Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="testimonials">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories & Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Categories & Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.categories.map(category => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map(language => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Info */}
            <Card>
              <CardHeader>
                <CardTitle>Collaboration Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Budget Range</h4>
                  <p className="text-lg font-semibold">
                    ${profile.pricing.minBudget.toLocaleString()} - ${profile.pricing.maxBudget.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Response Time</h4>
                  <p className="text-sm text-gray-600">{profile.responseTime}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <p className="text-sm text-gray-600">{profile.availability}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Collaboration Types</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.collaborationTypes.map(type => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.portfolio.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {getPlatformIcon(item.platform)}
                    <span className="text-sm text-gray-500">{item.platform}</span>
                    <span className="text-sm text-gray-500">
                      {item.postedAt.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">{item.views.toLocaleString()}</p>
                      <p className="text-gray-500">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{item.likes.toLocaleString()}</p>
                      <p className="text-gray-500">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{item.engagement}%</p>
                      <p className="text-gray-500">Engagement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="space-y-4">
            {profile.platforms.map((platform) => (
              <Card key={platform.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getPlatformIcon(platform.name)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{platform.name}</h3>
                        <p className="text-sm text-gray-600">@{platform.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{platform.followers.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">followers</p>
                      {platform.verified && (
                        <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <p className="text-xs text-gray-500">
                    {achievement.date.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="space-y-4">
            {profile.testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.authorAvatar} />
                      <AvatarFallback>
                        {testimonial.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{testimonial.author}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{testimonial.content}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 