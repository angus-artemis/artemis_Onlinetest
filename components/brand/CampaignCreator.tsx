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
}

export function CampaignCreator() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    status: "draft",
    requirements: [],
    applications: 0,
    matches: [],
  })
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

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
      bio: "Fitness & lifestyle content creator",
      tags: ["fitness", "lifestyle", "wellness"],
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
      bio: "Fashion and beauty influencer",
      tags: ["fashion", "beauty", "style"],
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
      bio: "Sports and fitness enthusiast",
      tags: ["sports", "fitness", "motivation"],
    },
  ]

  const handleCreateCampaign = () => {
    if (newCampaign.title && newCampaign.description && newCampaign.budget) {
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
        matches: mockInfluencers.filter(influencer => 
          influencer.tags.some(tag => 
            newCampaign.requirements?.includes(tag)
          )
        ),
      }
      setCampaigns([...campaigns, campaign])
      setNewCampaign({ status: "draft", requirements: [], applications: 0, matches: [] })
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Creator</h2>
          <p className="text-gray-600">Create campaigns and find perfect influencer matches</p>
        </div>
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
      </div>

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
              <div className="grid grid-cols-2 gap-4 text-sm">
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
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  View Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Matches Dialog */}
      {selectedCampaign && (
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Matches for "{selectedCampaign.title}"</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedCampaign.matches.map((influencer) => (
                <Card key={influencer.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{influencer.name}</h3>
                          <p className="text-sm text-gray-600">{influencer.bio}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {influencer.followers.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {influencer.engagement}%
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${influencer.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{influencer.matchScore}% match</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Hire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 