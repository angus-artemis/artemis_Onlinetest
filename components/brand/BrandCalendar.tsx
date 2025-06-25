"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Plus, CalendarIcon, Clock, MoreHorizontal } from "lucide-react"

export function BrandCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Mock data
  const campaigns = [
    {
      id: "1",
      name: "Summer Collection Launch",
      date: "Dec 15",
      time: "All day",
      status: "scheduled",
      creators: 5,
    },
    {
      id: "2",
      name: "Fitness Challenge Kickoff",
      date: "Dec 18",
      time: "10:00 AM",
      status: "planning",
      creators: 3,
    },
    {
      id: "3",
      name: "Product Review Campaign",
      date: "Dec 20",
      time: "2:00 PM",
      status: "confirmed",
      creators: 7,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Campaign Calendar</CardTitle>
              <p className="text-sm text-gray-600">Schedule and manage your campaigns</p>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500">
              <Plus className="w-4 h-4 mr-1" />
              New Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border-0" />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Upcoming Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{campaign.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{campaign.date}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{campaign.time}</span>
                    </div>
                    <span>•</span>
                    <span>{campaign.creators} creators</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
