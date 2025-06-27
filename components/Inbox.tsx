"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle,
  Star,
  DollarSign,
  Target,
  Calendar,
  User,
  Briefcase,
  Check,
  X,
  Edit,
  AlertCircle,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
  type: "text" | "campaign" | "proposal" | "payment" | "deal" | "negotiate" | "decline"
  campaignId?: string
  attachments?: string[]
  dealDetails?: {
    price: number
    deliverables: string[]
    timeline: string
    status: "pending" | "accepted" | "negotiating" | "declined"
  }
}

interface Conversation {
  id: string
  brand: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
  creator: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
  lastMessage: Message
  unreadCount: number
  campaign?: {
    id: string
    title: string
    budget: number
    status: "active" | "completed" | "cancelled"
  }
  dealStatus?: "pending" | "accepted" | "negotiating" | "declined"
}

interface User {
  id: string
  name: string
  avatar: string
  type: "brand" | "influencer"
  verified: boolean
}

export function Inbox() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUser] = useState<User>({
    id: "current-user",
    name: "Current User",
    avatar: "/placeholder-user.jpg",
    type: "brand",
    verified: true,
  })
  const [showDealDialog, setShowDealDialog] = useState(false)
  const [dealDetails, setDealDetails] = useState({
    price: 2500,
    deliverables: ["3 Instagram posts", "2 Instagram stories", "1 TikTok video"],
    timeline: "2 weeks",
  })

  // Mock data
  const mockConversations: Conversation[] = [
    {
      id: "1",
      brand: {
        id: "brand-1",
        name: "SportFit Pro",
        avatar: "/placeholder-logo.png",
        verified: true,
      },
      creator: {
        id: "creator-1",
        name: "Glenn Chen",
        avatar: "/placeholder-user.jpg",
        verified: true,
      },
      lastMessage: {
        id: "msg-1",
        senderId: "creator-1",
        receiverId: "brand-1",
        content: "Hi! I'm interested in your fitness campaign. I have 125K followers and 4.2% engagement rate.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        type: "text",
      },
      unreadCount: 1,
      campaign: {
        id: "campaign-1",
        title: "Summer Fitness Challenge",
        budget: 2500,
        status: "active",
      },
      dealStatus: "pending",
    },
    {
      id: "2",
      brand: {
        id: "brand-2",
        name: "NutriLife",
        avatar: "/placeholder-logo.png",
        verified: true,
      },
      creator: {
        id: "creator-2",
        name: "Sarah Kim",
        avatar: "/placeholder-user.jpg",
        verified: true,
      },
      lastMessage: {
        id: "msg-2",
        senderId: "brand-2",
        receiverId: "creator-2",
        content: "Perfect! Let's discuss the campaign details and timeline.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true,
        type: "text",
      },
      unreadCount: 0,
      campaign: {
        id: "campaign-2",
        title: "Healthy Living Tips Series",
        budget: 1800,
        status: "active",
      },
      dealStatus: "negotiating",
    },
  ]

  const mockMessages: Message[] = [
    {
      id: "msg-1",
      senderId: "influencer-1",
      receiverId: "current-user",
      content: "Hi! I'm interested in your fitness campaign. I have 125K followers and 4.2% engagement rate.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      type: "text",
    },
    {
      id: "msg-2",
      senderId: "current-user",
      receiverId: "influencer-1",
      content: "Hi Glenn! Thanks for reaching out. Can you tell me more about your audience demographics?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      read: true,
      type: "text",
    },
    {
      id: "msg-3",
      senderId: "influencer-1",
      receiverId: "current-user",
      content: "Of course! My audience is primarily 25-34 year olds (45%), mostly female (65%), interested in fitness, wellness, and healthy living. I'm based in LA and my engagement rate is consistently above 4%.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      read: true,
      type: "text",
    },
    {
      id: "msg-4",
      senderId: "current-user",
      receiverId: "influencer-1",
      content: "That sounds perfect for our target audience! The campaign budget is $2,500 and we're looking for 3-4 posts over 2 weeks. Would that work for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: true,
      type: "text",
    },
    {
      id: "msg-5",
      senderId: "influencer-1",
      receiverId: "current-user",
      content: "That sounds great! I'd love to work with you. Here's my proposal: $2,500 for 3 Instagram posts, 2 Instagram stories, and 1 TikTok video over 2 weeks. What do you think?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      read: true,
      type: "proposal",
      dealDetails: {
        price: 2500,
        deliverables: ["3 Instagram posts", "2 Instagram stories", "1 TikTok video"],
        timeline: "2 weeks",
        status: "pending",
      },
    },
  ]

  useEffect(() => {
    setConversations(mockConversations)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages)
    }
  }, [selectedConversation])

  const filteredConversations = conversations.filter(conversation =>
    conversation.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedConversation.creator.id,
      content: newMessage,
      timestamp: new Date(),
      read: false,
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Update conversation's last message
    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: message, unreadCount: 0 }
        : conv
    ))
  }

  const handleDealAction = (action: "deal" | "negotiate" | "decline") => {
    if (!selectedConversation) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedConversation.creator.id,
      content: action === "deal" ? "Deal accepted! Let's get started." : 
               action === "negotiate" ? "Let's negotiate the terms." : 
               "Thanks for your interest, but we'll pass on this opportunity.",
      timestamp: new Date(),
      read: false,
      type: action,
      dealDetails: action === "deal" ? {
        ...dealDetails,
        status: "accepted",
      } : action === "negotiate" ? {
        ...dealDetails,
        status: "negotiating",
      } : {
        ...dealDetails,
        status: "declined",
      },
    }

    setMessages([...messages, message])
    
    // Update conversation status
    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? { 
            ...conv, 
            lastMessage: message, 
            unreadCount: 0,
            dealStatus: action === "deal" ? "accepted" : 
                       action === "negotiate" ? "negotiating" : "declined"
          }
        : conv
    ))

    if (action === "deal") {
      // Add to campaigns for both parties
      console.log("Deal accepted - adding to campaigns")
    }

    setShowDealDialog(false)
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getDealStatusColor = (status?: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700"
      case "negotiating":
        return "bg-yellow-100 text-yellow-700"
      case "declined":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="h-screen flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-blue-50 border-r-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.brand.avatar} />
                      <AvatarFallback>
                        {conversation.brand.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.brand.verified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <h3 className="font-semibold text-sm truncate">
                          {conversation.brand.name}
                        </h3>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          Brand
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatTimestamp(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    {conversation.campaign && (
                      <div className="flex items-center gap-1 mb-2">
                        <Target className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate flex-1">
                          {conversation.campaign.title}
                        </span>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          ${conversation.campaign.budget}
                        </Badge>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-2">
                      {conversation.lastMessage.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs flex-shrink-0">
                          {conversation.unreadCount} new
                        </Badge>
                      )}
                      {conversation.dealStatus && (
                        <Badge className={`text-xs flex-shrink-0 ${getDealStatusColor(conversation.dealStatus)}`}>
                          {conversation.dealStatus}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.brand.avatar} />
                    <AvatarFallback>
                      {selectedConversation.brand.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.creator.avatar} />
                    <AvatarFallback>
                      {selectedConversation.creator.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.brand.name} ↔ {selectedConversation.creator.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Brand
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Creator
                      </Badge>
                      {selectedConversation.brand.verified && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Verified
                        </Badge>
                      )}
                      {selectedConversation.creator.verified && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Verified
                        </Badge>
                      )}
                      {selectedConversation.dealStatus && (
                        <Badge className={`text-xs ${getDealStatusColor(selectedConversation.dealStatus)}`}>
                          {selectedConversation.dealStatus}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isOwnMessage = message.senderId === currentUser.id
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${isOwnMessage ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-3 rounded-lg max-w-[70%] ${
                            isOwnMessage
                              ? "bg-blue-500 text-white"
                              : "bg-white border"
                          }`}
                        >
                          <p className="text-sm leading-relaxed break-words">{message.content}</p>
                          {message.dealDetails && (
                            <div className={`mt-3 p-3 rounded-lg ${
                              isOwnMessage ? "bg-blue-600" : "bg-gray-50"
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-sm font-medium ${
                                  isOwnMessage ? "text-blue-100" : "text-gray-700"
                                }`}>
                                  Deal Proposal
                                </span>
                                <span className={`text-sm ${
                                  isOwnMessage ? "text-blue-100" : "text-gray-600"
                                }`}>
                                  ${message.dealDetails.price}
                                </span>
                              </div>
                              <div className="space-y-1">
                                {message.dealDetails.deliverables.map((deliverable, index) => (
                                  <div key={index} className={`text-xs leading-relaxed ${
                                    isOwnMessage ? "text-blue-100" : "text-gray-600"
                                  }`}>
                                    • {deliverable}
                                  </div>
                                ))}
                              </div>
                              <div className={`text-xs mt-2 ${
                                isOwnMessage ? "text-blue-100" : "text-gray-500"
                              }`}>
                                Timeline: {message.dealDetails.timeline}
                              </div>
                            </div>
                          )}
                          <div className={`flex items-center gap-1 mt-2 ${
                            isOwnMessage ? "text-blue-100" : "text-gray-500"
                          }`}>
                            <span className="text-xs">
                              {formatTimestamp(message.timestamp)}
                            </span>
                            {isOwnMessage && (
                              <CheckCircle className="w-3 h-3 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Deal Action Buttons */}
            {selectedConversation.dealStatus === "pending" && (
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleDealAction("deal")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept Deal
                  </Button>
                  <Button 
                    onClick={() => setShowDealDialog(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Negotiate
                  </Button>
                  <Button 
                    onClick={() => handleDealAction("decline")}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[60px] max-h-[120px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Negotiate Deal Dialog */}
      <Dialog open={showDealDialog} onOpenChange={setShowDealDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Negotiate Deal Terms</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={dealDetails.price}
                onChange={(e) => setDealDetails({
                  ...dealDetails,
                  price: Number(e.target.value)
                })}
              />
            </div>
            <div>
              <Label>Timeline</Label>
              <Input
                value={dealDetails.timeline}
                onChange={(e) => setDealDetails({
                  ...dealDetails,
                  timeline: e.target.value
                })}
              />
            </div>
            <div>
              <Label>Deliverables</Label>
              <Textarea
                value={dealDetails.deliverables.join('\n')}
                onChange={(e) => setDealDetails({
                  ...dealDetails,
                  deliverables: e.target.value.split('\n').filter(d => d.trim())
                })}
                placeholder="Enter deliverables, one per line"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleDealAction("negotiate")}
                className="flex-1"
              >
                Send Counter-Offer
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowDealDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 