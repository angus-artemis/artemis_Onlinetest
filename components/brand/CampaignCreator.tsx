"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Filter,
  Target,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Send,
  Award,
  Briefcase,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Heart,
  MessageCircle,
  UserPlus,
} from "lucide-react"

interface Campaign {
  id: string
  title: string
  description: string
  brand: {
    name: string
    avatar: string
    verified: boolean
  }
  requirements: {
    followers: number
    engagement: number
    niche: string[]
    location?: string
  }
  budget: {
    min: number
    max: number
    currency: string
  }
  deliverables: string[]
  timeline: string
  status: "active" | "completed" | "paused" | "draft"
  applications: number
  createdAt: Date
  deadline: Date
}

interface AcceptedDeal {
  id: string
  campaignId: string
  campaignTitle: string
  influencer: {
    name: string
    avatar: string
    followers: number
  }
  dealDetails: {
    price: number
    deliverables: string[]
    timeline: string
  }
  status: "active" | "completed" | "cancelled"
  startDate: Date
  endDate: Date
  progress: number
}

interface Influencer {
  id: string
  name: string
  username: string
  avatar: string
  verified: boolean
  followers: number
  engagement: number
  niche: string[]
  location: string
  bio: string
  averageLikes: number
  averageComments: number
  pricePerPost: number
  availability: "available" | "busy" | "unavailable"
  rating: number
  totalCampaigns: number
  responseRate: number
  responseTime: string
  platforms: {
    instagram: boolean
    tiktok: boolean
    youtube: boolean
  }
}

export function CampaignCreator() {
  const [activeTab, setActiveTab] = useState("create")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNiche, setSelectedNiche] = useState("all")
  const [userRole] = useState<"brand" | "creator">("brand")

  // Influencer discovery filters
  const [influencerFilters, setInfluencerFilters] = useState({
    minFollowers: 0,
    maxFollowers: 1000000,
    minEngagement: 0,
    maxEngagement: 10,
    selectedNiche: "all",
    maxPrice: 10000,
    location: "",
    availability: "all" as "all" | "available" | "busy" | "unavailable",
  })

  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])

  // Mock campaigns data
  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Summer Fitness Challenge",
      description: "Promote our new fitness app with engaging workout content and transformation stories.",
      brand: {
        name: "SportFit Pro",
        avatar: "/placeholder-logo.png",
        verified: true,
      },
      requirements: {
        followers: 50000,
        engagement: 3.5,
        niche: ["Fitness", "Wellness", "Lifestyle"],
        location: "United States",
      },
      budget: {
        min: 2000,
        max: 5000,
        currency: "USD",
      },
      deliverables: [
        "3 Instagram posts",
        "2 Instagram stories",
        "1 TikTok video",
        "Before/after transformation content",
      ],
      timeline: "2 weeks",
      status: "active",
      applications: 12,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: "2",
      title: "Healthy Living Tips Series",
      description: "Create educational content about nutrition, meal prep, and healthy lifestyle habits.",
      brand: {
        name: "NutriLife",
        avatar: "/placeholder-logo.png",
        verified: true,
      },
      requirements: {
        followers: 25000,
        engagement: 4.0,
        niche: ["Nutrition", "Health", "Lifestyle"],
      },
      budget: {
        min: 1500,
        max: 3000,
        currency: "USD",
      },
      deliverables: [
        "4 Instagram posts",
        "3 Instagram stories",
        "1 YouTube video",
        "Recipe development",
      ],
      timeline: "3 weeks",
      status: "active",
      applications: 8,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    },
    {
      id: "3",
      title: "Workout Motivation Campaign",
      description: "Inspire followers with motivational workout content and fitness tips.",
      brand: {
        name: "GymGear Plus",
        avatar: "/placeholder-logo.png",
        verified: false,
      },
      requirements: {
        followers: 100000,
        engagement: 4.5,
        niche: ["Fitness", "Motivation", "Sports"],
      },
      budget: {
        min: 3000,
        max: 8000,
        currency: "USD",
      },
      deliverables: [
        "5 Instagram posts",
        "3 Instagram stories",
        "2 TikTok videos",
        "Live workout session",
      ],
      timeline: "4 weeks",
      status: "active",
      applications: 15,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    },
  ]

  const acceptedDeals: AcceptedDeal[] = [
    {
      id: "deal-1",
      campaignId: "1",
      campaignTitle: "Summer Fitness Challenge",
      influencer: {
        name: "Alex Chen",
        avatar: "/placeholder-user.jpg",
        followers: 125000,
      },
      dealDetails: {
        price: 2500,
        deliverables: ["3 Instagram posts", "2 Instagram stories", "1 TikTok video"],
        timeline: "2 weeks",
      },
      status: "active",
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      progress: 60,
    },
    {
      id: "deal-2",
      campaignId: "2",
      campaignTitle: "Healthy Living Tips Series",
      influencer: {
        name: "Sarah Kim",
        avatar: "/placeholder-user.jpg",
        followers: 89000,
      },
      dealDetails: {
        price: 1800,
        deliverables: ["4 Instagram posts", "3 Instagram stories", "1 YouTube video"],
        timeline: "3 weeks",
      },
      status: "active",
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16),
      progress: 30,
    },
  ]

  // Mock influencers data
  const influencers: Influencer[] = [
    {
      id: "inf-1",
      name: "Glenn Chen",
      username: "@glennchen_fitness",
      avatar: "/placeholder-user.jpg",
      verified: true,
      followers: 125000,
      engagement: 4.2,
      niche: ["Fitness", "Wellness", "Lifestyle"],
      location: "Brisbane, Australia",
      bio: "Fitness enthusiast helping people achieve their health goals through sustainable workouts and nutrition tips.",
      averageLikes: 5200,
      averageComments: 320,
      pricePerPost: 2500,
      availability: "available",
      rating: 4.8,
      totalCampaigns: 45,
      responseRate: 95,
      responseTime: "2 hours",
      platforms: { instagram: true, tiktok: true, youtube: false },
    },
    {
      id: "inf-2",
      name: "Sarah Kim",
      username: "@sarahkim_nutrition",
      avatar: "/placeholder-user.jpg",
      verified: true,
      followers: 89000,
      engagement: 4.8,
      niche: ["Nutrition", "Health", "Lifestyle"],
      location: "New York, NY",
      bio: "Registered dietitian sharing evidence-based nutrition advice and healthy recipes.",
      averageLikes: 4300,
      averageComments: 280,
      pricePerPost: 1800,
      availability: "available",
      rating: 4.9,
      totalCampaigns: 32,
      responseRate: 98,
      responseTime: "1 hour",
      platforms: { instagram: true, tiktok: false, youtube: true },
    },
    {
      id: "inf-3",
      name: "Mike Rodriguez",
      username: "@mikerod_fitness",
      avatar: "/placeholder-user.jpg",
      verified: false,
      followers: 250000,
      engagement: 3.9,
      niche: ["Fitness", "Sports", "Motivation"],
      location: "Miami, FL",
      bio: "Personal trainer and former athlete helping people transform their lives through fitness.",
      averageLikes: 9800,
      averageComments: 450,
      pricePerPost: 4000,
      availability: "busy",
      rating: 4.6,
      totalCampaigns: 67,
      responseRate: 88,
      responseTime: "4 hours",
      platforms: { instagram: true, tiktok: true, youtube: true },
    },
    {
      id: "inf-4",
      name: "Emma Wilson",
      username: "@emmawilson_lifestyle",
      avatar: "/placeholder-user.jpg",
      verified: true,
      followers: 75000,
      engagement: 5.1,
      niche: ["Lifestyle", "Travel", "Fashion"],
      location: "Austin, TX",
      bio: "Lifestyle blogger sharing travel adventures, fashion tips, and daily inspiration.",
      averageLikes: 3800,
      averageComments: 190,
      pricePerPost: 1500,
      availability: "available",
      rating: 4.7,
      totalCampaigns: 28,
      responseRate: 92,
      responseTime: "3 hours",
      platforms: { instagram: true, tiktok: false, youtube: false },
    },
    {
      id: "inf-5",
      name: "David Park",
      username: "@davidpark_tech",
      avatar: "/placeholder-user.jpg",
      verified: true,
      followers: 180000,
      engagement: 4.5,
      niche: ["Technology", "Gadgets", "Lifestyle"],
      location: "San Francisco, CA",
      bio: "Tech enthusiast and content creator sharing the latest gadgets and tech tips.",
      averageLikes: 8100,
      averageComments: 520,
      pricePerPost: 3200,
      availability: "available",
      rating: 4.8,
      totalCampaigns: 53,
      responseRate: 96,
      responseTime: "2 hours",
      platforms: { instagram: true, tiktok: true, youtube: true },
    },
    {
      id: "inf-6",
      name: "Lisa Thompson",
      username: "@lisathompson_beauty",
      avatar: "/placeholder-user.jpg",
      verified: false,
      followers: 95000,
      engagement: 4.7,
      niche: ["Beauty", "Skincare", "Lifestyle"],
      location: "Chicago, IL",
      bio: "Beauty blogger and skincare enthusiast sharing tips and product reviews.",
      averageLikes: 4500,
      averageComments: 310,
      pricePerPost: 2000,
      availability: "available",
      rating: 4.5,
      totalCampaigns: 41,
      responseRate: 90,
      responseTime: "5 hours",
      platforms: { instagram: true, tiktok: true, youtube: false },
    },
  ]

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Filter influencers based on criteria
  const filteredInfluencers = influencers.filter(influencer => {
    const matchesFollowers = influencer.followers >= influencerFilters.minFollowers && 
                            influencer.followers <= influencerFilters.maxFollowers
    const matchesEngagement = influencer.engagement >= influencerFilters.minEngagement && 
                             influencer.engagement <= influencerFilters.maxEngagement
    const matchesNiche = influencerFilters.selectedNiche === "all" || 
                        influencer.niche.includes(influencerFilters.selectedNiche)
    const matchesPrice = influencer.pricePerPost <= influencerFilters.maxPrice
    const matchesLocation = !influencerFilters.location || 
                           influencer.location.toLowerCase().includes(influencerFilters.location.toLowerCase())
    const matchesAvailability = influencerFilters.availability === "all" || 
                               influencer.availability === influencerFilters.availability

    return matchesFollowers && matchesEngagement && matchesNiche && 
           matchesPrice && matchesLocation && matchesAvailability
  })

  const handleInfluencerSelection = (influencerId: string) => {
    setSelectedInfluencers(prev => 
      prev.includes(influencerId) 
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    )
  }

  const handleInviteInfluencers = () => {
    console.log("Inviting influencers:", selectedInfluencers)
    // Add invitation logic here
    setSelectedInfluencers([])
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-700"
      case "busy":
        return "bg-yellow-100 text-yellow-700"
      case "unavailable":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleCreateCampaign = () => {
    // Add campaign creation logic here
    console.log("Creating campaign:", newCampaign)
    setShowCreateDialog(false)
    setNewCampaign({
      title: "",
      description: "",
      minFollowers: 25000,
      minEngagement: 3.5,
      niches: [],
      location: "",
      minBudget: 1000,
      maxBudget: 5000,
      deliverables: [],
      timeline: "2 weeks",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-blue-500"
  }

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    minFollowers: 25000,
    minEngagement: 3.5,
    niches: [] as string[],
    location: "",
    minBudget: 1000,
    maxBudget: 5000,
    deliverables: [] as string[],
    timeline: "2 weeks",
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {userRole === "brand" ? "Campaign Management" : "Available Campaigns"}
          </h1>
          <p className="text-gray-600 mt-1">
            {userRole === "brand" 
              ? "Create and manage your influencer marketing campaigns" 
              : "Discover and apply to brand campaigns that match your profile"
            }
          </p>
        </div>
        {userRole === "brand" && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">
            {userRole === "brand" ? "My Campaigns" : "Available Campaigns"}
          </TabsTrigger>
          <TabsTrigger value="discovery">
            {userRole === "brand" ? "Influencer Discovery" : "My Applications"}
          </TabsTrigger>
          <TabsTrigger value="active">
            {userRole === "brand" ? "Active Deals" : "My Applications"}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="create" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Niches</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow h-auto">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={campaign.brand.avatar} />
                        <AvatarFallback>
                          {campaign.brand.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm truncate">{campaign.brand.name}</h3>
                        {campaign.brand.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-1" />
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3 line-clamp-2 leading-tight">{campaign.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">{campaign.description}</p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  {/* Requirements */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Requirements</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{formatNumber(campaign.requirements.followers)}+</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{campaign.requirements.engagement}%+</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {campaign.requirements.niche.map(niche => (
                        <Badge key={niche} variant="outline" className="text-xs px-2 py-1">
                          {niche}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="font-medium text-sm">
                        ${campaign.budget.min.toLocaleString()} - ${campaign.budget.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{campaign.timeline}</span>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{campaign.applications} applications</span>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Due {campaign.deadline.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {userRole === "brand" ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Influencer Discovery Tab */}
        <TabsContent value="discovery" className="space-y-6">
          {userRole === "brand" ? (
            <>
              {/* Filters Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Find Perfect Influencers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="minFollowers">Min Followers</Label>
                      <Input
                        id="minFollowers"
                        type="number"
                        value={influencerFilters.minFollowers}
                        onChange={(e) => setInfluencerFilters({
                          ...influencerFilters,
                          minFollowers: Number(e.target.value)
                        })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxFollowers">Max Followers</Label>
                      <Input
                        id="maxFollowers"
                        type="number"
                        value={influencerFilters.maxFollowers}
                        onChange={(e) => setInfluencerFilters({
                          ...influencerFilters,
                          maxFollowers: Number(e.target.value)
                        })}
                        placeholder="1,000,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="minEngagement">Min Engagement (%)</Label>
                      <Input
                        id="minEngagement"
                        type="number"
                        step="0.1"
                        value={influencerFilters.minEngagement}
                        onChange={(e) => setInfluencerFilters({
                          ...influencerFilters,
                          minEngagement: Number(e.target.value)
                        })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxEngagement">Max Engagement (%)</Label>
                      <Input
                        id="maxEngagement"
                        type="number"
                        step="0.1"
                        value={influencerFilters.maxEngagement}
                        onChange={(e) => setInfluencerFilters({
                          ...influencerFilters,
                          maxEngagement: Number(e.target.value)
                        })}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="niche">Niche</Label>
                      <Select 
                        value={influencerFilters.selectedNiche} 
                        onValueChange={(value) => setInfluencerFilters({
                          ...influencerFilters,
                          selectedNiche: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Niches</SelectItem>
                          <SelectItem value="Fitness">Fitness</SelectItem>
                          <SelectItem value="Nutrition">Nutrition</SelectItem>
                          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Beauty">Beauty</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Fashion">Fashion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maxPrice">Max Price per Post ($)</Label>
                      <Input
                        id="maxPrice"
                        type="number"
                        value={influencerFilters.maxPrice}
                        onChange={(e) => setInfluencerFilters({
                          ...influencerFilters,
                          maxPrice: Number(e.target.value)
                        })}
                        placeholder="10,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={influencerFilters.location}
                        onChange={(e) => setInfluencerFilters({
                          ...influencerFilters,
                          location: e.target.value
                        })}
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Select 
                        value={influencerFilters.availability} 
                        onValueChange={(value) => setInfluencerFilters({
                          ...influencerFilters,
                          availability: value as "all" | "available" | "busy" | "unavailable"
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="busy">Busy</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Influencers Summary */}
              {selectedInfluencers.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">
                          {selectedInfluencers.length} influencer{selectedInfluencers.length !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedInfluencers([])}
                        >
                          Clear All
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleInviteInfluencers}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Invite Selected ({selectedInfluencers.length})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Influencers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInfluencers.map((influencer) => (
                  <Card 
                    key={influencer.id} 
                    className={`hover:shadow-lg transition-shadow cursor-pointer h-auto ${
                      selectedInfluencers.includes(influencer.id) 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : ''
                    }`}
                    onClick={() => handleInfluencerSelection(influencer.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarImage src={influencer.avatar} />
                            <AvatarFallback>
                              {influencer.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm truncate">{influencer.name}</h3>
                              {influencer.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{influencer.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{influencer.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{influencer.bio}</p>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <Users className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs">Followers</span>
                          </div>
                          <span className="font-medium text-sm">{formatNumber(influencer.followers)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <TrendingUp className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs">Engagement</span>
                          </div>
                          <span className="font-medium text-sm">{influencer.engagement}%</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <DollarSign className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs">Price/Post</span>
                          </div>
                          <span className="font-medium text-sm">${influencer.pricePerPost.toLocaleString()}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs">Location</span>
                          </div>
                          <span className="font-medium text-sm truncate">{influencer.location}</span>
                        </div>
                      </div>

                      {/* Niche Tags */}
                      <div className="flex flex-wrap gap-1">
                        {influencer.niche.map(niche => (
                          <Badge key={niche} variant="outline" className="text-xs px-2 py-1">
                            {niche}
                          </Badge>
                        ))}
                      </div>

                      {/* Availability & Response */}
                      <div className="flex items-center justify-between">
                        <Badge className={getAvailabilityColor(influencer.availability)}>
                          {influencer.availability}
                        </Badge>
                        <div className="text-xs text-gray-600">
                          {influencer.responseRate}% response rate
                        </div>
                      </div>

                      {/* Platforms */}
                      <div className="flex items-center gap-2">
                        {influencer.platforms.instagram && (
                          <Instagram className="w-4 h-4 text-pink-500 flex-shrink-0" />
                        )}
                        {influencer.platforms.tiktok && (
                          <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                        )}
                        {influencer.platforms.youtube && (
                          <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">Y</span>
                          </div>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      {selectedInfluencers.includes(influencer.id) && (
                        <div className="flex items-center gap-2 text-blue-600 pt-2">
                          <Check className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredInfluencers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No influencers found</h3>
                  <p className="text-gray-500">Try adjusting your filters to find more influencers</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Your Applications</h3>
              <p className="text-gray-500">Track your campaign applications here</p>
            </div>
          )}
        </TabsContent>

        {/* Active Deals Tab */}
        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {acceptedDeals.map((deal) => (
              <Card key={deal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{deal.campaignTitle}</h3>
                    <Badge className={getStatusColor(deal.status)}>
                      {deal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={deal.influencer.avatar} />
                      <AvatarFallback>
                        {deal.influencer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{deal.influencer.name}</h4>
                      <p className="text-sm text-gray-600">
                        {formatNumber(deal.influencer.followers)} followers
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Budget</span>
                      <span className="font-medium">${deal.dealDetails.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Timeline</span>
                      <span className="font-medium">{deal.dealDetails.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="font-medium">{deal.progress}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(deal.progress)}`}
                      style={{ width: `${deal.progress}%` }}
                    ></div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Deliverables</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {deal.dealDetails.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-6">
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No completed campaigns yet</h3>
            <p className="text-gray-500">Completed campaigns will appear here</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Campaign Title</Label>
              <Input
                id="title"
                value={newCampaign.title}
                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                placeholder="Enter campaign title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                placeholder="Describe your campaign requirements"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minFollowers">Minimum Followers</Label>
                <Input
                  id="minFollowers"
                  type="number"
                  value={newCampaign.minFollowers}
                  onChange={(e) => setNewCampaign({ ...newCampaign, minFollowers: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="minEngagement">Minimum Engagement (%)</Label>
                <Input
                  id="minEngagement"
                  type="number"
                  step="0.1"
                  value={newCampaign.minEngagement}
                  onChange={(e) => setNewCampaign({ ...newCampaign, minEngagement: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minBudget">Minimum Budget ($)</Label>
                <Input
                  id="minBudget"
                  type="number"
                  value={newCampaign.minBudget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, minBudget: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="maxBudget">Maximum Budget ($)</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  value={newCampaign.maxBudget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, maxBudget: Number(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={newCampaign.timeline} onValueChange={(value) => setNewCampaign({ ...newCampaign, timeline: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="3 weeks">3 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="2 months">2 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateCampaign} className="flex-1">
                Create Campaign
              </Button>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 