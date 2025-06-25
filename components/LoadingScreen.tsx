import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto relative">
          <img
            src="/images/artemis-logo.png"
            alt="Artemis Logo"
            className="w-full h-full object-contain animate-pulse rounded-full shadow-lg"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Syncing your data...</h2>
          <p className="text-gray-600">Artemis is analyzing your latest Instagram insights</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          <span className="text-sm text-gray-500">Fetching from Instagram API...</span>
        </div>
      </div>
    </div>
  )
}
