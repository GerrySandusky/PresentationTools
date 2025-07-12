"use client"

import { useState } from "react"
import HomePage from "./home"
import PresentationBuilder from "./presentation-builder"

export default function App() {
  const [showBuilder, setShowBuilder] = useState(false)

  if (showBuilder) {
    return <PresentationBuilder onBackToHome={() => setShowBuilder(false)} />
  }

  return <HomePage onStartBuilder={() => setShowBuilder(true)} />
}
