export interface ContentSuggestion {
  id: string
  day: string
  time: string
  caption: string
  hashtags: string
  confidence: number
  postType: "reel" | "carousel" | "story" | "post"
}

export interface AnalyticsData {
  date: string
  followers: number
  engagement: number
  reach: number
  impressions: number
}

export interface Post {
  id: string
  date: string
  time: string
  type: "Reel" | "Carousel" | "Story" | "Post"
  content: string
  status: "scheduled" | "draft" | "published" | "idea"
  likes?: number
  comments?: number
  shares?: number
  engagement?: number
}

export interface ContentPerformance {
  type: string
  title: string
  platform: string
  engagement: number
  posts: number
  trend: "up" | "down" | "stable"
  avgLikes: number
  avgComments: number
}

export interface BrandOpportunity {
  id: string
  brand: string
  category: string
  description: string
  budget: number
  platform: string
  estimatedPay: string
  requirements: string
  deadline: string
  status: "available" | "applied" | "negotiating" | "accepted"
}
