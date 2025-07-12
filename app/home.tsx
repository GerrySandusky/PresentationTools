"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Star,
  FileText,
  Presentation,
  Video,
  BookOpen,
} from "lucide-react"
import Image from "next/image"

interface HomePageProps {
  onStartBuilder: () => void
}

export default function HomePage({ onStartBuilder }: HomePageProps) {
  const steps = [
    { number: 1, title: "Objectives", description: "Define your goals" },
    { number: 2, title: "Core-4", description: "Your brand identity" },
    { number: 3, title: "Audience", description: "Know your listeners" },
    { number: 4, title: "Situation", description: "Time & setting" },
    { number: 5, title: "Big Idea", description: "Your central message" },
    { number: 6, title: "Key Points", description: "Main topics (max 3)" },
    { number: 7, title: "Sub Points", description: "Supporting details" },
    { number: 8, title: "Stories", description: "Engaging narratives" },
    { number: 9, title: "Open & Close", description: "Strong bookends" },
    { number: 10, title: "Multi-Media", description: "Visual support" },
  ]

  const benefits = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Complete Presentation Outline",
      description: "A structured outline you can use as speaker notes during your presentation",
    },
    {
      icon: <Presentation className="h-6 w-6" />,
      title: "PowerPoint Deck Structure",
      description: "Recommended slide structure and content suggestions for maximum impact",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Multimedia Recommendations",
      description: "Strategic suggestions for both high-tech and low-tech presentation elements",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Compelling Stories",
      description: "Developed stories with clear placement guidance to engage your audience",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Powerful Opening & Closing",
      description: "Crafted opening and closing segments that establish tone and drive action",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Audience-Focused Content",
      description: "Content specifically tailored to your audience and presentation situation",
    },
  ]

  const confluenceAreas = [
    {
      title: "Confidence",
      description: "Build the courage and competence to present with authority",
      icon: <Star className="h-8 w-8" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Content",
      description: "Create useful, insightful, and influential presentation material",
      icon: <Lightbulb className="h-8 w-8" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Performance",
      description: "Master the delivery skills that captivate and persuade audiences",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-purple-50 text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white text-[#0F1B2B]">
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/presentation-transformation-logo-large.png"
                alt="Presentation Transformation"
                width={600}
                height={180}
                className="mx-auto h-24 sm:h-32 w-auto"
                priority
              />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              <span className="text-[#55B5C2]">Transform</span> Your
              <br />
              Presentations
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-[#0F1B2B] max-w-3xl mx-auto leading-relaxed">
              Stop delivering boring presentations. Use our proven In-10 Approach to create presentations that engage,
              influence, and inspire action.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={onStartBuilder}
                size="lg"
                className="bg-[#022136] text-white hover:bg-[#1a2332] text-lg px-8 py-4 h-auto"
              >
                Start Building Your Presentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Confluence Method */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">The Confluence Method</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your influence as a leader and communicator is at the confluence of these three critical areas. To
              maximize your impact, you need to develop all three.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {confluenceAreas.map((area, index) => (
              <Card key={index} className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${area.color} flex items-center justify-center mx-auto mb-4`}>
                    {area.icon}
                  </div>
                  <CardTitle className="text-2xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-[#022136] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Presentations?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered the power of the In-10 Approach. Start building your
            next great presentation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onStartBuilder}
              size="lg"
              className="bg-[#022136] hover:bg-[#1a2332] text-lg px-8 py-4 h-auto"
            >
              Start Your Presentation Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 h-auto bg-transparent"
            >
              Learn More About Our Method
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="/presentation-transformation-logo-large.png"
                alt="Presentation Transformation"
                width={300}
                height={90}
                className="h-12 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">© 2024 The Sandusky Group, LLC. All rights reserved.</p>
              <p className="text-gray-400">Transform your influence through better presentations.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
