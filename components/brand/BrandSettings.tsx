import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronRight, Bell, CreditCard, Users, Shield, HelpCircle, LogOut } from "lucide-react"

export function BrandSettings() {
  return (
    <div className="p-4 space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Brand Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input id="brand-name" defaultValue="SportFit Apparel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand-website">Website</Label>
            <Input id="brand-website" defaultValue="https://sportfitapparel.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand-description">Description</Label>
            <Textarea
              id="brand-description"
              defaultValue="Premium athletic wear for fitness enthusiasts and professional athletes."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand-industry">Industry</Label>
            <Input id="brand-industry" defaultValue="Sportswear & Athletic Apparel" />
          </div>
          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Notifications</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Billing & Subscription</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Team Members</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Privacy & Security</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Help & Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="text-sm text-red-600">Sign Out</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex-1">
              Email notifications
            </Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="campaign-alerts" className="flex-1">
              Campaign performance alerts
            </Label>
            <Switch id="campaign-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="creator-recommendations" className="flex-1">
              Creator recommendations
            </Label>
            <Switch id="creator-recommendations" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails" className="flex-1">
              Marketing emails
            </Label>
            <Switch id="marketing-emails" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
