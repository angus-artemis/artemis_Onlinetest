"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  Plus,
  Settings,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Crown,
  Shield,
  Eye,
  Edit,
} from "lucide-react"

export function TeamCollaboration() {
  const [selectedRole, setSelectedRole] = useState("editor")

  const teamMembers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "owner",
      avatar: "AJ",
      status: "active",
      lastActive: "2 minutes ago",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@agency.com",
      role: "admin",
      avatar: "SC",
      status: "active",
      lastActive: "1 hour ago",
      permissions: ["analytics", "content", "reports"],
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@creative.co",
      role: "editor",
      avatar: "MR",
      status: "pending",
      lastActive: "Never",
      permissions: ["content", "calendar"],
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@brand.com",
      role: "viewer",
      avatar: "EW",
      status: "active",
      lastActive: "3 days ago",
      permissions: ["analytics"],
    },
  ]

  const roles = [
    {
      id: "owner",
      name: "Owner",
      description: "Full access to all features and settings",
      icon: Crown,
      permissions: ["All permissions", "Billing management", "Team management"],
      color: "text-yellow-600",
    },
    {
      id: "admin",
      name: "Admin",
      description: "Manage content and team members",
      icon: Shield,
      permissions: ["Content management", "Analytics", "Team management", "Reports"],
      color: "text-purple-600",
    },
    {
      id: "editor",
      name: "Editor",
      description: "Create and edit content",
      icon: Edit,
      permissions: ["Content creation", "Calendar access", "Basic analytics"],
      color: "text-blue-600",
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "View analytics and reports only",
      icon: Eye,
      permissions: ["View analytics", "View reports"],
      color: "text-green-600",
    },
  ]

  const pendingApprovals = [
    {
      id: "1",
      type: "content",
      title: "New workout routine post",
      author: "Mike Rodriguez",
      created: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      type: "schedule",
      title: "Schedule change for Friday post",
      author: "Sarah Chen",
      created: "1 day ago",
      status: "approved",
    },
    {
      id: "3",
      type: "brand",
      title: "Nike partnership proposal",
      author: "Emma Wilson",
      created: "3 days ago",
      status: "pending",
    },
  ]

  const activityFeed = [
    {
      id: "1",
      user: "Sarah Chen",
      action: "created a new post",
      target: "Morning Motivation Reel",
      time: "2 hours ago",
      type: "content",
    },
    {
      id: "2",
      user: "Mike Rodriguez",
      action: "updated the content calendar",
      target: "Week of Dec 15",
      time: "4 hours ago",
      type: "calendar",
    },
    {
      id: "3",
      user: "Emma Wilson",
      action: "generated analytics report",
      target: "November Performance",
      time: "1 day ago",
      type: "report",
    },
    {
      id: "4",
      user: "Alex Johnson",
      action: "approved brand partnership",
      target: "Gymshark Collaboration",
      time: "2 days ago",
      type: "approval",
    },
  ]

  const getRoleIcon = (role: string) => {
    const roleConfig = roles.find((r) => r.id === role)
    return roleConfig ? roleConfig.icon : Users
  }

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find((r) => r.id === role)
    return roleConfig ? roleConfig.color : "text-gray-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Team Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Team Members
              </CardTitle>
              <p className="text-sm text-gray-600">Manage your team and permissions</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <Input placeholder="colleague@company.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.slice(1).map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            <div className="flex items-center gap-2">
                              <role.icon className={`w-4 h-4 ${role.color}`} />
                              <span>{role.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">
                      {roles.find((r) => r.id === selectedRole)?.name} Permissions:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {roles
                        .find((r) => r.id === selectedRole)
                        ?.permissions.map((permission, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            {permission}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <Button className="w-full">Send Invitation</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => {
            const RoleIcon = getRoleIcon(member.role)
            return (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{member.name}</p>
                      <RoleIcon className={`w-4 h-4 ${getRoleColor(member.role)}`} />
                    </div>
                    <p className="text-xs text-gray-500">{member.email}</p>
                    <p className="text-xs text-gray-400">Last active: {member.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  {member.role !== "owner" && (
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            Pending Approvals
          </CardTitle>
          <p className="text-sm text-gray-600">Items waiting for your review</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                {getApprovalStatusIcon(item.status)}
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    by {item.author} • {item.created}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "pending" && (
                  <>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                  </>
                )}
                {item.status === "approved" && <Badge className="bg-green-100 text-green-800">Approved</Badge>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-500" />
            Team Activity
          </CardTitle>
          <p className="text-sm text-gray-600">Recent team actions and updates</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {activityFeed.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {activity.type}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <p className="text-sm text-gray-600">Understand what each role can do</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="p-4 border rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <role.icon className={`w-5 h-5 ${role.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{role.name}</h4>
                  <p className="text-xs text-gray-600">{role.description}</p>
                </div>
              </div>
              <div className="space-y-1">
                {role.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
