"use client"
import { motion } from "framer-motion"
import { User, Briefcase } from "lucide-react"

interface PerspectiveToggleProps {
  perspective: "creator" | "brand"
  onChange: (perspective: "creator" | "brand") => void
}

export function PerspectiveToggle({ perspective, onChange }: PerspectiveToggleProps) {
  return (
    <div className="flex items-center justify-center w-full py-2 bg-white border-b">
      <div className="relative flex items-center bg-gray-100 rounded-full p-1 w-64">
        <motion.div
          className="absolute h-8 rounded-full bg-white shadow-md z-0"
          initial={false}
          animate={{
            x: perspective === "creator" ? 0 : "100%",
            width: "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <button
          onClick={() => onChange("creator")}
          className={`relative z-10 flex items-center justify-center gap-2 w-1/2 h-8 rounded-full text-sm font-medium transition-colors ${
            perspective === "creator" ? "text-purple-700" : "text-gray-500"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Creator</span>
        </button>

        <button
          onClick={() => onChange("brand")}
          className={`relative z-10 flex items-center justify-center gap-2 w-1/2 h-8 rounded-full text-sm font-medium transition-colors ${
            perspective === "brand" ? "text-blue-700" : "text-gray-500"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Brand</span>
        </button>
      </div>
    </div>
  )
}
