"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Target,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Hash,
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
  X,
  Filter,
  Search,
  Award,
  Clock,
} from "lucide-react"

interface Campaign {
  id: string
  title: string
  description: string
  budget: number
  requirements: string[]
  category: string
  location: string
  duration: string
  status: "draft" | "active" | "completed"
  createdAt: Date
  applications: number
  matches: InfluencerMatch[]
  minFollowers?: number
  minEngagement?: number
  niche?: string
}

interface InfluencerMatch {
  id: string
  name: string
  avatar: string
  followers: number
  engagement: number
  platforms: string[]
  matchScore: number
  price: number
  bio: string
  tags: string[]
  location: string
  responseTime: string
  rating: number
  completedCampaigns: number
}

export function CampaignCreator() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    status: "draft",
    requirements: [],
    applications: 0,
    matches: [],
    minFollowers: 0,
    minEngagement: 0,
    niche: "",
  })
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"matchScore" | "followers" | "engagement" | "price">("matchScore")

  const mockInfluencers: InfluencerMatch[] = [
    {
      id: "1",
      name: "Alex Chen",
      avatar: "/placeholder-user.jpg",
      followers: 125000,
      engagement: 4.2,
      platforms: ["Instagram", "TikTok"],
      matchScore: 95,
      price: 2500,
      bio: "Fitness & lifestyle content creator helping people achieve their health goals",
      tags: ["fitness", "lifestyle", "wellness", "nutrition"],
      location: "Los Angeles, CA",
      responseTime: "2-4 hours",
      rating: 4.8,
      completedCampaigns: 47,
    },
    {
      id: "2",
      name: "Sarah Kim",
      avatar: "/placeholder-user.jpg",
      followers: 89000,
      engagement: 5.1,
      platforms: ["Instagram", "YouTube"],
      matchScore: 88,
      price: 1800,
      bio: "Fashion and beauty influencer sharing style tips and product reviews",
      tags: ["fashion", "beauty", "style", "makeup"],
      location: "New York, NY",
      responseTime: "1-3 hours",
      rating: 4.9,
      completedCampaigns: 32,
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      followers: 210000,
      engagement: 3.8,
      platforms: ["Instagram", "TikTok", "YouTube"],
      matchScore: 82,
      price: 3500,
      bio: "Sports and fitness enthusiast motivating others through workout content",
      tags: ["sports", "fitness", "motivation", "training"],
      location: "Miami, FL",
      responseTime: "4-6 hours",
      rating: 4.7,
      completedCampaigns: 28,
    },
    {
      id: "4",
      name: "Emma Rodriguez",
      avatar: "/placeholder-user.jpg",
      followers: 156000,
      engagement: 4.7,
      platforms: ["Instagram", "TikTok"],
      matchScore: 91,
      price: 2200,
      bio: "Travel blogger sharing adventures and destination guides worldwide",
      tags: ["travel", "adventure", "lifestyle", "photography"],
      location: "San Francisco, CA",
      responseTime: "1-2 hours",
      rating: 4.9,
      completedCampaigns: 41,
    },
    {
      id: "5",
      name: "David Park",
      avatar: "/placeholder-user.jpg",
      followers: 75000,
      engagement: 6.2,
      platforms: ["Instagram", "YouTube"],
      matchScore: 87,
      price: 1500,
      bio: "Tech reviewer and gadget enthusiast sharing the latest in technology",
      tags: ["tech", "gadgets", "reviews", "innovation"],
      location: "Seattle, WA",
      responseTime: "3-5 hours",
      rating: 4.6,
      completedCampaigns: 23,
    },
    {
      id: "6",
      name: "Lisa Thompson",
      avatar: "/placeholder-user.jpg",
      followers: 320000,
      engagement: 3.2,
      platforms: ["Instagram", "TikTok", "YouTube"],
      matchScore: 78,
      price: 4800,
      bio: "Food blogger and recipe creator inspiring home cooking",
      tags: ["food", "cooking", "recipes", "lifestyle"],
      location: "Austin, TX",
      responseTime: "6-8 hours",
      rating: 4.5,
      completedCampaigns: 35,
    },
    {
      id: "7",
      name: "James Wilson",
      avatar: "/placeholder-user.jpg",
      followers: 95000,
      engagement: 5.8,
      platforms: ["Instagram", "TikTok"],
      matchScore: 93,
      price: 1900,
      bio: "Sustainable living advocate promoting eco-friendly lifestyle choices",
      tags: ["sustainability", "eco-friendly", "lifestyle", "green"],
      location: "Portland, OR",
      responseTime: "2-3 hours",
      rating: 4.8,
      completedCampaigns: 19,
    },
    {
      id: "8",
      name: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      followers: 180000,
      engagement: 4.0,
      platforms: ["Instagram", "YouTube"],
      matchScore: 85,
      price: 2800,
      bio: "Parenting influencer sharing tips for modern families",
      tags: ["parenting", "family", "lifestyle", "kids"],
      location: "Chicago, IL",
      responseTime: "4-6 hours",
      rating: 4.7,
      completedCampaigns: 26,
    },
  ]

  const calculateMatchScore = (influencer: InfluencerMatch, campaign: Partial<Campaign>): number => {
    let score = 0
    let totalFactors = 0

    // Follower count match (30% weight)
    if (campaign.minFollowers) {
      const followerScore = Math.min(100, (influencer.followers / campaign.minFollowers) * 100)
      score += followerScore * 0.3
      totalFactors += 0.3
    }

    // Engagement rate match (25% weight)
    if (campaign.minEngagement) {
      const engagementScore = Math.min(100, (influencer.engagement / campaign.minEngagement) * 100)
      score += engagementScore * 0.25
      totalFactors += 0.25
    }

    // Niche match (25% weight)
    if (campaign.niche && influencer.tags.includes(campaign.niche)) {
      score += 100 * 0.25
      totalFactors += 0.25
    }

    // Budget compatibility (20% weight)
    if (campaign.budget) {
      const budgetScore = Math.max(0, 100 - ((influencer.price - campaign.budget) / campaign.budget) * 100)
      score += Math.max(0, budgetScore) * 0.2
      totalFactors += 0.2
    }

    return totalFactors > 0 ? Math.round(score / totalFactors) : 0
  }

  const handleCreateCampaign = () => {
    if (newCampaign.title && newCampaign.description && newCampaign.budget) {
      // Calculate matches with improved scoring
      const matches = mockInfluencers
        .map(influencer => ({
          ...influencer,
          matchScore: calculateMatchScore(influencer, newCampaign)
        }))
        .filter(influencer => 
          influencer.followers >= (newCampaign.minFollowers || 0) &&
          influencer.engagement >= (newCampaign.minEngagement || 0) &&
          (newCampaign.niche ? influencer.tags.includes(newCampaign.niche) : true) &&
          influencer.price <= (newCampaign.budget || Infinity)
        )
        .sort((a, b) => b.matchScore - a.matchScore)

      const campaign: Campaign = {
        id: Date.now().toString(),
        title: newCampaign.title,
        description: newCampaign.description,
        budget: newCampaign.budget,
        requirements: newCampaign.requirements || [],
        category: newCampaign.category || "",
        location: newCampaign.location || "",
        duration: newCampaign.duration || "",
        status: "active",
        createdAt: new Date(),
        applications: 0,
        matches,
        minFollowers: newCampaign.minFollowers,
        minEngagement: newCampaign.minEngagement,
        niche: newCampaign.niche,
      }
      setCampaigns([...campaigns, campaign])
      setSelectedCampaign(campaign)
      setNewCampaign({ status: "draft", requirements: [], applications: 0, matches: [], minFollowers: 0, minEngagement: 0, niche: "" })
      setShowCreateDialog(false)
    }
  }

  const addRequirement = (requirement: string) => {
    if (requirement && !newCampaign.requirements?.includes(requirement)) {
      setNewCampaign({
        ...newCampaign,
        requirements: [...(newCampaign.requirements || []), requirement],
      })
    }
  }

  const removeRequirement = (requirement: string) => {
    setNewCampaign({
      ...newCampaign,
      requirements: newCampaign.requirements?.filter(r => r !== requirement) || [],
    })
  }

  const filteredMatches = selectedCampaign?.matches
    .filter(influencer => 
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "followers":
          return b.followers - a.followers
        case "engagement":
          return b.engagement - a.engagement
        case "price":
          return a.price - b.price
        default:
          return b.matchScore - a.matchScore
      }
    }) || []

  return (
    <div className="space-y-6">
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Campaign Title</Label>
              <Input
                id="title"
                placeholder="e.g., Summer Fitness Challenge"
                value={newCampaign.title || ""}
                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign goals and requirements..."
                value={newCampaign.description || ""}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  value={newCampaign.budget || ""}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newCampaign.category} onValueChange={(value) => setNewCampaign({ ...newCampaign, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="parenting">Parenting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={newCampaign.location || ""}
                  onChange={(e) => setNewCampaign({ ...newCampaign, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select value={newCampaign.duration} onValueChange={(value) => setNewCampaign({ ...newCampaign, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minFollowers">Minimum Followers</Label>
                <Input
                  id="minFollowers"
                  type="number"
                  placeholder="e.g., 10000"
                  value={newCampaign.minFollowers || ""}
                  onChange={e => setNewCampaign({ ...newCampaign, minFollowers: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="minEngagement">Minimum Engagement Rate (%)</Label>
                <Input
                  id="minEngagement"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 3.5"
                  value={newCampaign.minEngagement || ""}
                  onChange={e => setNewCampaign({ ...newCampaign, minEngagement: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="niche">Niche</Label>
              <Select
                value={newCampaign.niche || ""}
                onValueChange={val => setNewCampaign({ ...newCampaign, niche: val })}
              >
                <SelectTrigger id="niche">
                  <SelectValue placeholder="Select a niche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="parenting">Parenting</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Requirements (Non-negotiables)</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add requirement (e.g., fitness, lifestyle)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addRequirement(e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <Button onClick={() => {
                  const input = document.querySelector('input[placeholder*="requirement"]') as HTMLInputElement
                  if (input?.value) {
                    addRequirement(input.value)
                    input.value = ''
                  }
                }}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newCampaign.requirements?.map((req, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeRequirement(req)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign}>
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    {campaign.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                </div>
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Budget:</span>
                  <span className="ml-2 font-semibold">${campaign.budget.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Matches:</span>
                  <span className="ml-2 font-semibold">{campaign.matches.length} influencers</span>
                </div>
                <div>
                  <span className="text-gray-500">Applications:</span>
                  <span className="ml-2 font-semibold">{campaign.applications}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-2">{campaign.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              {/* Campaign Requirements Summary */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Campaign Requirements:</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {campaign.minFollowers && (
                    <Badge variant="outline">Min {campaign.minFollowers.toLocaleString()} followers</Badge>
                  )}
                  {campaign.minEngagement && (
                    <Badge variant="outline">Min {campaign.minEngagement}% engagement</Badge>
                  )}
                  {campaign.niche && (
                    <Badge variant="outline">{campaign.niche} niche</Badge>
                  )}
                  {campaign.requirements?.map((req, index) => (
                    <Badge key={index} variant="outline">{req}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  View Matches ({campaign.matches.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Matches Dialog */}
      {selectedCampaign && (
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Matches for "{selectedCampaign.title}"
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Found {filteredMatches.length} influencers matching your criteria
              </p>
            </DialogHeader>
            
            {/* Search and Filter Controls */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search influencers by name, bio, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matchScore">Sort by Match Score</SelectItem>
                  <SelectItem value="followers">Sort by Followers</SelectItem>
                  <SelectItem value="engagement">Sort by Engagement</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredMatches.map((influencer) => (
                <Card key={influencer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{influencer.name}</h3>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {influencer.rating}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {influencer.completedCampaigns} campaigns
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{influencer.bio}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span>{influencer.followers.toLocaleString()} followers</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-gray-500" />
                              <span>{influencer.engagement}% engagement</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-gray-500" />
                              <span>${influencer.price}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>{influencer.responseTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs text-gray-500">Platforms:</span>
                            <div className="flex gap-1">
                              {influencer.platforms.map(platform => (
                                <Badge key={platform} variant="outline" className="text-xs">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">Tags:</span>
                            <div className="flex gap-1">
                              {influencer.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1 mb-3">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-lg">{influencer.matchScore}% match</span>
                        </div>
                        
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" className="w-full">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Hire for ${influencer.price}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredMatches.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No influencers match your current search criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                    className="mt-2"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 