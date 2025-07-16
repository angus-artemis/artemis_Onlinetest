"use client";

import { useState } from "react";
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Sticky CTA for mobile
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Show sticky CTA on scroll for mobile
  // (Optional: can be enhanced with useEffect for scroll detection)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    // TODO: Integrate with backend or mailing list provider
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex flex-col">
      {/* Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Image src="/images/artemis-logo.png" alt="Artemis Logo" width={36} height={36} className="rounded-full" />
          <span className="font-bold text-xl text-purple-700 tracking-tight">Artemis</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="hover:text-purple-600 transition">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center relative">
        <div className="flex justify-center mb-6">
          <Image src="/images/artemis-logo.png" alt="Artemis Logo" width={72} height={72} className="rounded-full shadow-lg" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Grow Your Influence. Close Brand Deals. All From Your Phone.
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Artemis gives creators AI-powered post ideas and scheduling, while brands discover and book talent fast — no emails, no guesswork.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfyK7IOedrq5qnh9HQb1oY4Y1d8bTynLP5kbS0ZP24OdjWDuA/viewform?usp=sharing&ouid=107373677233444056264"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 mb-2 sticky-cta"
        >
          Join the Waitlist
        </a>
      </section>

      {/* Dual Audiences Section (REPLACED) */}
      <section className="py-12 px-4 bg-white/80">
        <h2 className="text-3xl font-bold text-center mb-8">For Creators & Brands</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-purple-50 rounded-xl p-8 shadow text-left">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">For Creators</h3>
            <ul className="space-y-4 text-gray-700 text-base">
              <li>🎯 Get brand deals sent directly to your inbox. No cold DMs, no wasted time</li>
              <li>💸 Get paid easily, negotiate, accept, and receive funds all in one place</li>
              <li>📈 Real-time Instagram insights help you grow faster and post smarter</li>
              <li>🗓️ Plan a month of content with our smart calendar and post-scheduling tools</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-8 shadow text-left">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">For Brands</h3>
            <ul className="space-y-4 text-gray-700 text-base">
              <li>🤝 Instantly connect with top Brisbane-based creators in sport, lifestyle & more</li>
              <li>📊 Track campaign performance in real-time with Instagram-integrated analytics</li>
              <li>🧠 Let Artemis recommend the best creators based on your goals and budget</li>
              <li>📥 Run everything in one place, briefs, approvals, payments, and engagement reporting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-12 px-4 bg-white/90">
        <h2 className="text-3xl font-bold text-center mb-10">What You Get With Artemis</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold mb-1">AI Post Suggestions</h3>
            <p className="text-gray-600 text-sm">Smart, tailored ideas for every post</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold mb-1">Smart Scheduler</h3>
            <p className="text-gray-600 text-sm">Plan and automate your content</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold mb-1">Growth Tracking</h3>
            <p className="text-gray-600 text-sm">See what's working and grow faster</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Campaign Builder</h3>
            <p className="text-gray-600 text-sm">Launch and manage influencer campaigns</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🧲</div>
            <h3 className="font-semibold mb-1">Creator Discovery</h3>
            <p className="text-gray-600 text-sm">Find the perfect talent for your brand</p>
          </div>
          <div>
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold mb-1">In-App Deal Chat</h3>
            <p className="text-gray-600 text-sm">Negotiate and close deals in one place</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="font-semibold mb-1">Secure, Mobile-First Experience</h3>
            <p className="text-gray-600 text-sm">Your data and deals are always safe</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📲</div>
            <h3 className="font-semibold mb-1">Real-Time Notifications</h3>
            <p className="text-gray-600 text-sm">Never miss an opportunity</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-semibold mb-1">Simple, Fast, Beautiful</h3>
            <p className="text-gray-600 text-sm">A joy to use, on any device</p>
          </div>
        </div>
      </section>

      {/* Vision / Social Proof Section (QUOTE UPDATED) */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-200 to-blue-100">
        <blockquote className="max-w-3xl mx-auto text-center text-2xl font-semibold text-gray-800 mb-4">
          “We built Artemis because creators and brands deserve a better way to work together. One that’s smart, local, and actually built for how people use social media today.”
        </blockquote>
        <p className="text-center text-gray-600 mb-2">Built by creators, for the people actually making content move.</p>
      </section>

      {/* Final CTA Section – Urgency Play */}
      <section className="py-12 px-4 bg-white/95">
        <h2 className="text-3xl font-bold text-center mb-4">We're Launching With Just 100 Creators and 50 Brands.</h2>
        <p className="text-lg text-center text-gray-700 mb-6 max-w-2xl mx-auto">
          Want in early? Join the waitlist to access Artemis before public release. Shape how the future of brand deals will work — on your terms.
        </p>
        <div className="flex justify-center mb-2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfyK7IOedrq5qnh9HQb1oY4Y1d8bTynLP5kbS0ZP24OdjWDuA/viewform?usp=sharing&ouid=107373677233444056264"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105"
          >
            👉 Join the Waitlist Now
          </a>
        </div>
        <p className="text-center text-xs text-gray-500">No spam. Just early access and the first look at a better way to grow.</p>
      </section>

      {/* Footer (SOCIAL LINKS REMOVED) */}
      <footer className="py-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Image src="/images/artemis-logo.png" alt="Artemis Logo" width={32} height={32} className="rounded-full" />
            <span className="font-bold text-lg tracking-tight">© 2025 Artemis</span>
          </div>
          <span className="text-xs flex items-center justify-center md:justify-end gap-1">Built in Australia <span role="img" aria-label="Australia">🇦🇺</span></span>
        </div>
      </footer>

      {/* Sticky CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg py-3">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfyK7IOedrq5qnh9HQb1oY4Y1d8bTynLP5kbS0ZP24OdjWDuA/viewform?usp=sharing&ouid=107373677233444056264"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-bold text-lg px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:from-purple-800 hover:to-blue-800 transition"
        >
          Join the Waitlist
        </a>
      </div>
    </main>
  );
}
