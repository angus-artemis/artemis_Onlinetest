"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Target, Users, Share2, Gift, Medal, Crown, Zap, Star, Flame } from "lucide-react"

export function ViralFeatures() {
  const [selectedChallenge, setSelectedChallenge] = useState("growth-sprint")

  const achievements = [
    {
      id: "first-1k",
      title: "First 1K Followers",
      description: "Reached 1,000 followers",
      icon: Users,
      unlocked: true,
      rarity: "common",
      points: 100,
    },
    {
      id: "engagement-master",
      title: "Engagement Master",
      description: "Achieved 10%+ engagement rate",
      icon: Zap,
      unlocked: true,
      rarity: "rare",
      points: 250,
    },
    {
      id: "viral-post",
      title: "Viral Sensation",
      description: "Post reached 100K+ impressions",
      icon: Flame,
      unlocked: false,
      rarity: "legendary",
      points: 500,
    },
    {
      id: "consistency-king",
      title: "Consistency King",
      description: "Posted daily for 30 days",
      icon: Target,
      unlocked: true,
      rarity: "uncommon",
      points: 150,
    },
    {
      id: "brand-partner",
      title: "Brand Partner",
      description: "Completed first brand collaboration",
      icon: Crown,
      unlocked: false,
      rarity: "rare",
      points: 300,
    },
  ]

  const leaderboard = [
    {
      rank: 1,
      name: "Sarah Chen",
      handle: "@sarahfitness",
      points: 2450,
      growth: "+127%",
      avatar: "SC",
      badge: "👑",
    },
    {
      rank: 2,
      name: "Mike Rodriguez",
      handle: "@miketrains",
      points: 2180,
      growth: "+98%",
      avatar: "MR",
      badge: "🥈",
    },
    {
      rank: 3,
      name: "Glenn Chen",
      handle: "@glennchen_fitness",
      points: 1950,
      growth: "+89%",
      avatar: "AJ",
      badge: "🥉",
      isCurrentUser: true,
    },
    {
      rank: 4,
      name: "Emma Wilson",
      handle: "@emmawellness",
      points: 1720,
      growth: "+76%",
      avatar: "EW",
      badge: "",
    },
    {
      rank: 5,
      name: "David Kim",
      handle: "@davidlifts",
      points: 1580,
      growth: "+65%",
      avatar: "DK",
      badge: "",
    },
  ]

  const challenges = [
    {
      id: "growth-sprint",
      title: "30-Day Growth Sprint",
      description: "Gain 1,000 new followers in 30 days",
      progress: 67,
      target: 1000,
      current: 670,
      timeLeft: "12 days left",
      participants: 1247,
      reward: "Exclusive Growth Masterclass",
      difficulty: "Medium",
    },
    {
      id: "engagement-boost",
      title: "Engagement Booster",
      description: "Achieve 15% average engagement rate",
      progress: 83,
      target: 15,
      current: 12.4,
      timeLeft: "5 days left",
      participants: 892,
      reward: "Premium Analytics Access",
      difficulty: "Hard",
    },
    {
      id: "content-creator",
      title: "Content Creator Challenge",
      description: "Post 50 pieces of content this month",
      progress: 44,
      target: 50,
      current: 22,
      timeLeft: "18 days left",
      participants: 2156,
      reward: "Brand Partnership Opportunities",
      difficulty: "Easy",
    },
  ]

  const shareableStats = [
    {
      metric: "Follower Growth",
      value: "+127%",
      period: "This Month",
      visual: "📈",
      shareText: "Just hit +127% follower growth this month with @ArtemisApp! 🚀 #SocialMediaGrowth",
    },
    {
      metric: "Engagement Rate",
      value: "12.4%",
      period: "Average",
      visual: "💫",
      shareText: "Maintaining a 12.4% engagement rate thanks to @ArtemisApp's AI insights! 💪 #ContentCreator",
    },
    {
      metric: "Top Post",
      value: "156K",
      period: "Impressions",
      visual: "🔥",
      shareText: "My latest post hit 156K impressions! Thanks to @ArtemisApp for the perfect timing! 🎯 #ViralContent",
    },
  ]

  const referralProgram = {
    code: "GLENN2025",
    referrals: 8,
    target: 10,
    reward: "Free Pro subscription for 3 months",
    earnings: 240,
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700"
      case "uncommon":
        return "bg-green-100 text-green-700"
      case "rare":
        return "bg-blue-100 text-blue-700"
      case "legendary":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleShare = (stat: (typeof shareableStats)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: "My Artemis Growth Stats",
        text: stat.shareText,
        url: "https://artemis.app",
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(stat.shareText + " https://artemis.app")
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Achievement Showcase */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Your Achievements
          </CardTitle>
          <p className="text-sm text-gray-600">Unlock badges as you grow your social media presence</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-xl border transition-all ${
                  achievement.unlocked
                    ? "border-yellow-200 bg-white shadow-sm"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? "bg-yellow-100" : "bg-gray-200"
                    }`}
                  >
                    <achievement.icon
                      className={`w-4 h-4 ${achievement.unlocked ? "text-yellow-600" : "text-gray-500"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-xs">{achievement.title}</h4>
                    <Badge className={`${getRarityColor(achievement.rarity)} text-xs`}>{achievement.rarity}</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">+{achievement.points} pts</span>
                  {achievement.unlocked && <Star className="w-3 h-3 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Total Achievement Points</span>
              <span className="text-lg font-bold text-yellow-600">500</span>
            </div>
            <Progress value={65} className="h-2 mb-2" />
            <p className="text-xs text-gray-600">Next reward at 750 points</p>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-purple-600" />
            Growth Leaderboard
          </CardTitle>
          <p className="text-sm text-gray-600">See how you rank against other creators this month</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                user.isCurrentUser
                  ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg w-6">{user.badge || user.rank}</span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{user.name}</p>
                  {user.isCurrentUser && <Badge className="bg-purple-100 text-purple-700">You</Badge>}
                </div>
                <p className="text-xs text-gray-500">{user.handle}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{user.points} pts</p>
                <p className="text-xs text-green-600">{user.growth}</p>
              </div>
            </div>
          ))}

          <div className="text-center pt-2">
            <Button variant="outline" size="sm">
              View Full Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Active Challenges
          </CardTitle>
          <p className="text-sm text-gray-600">Join challenges to boost your growth and win rewards</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-xl border transition-colors ${
                selectedChallenge === challenge.id
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-sm">{challenge.title}</h4>
                  <p className="text-xs text-gray-600">{challenge.description}</p>
                </div>
                <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {challenge.current}/{challenge.target}
                  </span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                <div>
                  <p className="text-gray-500">Time Left</p>
                  <p className="font-medium">{challenge.timeLeft}</p>
                </div>
                <div>
                  <p className="text-gray-500">Participants</p>
                  <p className="font-medium">{challenge.participants.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-sm">Reward: {challenge.reward}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shareable Stats */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            Share Your Success
          </CardTitle>
          <p className="text-sm text-gray-600">Show off your growth achievements on social media</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {shareableStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.visual}</span>
                <div>
                  <p className="font-medium text-sm">{stat.metric}</p>
                  <p className="text-xs text-gray-500">{stat.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{stat.value}</span>
                <Button size="sm" variant="outline" onClick={() => handleShare(stat)}>
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Referral Program */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Referral Program
          </CardTitle>
          <p className="text-sm text-gray-600">Invite friends and earn rewards together</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-1">Your Referral Code</p>
              <div className="flex items-center justify-center gap-2">
                <code className="bg-gray-100 px-3 py-1 rounded font-mono text-lg">{referralProgram.code}</code>
                <Button size="sm" variant="outline">
                  Copy
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Referrals</span>
                <span>
                  {referralProgram.referrals}/{referralProgram.target}
                </span>
              </div>
              <Progress value={(referralProgram.referrals / referralProgram.target) * 100} className="h-2" />
              <p className="text-xs text-gray-600 text-center">
                {referralProgram.target - referralProgram.referrals} more referrals to unlock: {referralProgram.reward}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-xl border border-green-200">
              <p className="text-2xl font-bold text-green-600">${referralProgram.earnings}</p>
              <p className="text-xs text-gray-600">Total Earned</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-green-200">
              <p className="text-2xl font-bold text-green-600">{referralProgram.referrals}</p>
              <p className="text-xs text-gray-600">Friends Joined</p>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
            <Share2 className="w-4 h-4 mr-2" />
            Invite Friends
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
