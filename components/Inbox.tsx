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
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Calendar,
  MapPin,
} from "lucide-react"

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
    type: "brand" | "influencer"
  }
  content: string
  timestamp: Date
  isRead: boolean
  campaignId?: string
  applicationId?: string
}

interface Application {
  id: string
  campaignTitle: string
  influencer: {
    id: string
    name: string
    avatar: string
    followers: number
    engagement: number
    price: number
  }
  status: "pending" | "accepted" | "rejected" | "negotiating"
  message: string
  timestamp: Date
  budget: number
}

interface Campaign {
  id: string
  title: string
  brand: {
    id: string
    name: string
    avatar: string
  }
  budget: number
  status: "active" | "completed" | "cancelled"
  timestamp: Date
}

export function Inbox({ userRole }: { userRole: "creator" | "brand" }) {
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const mockMessages: Message[] = [
    {
      id: "1",
      sender: {
        id: "brand1",
        name: "SportFit Pro",
        avatar: "/placeholder-logo.png",
        type: "brand"
      },
      content: "Hi Alex! We loved your fitness content and would love to collaborate on our new protein powder campaign.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      campaignId: "campaign1"
    },
    {
      id: "2",
      sender: {
        id: "influencer1",
        name: "Sarah Kim",
        avatar: "/placeholder-user.jpg",
        type: "influencer"
      },
      content: "Thank you for the opportunity! I'm very interested in your campaign. What are the specific requirements?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isRead: true,
      campaignId: "campaign1"
    },
    {
      id: "3",
      sender: {
        id: "brand1",
        name: "SportFit Pro",
        avatar: "/placeholder-logo.png",
        type: "brand"
      },
      content: "We need 3 Instagram posts and 2 TikTok videos over 2 weeks. Budget is $2,500. Does that work for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: false,
      campaignId: "campaign1"
    }
  ]

  const mockApplications: Application[] = [
    {
      id: "app1",
      campaignTitle: "Summer Fitness Challenge",
      influencer: {
        id: "inf1",
        name: "Alex Chen",
        avatar: "/placeholder-user.jpg",
        followers: 125000,
        engagement: 4.2,
        price: 2500
      },
      status: "pending",
      message: "I'm excited about your fitness challenge! I have a strong following in the fitness space and would love to be part of this campaign.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      budget: 2500
    },
    {
      id: "app2",
      campaignTitle: "Summer Fitness Challenge",
      influencer: {
        id: "inf2",
        name: "Mike Johnson",
        avatar: "/placeholder-user.jpg",
        followers: 210000,
        engagement: 3.8,
        price: 3500
      },
      status: "negotiating",
      message: "Great campaign idea! I'd love to discuss the terms and see if we can work something out.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      budget: 3500
    }
  ]

  const mockCampaigns: Campaign[] = [
    {
      id: "camp1",
      title: "Summer Fitness Challenge",
      brand: {
        id: "brand1",
        name: "SportFit Pro",
        avatar: "/placeholder-logo.png"
      },
      budget: 5000,
      status: "active",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    }
  ]

  const conversations = userRole === "creator" 
    ? mockMessages.filter(m => m.sender.type === "brand")
    : mockMessages.filter(m => m.sender.type === "influencer")

  const applications = userRole === "brand" ? mockApplications : []
  const campaigns = userRole === "creator" ? mockCampaigns : []

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleApplicationAction = (applicationId: string, action: "accept" | "reject") => {
    // In a real app, this would update the application status
    console.log(`${action} application:`, applicationId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inbox</h2>
          <p className="text-gray-600">
            {userRole === "creator" 
              ? "Manage brand collaborations and applications" 
              : "Review influencer applications and manage campaigns"
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="applications">
            Applications
            {applications.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {applications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            Campaigns
            {campaigns.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {campaigns.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid gap-4">
            {conversations.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  !message.isRead ? 'border-blue-200 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedConversation(message.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{message.sender.name}</h3>
                        <span className="text-sm text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.content}</p>
                      {!message.isRead && (
                        <Badge variant="default" className="mt-1 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.influencer.avatar} />
                      <AvatarFallback>{application.influencer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{application.influencer.name}</CardTitle>
                      <p className="text-sm text-gray-600">{application.campaignTitle}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      application.status === "accepted" ? "default" :
                      application.status === "rejected" ? "destructive" :
                      application.status === "negotiating" ? "secondary" : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{application.influencer.followers.toLocaleString()} followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span>{application.influencer.engagement}% engagement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>${application.budget}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{application.message}</p>
                <div className="flex gap-2">
                  {application.status === "pending" && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleApplicationAction(application.id, "accept")}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApplicationAction(application.id, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={campaign.brand.avatar} />
                      <AvatarFallback>{campaign.brand.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <p className="text-sm text-gray-600">{campaign.brand.name}</p>
                    </div>
                  </div>
                  <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>${campaign.budget.toLocaleString()} budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{campaign.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Message Dialog */}
      {selectedConversation && (
        <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
          <DialogContent className="max-w-2xl h-[600px] flex flex-col">
            <DialogHeader>
              <DialogTitle>Chat with SportFit Pro</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.type === userRole ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender.type === userRole
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender.type === userRole ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-4 border-t">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                rows={2}
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 