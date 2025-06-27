"use client"

import { useState, useEffect } from "react"
import type { AnalyticsData, Post, ContentPerformance, BrandOpportunity, ContentSuggestion } from "../types/dashboard"

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [contentPerformance, setContentPerformance] = useState<ContentPerformance[]>([])
  const [brandOpportunities, setBrandOpportunities] = useState<BrandOpportunity[]>([])
  const [contentSuggestions, setContentSuggestions] = useState<ContentSuggestion[]>([])

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate realistic analytics data for the past 30 days
      const analytics: AnalyticsData[] = []
      const baseFollowers = 47800 // More realistic starting follower count
      const today = new Date()

      for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // More realistic growth patterns
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Weekend posts typically perform better
        const baseGrowth = isWeekend ? 150 : 85
        const variance = Math.random() * 100 - 30 // -30 to +70
        const growth = baseGrowth + variance

        // Engagement varies by day and content
        const baseEngagement = isWeekend ? 3.2 : 2.8
        const engagementVariance = Math.random() * 1.5 - 0.5
        const engagement = Math.max(1.5, baseEngagement + engagementVariance)

        const followers = Math.floor(baseFollowers + (29 - i) * 95 + growth)
        const reach = Math.floor(followers * (4.5 + Math.random() * 2)) // 4.5-6.5x followers
        const impressions = Math.floor(reach * (1.8 + Math.random() * 0.7)) // 1.8-2.5x reach

        analytics.push({
          date: date.toISOString().split("T")[0],
          followers: followers,
          engagement: Math.round(engagement * 10) / 10,
          reach: reach,
          impressions: impressions,
        })
      }

      // More realistic posts with actual Instagram usernames and content
      const postsData: Post[] = [
        {
          id: "1",
          date: "Dec 12",
          time: "6:30 PM",
          type: "Reel",
          content: "5-minute morning mobility routine that changed my life 🔥 Try this before your workout!",
          status: "scheduled",
          likes: 3247,
          comments: 189,
          shares: 156,
          engagement: 7.2,
        },
        {
          id: "2",
          date: "Dec 13",
          time: "7:15 AM",
          type: "Carousel",
          content: "Protein myths BUSTED! 💪 Swipe to see what the science actually says about protein timing",
          status: "draft",
          engagement: 5.8,
        },
        {
          id: "3",
          date: "Dec 14",
          time: "8:00 PM",
          type: "Story",
          content: "Behind the scenes: My actual pre-competition prep routine (not what you think!)",
          status: "idea",
        },
        {
          id: "4",
          date: "Dec 11",
          time: "6:45 PM",
          type: "Post",
          content: "Form check Friday! 📹 Here's how to nail the perfect deadlift every single time",
          status: "published",
          likes: 4156,
          comments: 267,
          shares: 198,
          engagement: 8.9,
        },
        {
          id: "5",
          date: "Dec 10",
          time: "7:30 AM",
          type: "Reel",
          content: "What I eat in a day as a natural athlete (2800 calories, macro breakdown included)",
          status: "published",
          likes: 5923,
          comments: 334,
          shares: 287,
          engagement: 12.4,
        },
        {
          id: "6",
          date: "Dec 9",
          time: "2:00 PM",
          type: "Carousel",
          content: "Home gym setup for under $500 💰 Everything you actually need (and what you don't)",
          status: "published",
          likes: 2876,
          comments: 145,
          shares: 234,
          engagement: 6.7,
        },
      ]

      // Content performance data with more realistic metrics
      const performance: ContentPerformance[] = [
        { type: "Reels", title: "Short-form Video", platform: "Instagram", engagement: 9.8, posts: 12, trend: "up", avgLikes: 4250, avgComments: 245 },
        { type: "Carousels", title: "Multi-image Posts", platform: "Instagram", engagement: 6.4, posts: 8, trend: "up", avgLikes: 2890, avgComments: 167 },
        { type: "Single Posts", title: "Photo Posts", platform: "Instagram", engagement: 4.2, posts: 15, trend: "down", avgLikes: 1950, avgComments: 89 },
        { type: "Stories", title: "Ephemeral Content", platform: "Instagram", engagement: 11.3, posts: 28, trend: "up", avgLikes: 0, avgComments: 67 },
      ]

      // Real brand opportunities with actual company names
      const brands: BrandOpportunity[] = [
        {
          id: "1",
          brand: "Gymshark",
          category: "Athletic Apparel",
          description: "Fitness apparel collaboration for new collection launch",
          budget: 10000,
          platform: "Instagram",
          estimatedPay: "$8,000 - $12,000",
          requirements: "2 Reels + 5 Stories + 1 YouTube Short",
          deadline: "Jan 15, 2025",
          status: "available",
        },
        {
          id: "2",
          brand: "Optimum Nutrition",
          category: "Sports Supplements",
          description: "Protein supplement campaign targeting fitness enthusiasts",
          budget: 7000,
          platform: "Instagram",
          estimatedPay: "$5,500 - $8,500",
          requirements: "1 Post + 3 Stories + Product Review Video",
          deadline: "Dec 28, 2024",
          status: "negotiating",
        },
        {
          id: "3",
          brand: "Nike Training",
          category: "Sportswear",
          description: "Training app promotion and workout content creation",
          budget: 15000,
          platform: "Instagram",
          estimatedPay: "$12,000 - $18,000",
          requirements: "3 Reels + 7 Stories + App Feature Demo",
          deadline: "Feb 5, 2025",
          status: "available",
        },
        {
          id: "4",
          brand: "MyFitnessPal",
          category: "Fitness Apps",
          description: "App tutorial and nutrition tracking content",
          budget: 5250,
          platform: "Instagram",
          estimatedPay: "$4,000 - $6,500",
          requirements: "2 Posts + 4 Stories + Tutorial Video",
          deadline: "Jan 20, 2025",
          status: "applied",
        },
        {
          id: "5",
          brand: "Lululemon",
          category: "Athletic Wear",
          description: "Athleisure fashion campaign for new collection",
          budget: 12500,
          platform: "Instagram",
          estimatedPay: "$10,000 - $15,000",
          requirements: "2 Reels + 6 Stories + Styling Guide",
          deadline: "Mar 1, 2025",
          status: "available",
        },
      ]

      // More sophisticated content suggestions with trending hashtags
      const suggestions: ContentSuggestion[] = [
        {
          id: "1",
          day: "Thursday",
          time: "6:30 PM",
          caption:
            "New Year, new gains! 💪 This 15-minute HIIT workout will kickstart your 2025 fitness journey. Save this post and tag someone who needs to see it! 🔥",
          hashtags:
            "#NewYearFitness #HIITWorkout #FitnessMotivation #2025Goals #WorkoutAtHome #FitnessTips #HealthyLifestyle #GymLife #TrainingTips #FitnessJourney",
          confidence: 94,
          postType: "reel",
        },
        {
          id: "2",
          day: "Friday",
          time: "7:15 AM",
          caption:
            "Friday fuel! ⚡ Here's my go-to pre-workout smoothie that gives me energy for hours. Recipe in comments! 🍓🥤",
          hashtags:
            "#FridayFuel #PreWorkoutNutrition #HealthyRecipes #SmoothieRecipe #FitnessNutrition #HealthyEating #MorningFuel #AthleteNutrition #CleanEating #WholeFoods",
          confidence: 87,
          postType: "post",
        },
        {
          id: "3",
          day: "Saturday",
          time: "10:30 AM",
          caption:
            "Weekend warrior mode: ACTIVATED! 🚀 Sharing my complete Saturday strength training routine. Swipe for exercise breakdowns and form tips! 💯",
          hashtags:
            "#WeekendWarrior #StrengthTraining #SaturdayWorkout #FitnessRoutine #GymMotivation #LiftHeavy #ProgressNotPerfection #FitnessGoals #TrainingDay #MuscleBuilding",
          confidence: 91,
          postType: "carousel",
        },
        {
          id: "4",
          day: "Sunday",
          time: "8:00 PM",
          caption:
            "Sunday reset vibes ✨ Recovery is just as important as training. Here's my complete recovery routine for optimal gains 🧘‍♀️",
          hashtags:
            "#SundayReset #RecoveryDay #RestAndRecover #SelfCare #FitnessRecovery #Mindfulness #HealthyLifestyle #Balance #Wellness #RecoveryTips",
          confidence: 89,
          postType: "reel",
        },
        {
          id: "5",
          day: "Monday",
          time: "6:00 AM",
          caption:
            "Monday motivation incoming! 🔥 Starting the week strong with this energizing morning routine. Who's joining me? 💪",
          hashtags:
            "#MondayMotivation #MorningRoutine #StartStrong #FitnessMotivation #HealthyHabits #MorningWorkout #PositiveVibes #GoalGetter #FitnessJourney #NewWeekNewGoals",
          confidence: 92,
          postType: "story",
        },
      ]

      setAnalyticsData(analytics)
      setPosts(postsData)
      setContentPerformance(performance)
      setBrandOpportunities(brands)
      setContentSuggestions(suggestions)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const updatePostStatus = (postId: string, newStatus: Post["status"]) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, status: newStatus } : post)))
  }

  const addNewPost = (post: Omit<Post, "id">) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
    }
    setPosts((prev) => [...prev, newPost])
  }

  const getCurrentWeekGrowth = () => {
    if (analyticsData.length < 7) return 0
    const lastWeek = analyticsData.slice(-7)
    const firstDay = lastWeek[0]?.followers || 0
    const lastDay = lastWeek[lastWeek.length - 1]?.followers || 0
    return ((lastDay - firstDay) / firstDay) * 100
  }

  const getAverageEngagement = () => {
    if (analyticsData.length === 0) return 0
    const lastWeek = analyticsData.slice(-7)
    const avgEngagement = lastWeek.reduce((sum, day) => sum + day.engagement, 0) / lastWeek.length
    return Math.round(avgEngagement * 10) / 10
  }

  return {
    isLoading,
    analyticsData,
    posts,
    contentPerformance,
    brandOpportunities,
    contentSuggestions,
    updatePostStatus,
    addNewPost,
    getCurrentWeekGrowth,
    getAverageEngagement,
    followerCount: analyticsData[analyticsData.length - 1]?.followers || 50247,
  }
}
