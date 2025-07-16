"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  Star,
  MessageSquare,
  Heart,
  Eye,
  Calendar,
  Award,
  Clock,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
  X,
  ArrowRight,
  Bookmark,
  Share2,
} from "lucide-react"

interface Influencer {
  id: string
  name: string
  username: string
  avatar: string
  followers: number
  engagement: number
  platforms: string[]
  price: number
  bio: string
  tags: string[]
  location: string
  responseTime: string
  rating: number
  completedCampaigns: number
  averageViews: number
  averageLikes: number
  averageComments: number
  audienceDemographics: {
    age: { [key: string]: number }
    gender: { [key: string]: number }
    topCountries: string[]
  }
  contentCategories: string[]
  availability: string
  languages: string[]
  verified: boolean
  featured: boolean
  portfolio: {
    id: string
    thumbnail: string
    title: string
    views: number
    likes: number
    engagement: number
  }[]
}

export function InfluencerDiscovery() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [filters, setFilters] = useState({
    minFollowers: [0, 1000000],
    maxFollowers: [0, 1000000],
    minEngagement: [0, 10],
    maxPrice: [0, 10000],
    platforms: [] as string[],
    niches: [] as string[],
    locations: [] as string[],
    verified: false,
    featured: false,
  })
  const [sortBy, setSortBy] = useState<"relevance" | "followers" | "engagement" | "price" | "rating">("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data - in real app, this would come from API
  const mockInfluencers: Influencer[] = [
    {
      id: "1",
      name: "Glenn Chen",
      username: "@glennfitness",
      avatar: "/placeholder-user.jpg",
      followers: 125000,
      engagement: 4.2,
      platforms: ["Instagram", "TikTok"],
      price: 2500,
      bio: "Fitness & lifestyle content creator helping people achieve their health goals through sustainable workouts and nutrition tips.",
      tags: ["fitness", "lifestyle", "wellness", "nutrition", "workout"],
      location: "Brisbane, Australia",
      responseTime: "2-4 hours",
      rating: 4.8,
      completedCampaigns: 47,
      averageViews: 45000,
      averageLikes: 3200,
      averageComments: 450,
      audienceDemographics: {
        age: { "18-24": 35, "25-34": 45, "35-44": 15, "45+": 5 },
        gender: { "Female": 65, "Male": 35 },
        topCountries: ["United States", "Canada", "Australia"]
      },
      contentCategories: ["Fitness", "Lifestyle", "Nutrition"],
      availability: "Available for campaigns",
      languages: ["English", "Spanish"],
      verified: true,
      featured: true,
      portfolio: [
        {
          id: "1",
          thumbnail: "/placeholder.jpg",
          title: "Morning Workout Routine",
          views: 52000,
          likes: 3800,
          engagement: 4.8
        },
        {
          id: "2",
          thumbnail: "/placeholder.jpg",
          title: "Healthy Meal Prep",
          views: 41000,
          likes: 2900,
          engagement: 4.2
        }
      ]
    },
    {
      id: "2",
      name: "Sarah Kim",
      username: "@sarahbeauty",
      avatar: "/placeholder-user.jpg",
      followers: 89000,
      engagement: 5.1,
      platforms: ["Instagram", "YouTube"],
      price: 1800,
      bio: "Fashion and beauty influencer sharing style tips and product reviews. Passionate about sustainable fashion and clean beauty.",
      tags: ["fashion", "beauty", "style", "makeup", "skincare"],
      location: "New York, NY",
      responseTime: "1-3 hours",
      rating: 4.9,
      completedCampaigns: 32,
      averageViews: 38000,
      averageLikes: 2800,
      averageComments: 380,
      audienceDemographics: {
        age: { "18-24": 40, "25-34": 50, "35-44": 8, "45+": 2 },
        gender: { "Female": 85, "Male": 15 },
        topCountries: ["United States", "United Kingdom", "Canada"]
      },
      contentCategories: ["Beauty", "Fashion", "Lifestyle"],
      availability: "Available for campaigns",
      languages: ["English", "Korean"],
      verified: true,
      featured: false,
      portfolio: [
        {
          id: "3",
          thumbnail: "/placeholder.jpg",
          title: "Summer Makeup Tutorial",
          views: 35000,
          likes: 2600,
          engagement: 5.1
        }
      ]
    },
    {
      id: "3",
      name: "Mike Johnson",
      username: "@mikesports",
      avatar: "/placeholder-user.jpg",
      followers: 210000,
      engagement: 3.8,
      platforms: ["Instagram", "TikTok", "YouTube"],
      price: 3500,
      bio: "Sports and fitness enthusiast motivating others through workout content and athletic lifestyle tips.",
      tags: ["sports", "fitness", "motivation", "training", "athletics"],
      location: "Miami, FL",
      responseTime: "4-6 hours",
      rating: 4.7,
      completedCampaigns: 28,
      averageViews: 75000,
      averageLikes: 5200,
      averageComments: 680,
      audienceDemographics: {
        age: { "18-24": 30, "25-34": 40, "35-44": 20, "45+": 10 },
        gender: { "Female": 45, "Male": 55 },
        topCountries: ["United States", "Brazil", "Mexico"]
      },
      contentCategories: ["Sports", "Fitness", "Motivation"],
      availability: "Available for campaigns",
      languages: ["English", "Spanish"],
      verified: true,
      featured: true,
      portfolio: [
        {
          id: "4",
          thumbnail: "/placeholder.jpg",
          title: "HIIT Workout Challenge",
          views: 82000,
          likes: 5800,
          engagement: 3.8
        }
      ]
    },
    {
      id: "4",
      name: "Emma Rodriguez",
      username: "@emmatravels",
      avatar: "/placeholder-user.jpg",
      followers: 156000,
      engagement: 4.7,
      platforms: ["Instagram", "TikTok"],
      price: 2200,
      bio: "Travel blogger sharing adventures and destination guides worldwide. Helping people discover amazing places and experiences.",
      tags: ["travel", "adventure", "lifestyle", "photography", "exploration"],
      location: "San Francisco, CA",
      responseTime: "1-2 hours",
      rating: 4.9,
      completedCampaigns: 41,
      averageViews: 68000,
      averageLikes: 4200,
      averageComments: 520,
      audienceDemographics: {
        age: { "18-24": 25, "25-34": 55, "35-44": 15, "45+": 5 },
        gender: { "Female": 70, "Male": 30 },
        topCountries: ["United States", "Canada", "Australia", "United Kingdom"]
      },
      contentCategories: ["Travel", "Lifestyle", "Photography"],
      availability: "Available for campaigns",
      languages: ["English", "Spanish"],
      verified: true,
      featured: true,
      portfolio: [
        {
          id: "5",
          thumbnail: "/placeholder.jpg",
          title: "Bali Adventure Guide",
          views: 72000,
          likes: 4800,
          engagement: 4.7
        }
      ]
    },
    {
      id: "5",
      name: "David Park",
      username: "@davidtech",
      avatar: "/placeholder-user.jpg",
      followers: 75000,
      engagement: 6.2,
      platforms: ["Instagram", "YouTube"],
      price: 1500,
      bio: "Tech reviewer and gadget enthusiast sharing the latest in technology and helping people make informed purchasing decisions.",
      tags: ["tech", "gadgets", "reviews", "innovation", "smartphones"],
      location: "Seattle, WA",
      responseTime: "3-5 hours",
      rating: 4.6,
      completedCampaigns: 23,
      averageViews: 32000,
      averageLikes: 2400,
      averageComments: 380,
      audienceDemographics: {
        age: { "18-24": 20, "25-34": 60, "35-44": 15, "45+": 5 },
        gender: { "Female": 35, "Male": 65 },
        topCountries: ["United States", "Canada", "India"]
      },
      contentCategories: ["Technology", "Reviews", "Gadgets"],
      availability: "Available for campaigns",
      languages: ["English"],
      verified: false,
      featured: false,
      portfolio: [
        {
          id: "6",
          thumbnail: "/placeholder.jpg",
          title: "iPhone 15 Pro Review",
          views: 28000,
          likes: 2200,
          engagement: 6.2
        }
      ]
    }
  ]

  useEffect(() => {
    setInfluencers(mockInfluencers)
    setFilteredInfluencers(mockInfluencers)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, searchTerm, sortBy])

  const applyFilters = () => {
    let filtered = influencers.filter(influencer => {
      // Search filter
      const matchesSearch = 
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      // Follower range filter
      const matchesFollowers = 
        influencer.followers >= filters.minFollowers[0] && 
        influencer.followers <= filters.maxFollowers[1]

      // Engagement filter
      const matchesEngagement = influencer.engagement >= filters.minEngagement[0]

      // Price filter
      const matchesPrice = influencer.price <= filters.maxPrice[1]

      // Platform filter
      const matchesPlatforms = 
        filters.platforms.length === 0 || 
        filters.platforms.some(platform => influencer.platforms.includes(platform))

      // Niche filter
      const matchesNiches = 
        filters.niches.length === 0 || 
        filters.niches.some(niche => influencer.tags.includes(niche))

      // Location filter
      const matchesLocation = 
        filters.locations.length === 0 || 
        filters.locations.some(location => influencer.location.includes(location))

      // Verified filter
      const matchesVerified = !filters.verified || influencer.verified

      // Featured filter
      const matchesFeatured = !filters.featured || influencer.featured

      return matchesSearch && matchesFollowers && matchesEngagement && 
             matchesPrice && matchesPlatforms && matchesNiches && 
             matchesLocation && matchesVerified && matchesFeatured
    })

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "followers":
          return b.followers - a.followers
        case "engagement":
          return b.engagement - a.engagement
        case "price":
          return a.price - b.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0 // relevance - keep original order
      }
    })

    setFilteredInfluencers(filtered)
  }

  const handleContact = (influencer: Influencer) => {
    // In real app, this would open messaging or contact form
    console.log("Contacting:", influencer.name)
  }

  const handleSave = (influencer: Influencer) => {
    // In real app, this would save to favorites
    console.log("Saving:", influencer.name)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              <CardTitle>Discover Influencers</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search influencers by name, niche, location, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Followers Range</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minFollowers[0]}
                    onChange={(e) => setFilters({
                      ...filters,
                      minFollowers: [Number(e.target.value), filters.minFollowers[1]]
                    })}
                    className="w-20"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxFollowers[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      maxFollowers: [filters.maxFollowers[0], Number(e.target.value)]
                    })}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Engagement Rate (%)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minEngagement[0]}
                    onChange={(e) => setFilters({
                      ...filters,
                      minEngagement: [Number(e.target.value), filters.minEngagement[1]]
                    })}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Max Price ($)</Label>
                <Input
                  type="number"
                  placeholder="Max budget"
                  value={filters.maxPrice[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    maxPrice: [filters.maxPrice[0], Number(e.target.value)]
                  })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Platforms</Label>
                <div className="flex gap-2 mt-2">
                  {["Instagram", "TikTok", "YouTube", "Twitter"].map(platform => (
                    <Checkbox
                      key={platform}
                      checked={filters.platforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters({
                            ...filters,
                            platforms: [...filters.platforms, platform]
                          })
                        } else {
                          setFilters({
                            ...filters,
                            platforms: filters.platforms.filter(p => p !== platform)
                          })
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="followers">Followers</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={filters.verified}
                    onCheckedChange={(checked) => setFilters({
                      ...filters,
                      verified: checked as boolean
                    })}
                  />
                  <Label className="text-sm">Verified Only</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={filters.featured}
                    onCheckedChange={(checked) => setFilters({
                      ...filters,
                      featured: checked as boolean
                    })}
                  />
                  <Label className="text-sm">Featured Only</Label>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredInfluencers.length} influencers found
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Influencers Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredInfluencers.map((influencer) => (
          <Card key={influencer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {influencer.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{influencer.name}</h3>
                    {influencer.featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">@{influencer.username}</p>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{influencer.bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{influencer.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span>{influencer.engagement}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>${influencer.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gray-500" />
                      <span>{influencer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Platforms:</span>
                    <div className="flex gap-1">
                      {influencer.platforms.map(platform => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleContact(influencer)}
                      className="flex-1"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInfluencer(influencer)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(influencer)}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Influencer Profile Dialog */}
      {selectedInfluencer && (
        <Dialog open={!!selectedInfluencer} onOpenChange={() => setSelectedInfluencer(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <img
                  src={selectedInfluencer.avatar}
                  alt={selectedInfluencer.name}
                  className="w-8 h-8 rounded-full"
                />
                {selectedInfluencer.name}
                {selectedInfluencer.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Verified
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="demographics">Audience</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{selectedInfluencer.followers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{selectedInfluencer.engagement}%</p>
                    <p className="text-sm text-gray-600">Engagement</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">${selectedInfluencer.price}</p>
                    <p className="text-sm text-gray-600">Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">{selectedInfluencer.rating}</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Bio</h4>
                  <p className="text-gray-700">{selectedInfluencer.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInfluencer.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-gray-700">{selectedInfluencer.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-gray-700">{selectedInfluencer.responseTime}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-xl font-bold">{selectedInfluencer.averageViews.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Avg Views</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-xl font-bold">{selectedInfluencer.averageLikes.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Avg Likes</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-xl font-bold">{selectedInfluencer.averageComments.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Avg Comments</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Content Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInfluencer.contentCategories.map(category => (
                      <Badge key={category} variant="outline">{category}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedInfluencer.portfolio.map(item => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <span>{item.views.toLocaleString()} views</span>
                        <span>{item.likes.toLocaleString()} likes</span>
                        <span>{item.engagement}% engagement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="demographics" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Age Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedInfluencer.audienceDemographics.age).map(([age, percentage]) => (
                      <div key={age} className="flex items-center justify-between">
                        <span className="text-sm">{age}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Gender Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedInfluencer.audienceDemographics.gender).map(([gender, percentage]) => (
                      <div key={gender} className="flex items-center justify-between">
                        <span className="text-sm">{gender}</span>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Top Countries</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInfluencer.audienceDemographics.topCountries.map(country => (
                      <Badge key={country} variant="outline">{country}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={() => handleContact(selectedInfluencer)} className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Influencer
              </Button>
              <Button variant="outline" onClick={() => handleSave(selectedInfluencer)}>
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 