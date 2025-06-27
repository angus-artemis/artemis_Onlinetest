"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import InfluencerDashboard from "@/components/InfluencerDashboard";

export default function HomePage() {
  // Temporarily show the original dashboard without authentication
  return <InfluencerDashboard />;
}
