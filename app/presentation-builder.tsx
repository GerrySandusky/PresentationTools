"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Download, Home, Plus, X, FileText, File } from "lucide-react"
import Image from "next/image"

interface PresentationData {
  title: string
  objectives: string[]
  core4: string[]
  audience: {
    age: string
    gender: string
    race: string
    demographics: string
    geography: string
    organization: string
    jobTitle: string
    hobbies: string
    beliefs: string
    other: string
  }
  situation: {
    time: string
    setting: string
  }
  bigIdea: string
  keyPoints: string[]
  subPoints: {
    [key: number]: string[]
  }
  stories: Array<{
    name: string
    scene: string
    problem: string
    conflict: string
    stakes: string
    hero: string
    decision: string
    resolution: string
    insight: string
    placement: string
  }>
  open: string
  close: {
    recap: string
    callToAction: string
    dropMic: string
  }
  multimedia: {
    highTech: string[]
    lowTech: string[]
  }
  outlineMultimedia: {
    [key: string]: {
      highTech: string
      lowTech: string
    }
  }
}

interface PresentationBuilderProps {
  onBackToHome: () => void
}

const steps = [
  { id: 1, title: "Objectives", description: "Define what you want to achieve" },
  { id: 2, title: "Core-4", description: "Your brand values and identity" },
  { id: 3, title: "Audience", description: "Know who you're presenting to" },
  { id: 4, title: "Situation", description: "Time and setting considerations" },
  { id: 5, title: "Big Idea", description: "Your central message" },
  { id: 6, title: "Key Points", description: "Main topics (up to 3)" },
  { id: 7, title: "Sub Points", description: "Supporting details" },
  { id: 8, title: "Stories", description: "Engaging narratives" },
  { id: 9, title: "Open & Close", description: "Strong beginning and ending" },
  { id: 10, title: "Outline", description: "Review and plan multimedia" },
  { id: 11, title: "Multi-Media", description: "Visual and interactive elements" },
]

export default function PresentationBuilder({ onBackToHome }: PresentationBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [presentationData, setPresentationData] = useState<PresentationData>({
    title: "",
    objectives: ["", ""],
    core4: ["", "", "", ""],
    audience: {
      age: "",
      gender: "",
      race: "",
      demographics: "",
      geography: "",
      organization: "",
      jobTitle: "",
      hobbies: "",
      beliefs: "",
      other: "",
    },
    situation: {
      time: "",
      setting: "",
    },
    bigIdea: "",
    keyPoints: ["", "", ""],
    subPoints: {
      0: ["", "", ""],
      1: ["", "", ""],
      2: ["", "", ""],
    },
    stories: [],
    open: "",
    close: {
      recap: "",
      callToAction: "",
      dropMic: "",
    },
    multimedia: {
      highTech: [""],
      lowTech: [""],
    },
    outlineMultimedia: {},
  })

  const updatePresentationData = (field: string, value: any) => {
    setPresentationData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedData = (parent: string, field: string, value: any) => {
    setPresentationData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof PresentationData] as any),
        [field]: value,
      },
    }))
  }

  const isStepComplete = (stepIndex: number) => {
    try {
      switch (stepIndex) {
        case 0:
          return presentationData.objectives.some((obj) => obj.trim() !== "")
        case 1:
          return presentationData.core4.some((core) => core.trim() !== "")
        case 2:
          return Object.values(presentationData.audience).some((val) => val.trim() !== "")
        case 3:
          return presentationData.situation.time !== "" || presentationData.situation.setting !== ""
        case 4:
          return presentationData.bigIdea.trim() !== ""
        case 5:
          return presentationData.keyPoints.some((kp) => kp.trim() !== "")
        case 6:
          return Object.values(presentationData.subPoints).some((sps) => sps.some((sp) => sp.trim() !== ""))
        case 7:
          return presentationData.stories.length > 0
        case 8:
          return presentationData.open.trim() !== "" || presentationData.close.recap.trim() !== ""
        case 9:
          return true // Outline step is always considered complete once reached
        case 10:
          return (
            presentationData.multimedia.highTech.some((item) => item.trim() !== "") ||
            presentationData.multimedia.lowTech.some((item) => item.trim() !== "")
          )
        default:
          return false
      }
    } catch (error) {
      console.error("Error checking step completion:", error)
      return false
    }
  }

  const addStory = () => {
    const newStories = [
      ...presentationData.stories,
      {
        name: "",
        scene: "",
        problem: "",
        conflict: "",
        stakes: "",
        hero: "",
        decision: "",
        resolution: "",
        insight: "",
        placement: "",
      },
    ]
    updatePresentationData("stories", newStories)
  }

  const removeStory = (index: number) => {
    const newStories = presentationData.stories.filter((_, i) => i !== index)
    updatePresentationData("stories", newStories)
  }

  const updateStory = (index: number, field: string, value: string) => {
    const newStories = [...presentationData.stories]
    newStories[index] = { ...newStories[index], [field]: value }
    updatePresentationData("stories", newStories)
  }

  const addMultimediaItem = (type: "highTech" | "lowTech") => {
    const newItems = [...presentationData.multimedia[type], ""]
    updateNestedData("multimedia", type, newItems)
  }

  const removeMultimediaItem = (type: "highTech" | "lowTech", index: number) => {
    const newItems = presentationData.multimedia[type].filter((_, i) => i !== index)
    updateNestedData("multimedia", type, newItems)
  }

  const updateMultimediaItem = (type: "highTech" | "lowTech", index: number, value: string) => {
    const newItems = [...presentationData.multimedia[type]]
    newItems[index] = value
    updateNestedData("multimedia", type, newItems)
  }

  const updateOutlineMultimedia = (itemKey: string, type: "highTech" | "lowTech", value: string) => {
    setPresentationData((prev) => ({
      ...prev,
      outlineMultimedia: {
        ...prev.outlineMultimedia,
        [itemKey]: {
          ...prev.outlineMultimedia[itemKey],
          [type]: value,
        },
      },
    }))
  }

  const generateOutlineContent = () => {
    let content = `PRESENTATION OUTLINE\n\n`
    content += `Title: ${presentationData.title || "[Add your title]"}\n\n`

    content += `OPEN:\n${presentationData.open || "[Add your opening]"}\n\n`

    // Add opening stories
    const openingStories = presentationData.stories.filter((story) => story.placement === "Opening")
    openingStories.forEach((story) => {
      content += `STORY: ${story.name}\n`
    })
    if (openingStories.length > 0) content += `\n`

    // Add key points with sub points and stories
    presentationData.keyPoints
      .filter((kp) => kp.trim() !== "")
      .forEach((keyPoint, index) => {
        content += `KP${index + 1}: ${keyPoint}\n`

        // Add stories for key point
        const keyPointStories = presentationData.stories.filter((story) => story.placement === `Key Point ${index + 1}`)
        keyPointStories.forEach((story) => {
          content += `STORY: ${story.name}\n`
        })

        // Add sub points
        presentationData.subPoints[index]
          ?.filter((sp) => sp.trim() !== "")
          .forEach((subPoint, subIndex) => {
            content += `  SP ${subIndex + 1}: ${subPoint}\n`

            // Add stories for sub points
            const subPointStories = presentationData.stories.filter(
              (story) => story.placement === `Key Point ${index + 1} - Sub Point ${subIndex + 1}`,
            )
            subPointStories.forEach((story) => {
              content += `    STORY: ${story.name}\n`
            })
          })
        content += `\n`
      })

    content += `Q&A\n\n`

    content += `CLOSE:\n`
    content += `Recap: ${presentationData.close.recap || "[Add recap]"}\n`
    content += `Call to Action: ${presentationData.close.callToAction || "[Add call to action]"}\n`
    content += `Drop the Mic: ${presentationData.close.dropMic || "[Add final statement]"}\n\n`

    // Add closing stories
    const closingStories = presentationData.stories.filter((story) => story.placement === "Closing")
    closingStories.forEach((story) => {
      content += `STORY: ${story.name}\n`
    })

    return content
  }

  const downloadAsWord = () => {
    const content = generateOutlineContent()
    const blob = new Blob([content], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Presentation-Outline.doc"
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAsPDF = () => {
    const content = generateOutlineContent()

    // Create a new window for PDF generation
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Presentation Outline</title>
            <style>
              body { 
                font-family: 'Mont', Arial, sans-serif; 
                font-size: 12pt; 
                line-height: 1.5; 
                margin: 1in;
                color: #022136;
              }
              h1 { 
                font-size: 18pt; 
                font-weight: bold; 
                margin-bottom: 20px;
                color: #022136;
              }
              .section-header { 
                font-size: 14pt; 
                font-weight: bold; 
                margin-top: 15px; 
                margin-bottom: 5px;
                color: #022136;
              }
              .key-point { 
                background-color: #EBEBEB; 
                padding: 10px; 
                margin: 10px 0; 
                border-radius: 5px;
              }
              .story { 
                background-color: #FFFB00; 
                padding: 5px 10px; 
                margin: 5px 0; 
                border-radius: 3px;
                font-weight: bold;
              }
              .sub-point { 
                margin-left: 20px; 
                margin: 5px 0;
              }
              .sub-story { 
                margin-left: 40px;
              }
              pre { 
                white-space: pre-wrap; 
                font-family: inherit;
              }
            </style>
          </head>
          <body>
            <h1>PRESENTATION OUTLINE</h1>
            <div><strong>Title:</strong> ${presentationData.title || "[Add your title]"}</div>
            <br>
            
            <div class="section-header">OPEN:</div>
            <div>${presentationData.open || "[Add your opening]"}</div>
            ${presentationData.stories
              .filter((story) => story.placement === "Opening")
              .map((story) => `<div class="story">STORY: ${story.name}</div>`)
              .join("")}
            <br>

            ${presentationData.keyPoints
              .filter((kp) => kp.trim() !== "")
              .map(
                (keyPoint, index) => `
                <div class="key-point">
                  <div class="section-header">KP${index + 1}: ${keyPoint}</div>
                  ${presentationData.stories
                    .filter((story) => story.placement === `Key Point ${index + 1}`)
                    .map((story) => `<div class="story">STORY: ${story.name}</div>`)
                    .join("")}
                  ${
                    presentationData.subPoints[index]
                      ?.filter((sp) => sp.trim() !== "")
                      .map(
                        (subPoint, subIndex) => `
                      <div class="sub-point">SP ${subIndex + 1}: ${subPoint}</div>
                      ${presentationData.stories
                        .filter((story) => story.placement === `Key Point ${index + 1} - Sub Point ${subIndex + 1}`)
                        .map((story) => `<div class="story sub-story">STORY: ${story.name}</div>`)
                        .join("")}
                    `,
                      )
                      .join("") || ""
                  }
                </div>
              `,
              )
              .join("")}

            <div class="section-header">Q&A</div>
            <br>

            <div class="section-header">CLOSE:</div>
            <div><strong>Recap:</strong> ${presentationData.close.recap || "[Add recap]"}</div>
            <div><strong>Call to Action:</strong> ${presentationData.close.callToAction || "[Add call to action]"}</div>
            <div><strong>Drop the Mic:</strong> ${presentationData.close.dropMic || "[Add final statement]"}</div>
            ${presentationData.stories
              .filter((story) => story.placement === "Closing")
              .map((story) => `<div class="story">STORY: ${story.name}</div>`)
              .join("")}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const renderStepContent = () => {
    try {
      switch (currentStep) {
        case 0:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Objectives</CardTitle>
                <CardDescription>
                  What are the one or two things you hope to achieve with this presentation?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Presentation Title</Label>
                  <Input
                    id="title"
                    value={presentationData.title}
                    onChange={(e) => updatePresentationData("title", e.target.value)}
                    placeholder="Enter your presentation title"
                  />
                </div>
                <div>
                  <Label htmlFor="objective1">Objective 1</Label>
                  <Textarea
                    id="objective1"
                    value={presentationData.objectives[0]}
                    onChange={(e) => {
                      const newObjectives = [...presentationData.objectives]
                      newObjectives[0] = e.target.value
                      updatePresentationData("objectives", newObjectives)
                    }}
                    placeholder="What do you want to achieve?"
                  />
                </div>
                <div>
                  <Label htmlFor="objective2">Objective 2 (Optional)</Label>
                  <Textarea
                    id="objective2"
                    value={presentationData.objectives[1]}
                    onChange={(e) => {
                      const newObjectives = [...presentationData.objectives]
                      newObjectives[1] = e.target.value
                      updatePresentationData("objectives", newObjectives)
                    }}
                    placeholder="Secondary objective (if any)"
                  />
                </div>
              </CardContent>
            </Card>
          )

        case 1:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Core-4</CardTitle>
                <CardDescription>
                  These are the four words or phrases that you want audiences to feel and/or think about when they think
                  about you. This should represent a combination of foundation values (things you have always been) and
                  aspirational values (things you want to achieve).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {presentationData.core4.map((core, index) => (
                  <div key={index}>
                    <Label htmlFor={`core${index + 1}`}>Core Value {index + 1}</Label>
                    <Input
                      id={`core${index + 1}`}
                      value={core}
                      onChange={(e) => {
                        const newCore4 = [...presentationData.core4]
                        newCore4[index] = e.target.value
                        updatePresentationData("core4", newCore4)
                      }}
                      placeholder={`Enter core value ${index + 1}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )

        case 2:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Audience</CardTitle>
                <CardDescription>
                  Define your audience and identify what connects them. Understanding your audience is crucial for
                  tailoring your message.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age Range</Label>
                    <Input
                      id="age"
                      value={presentationData.audience.age}
                      onChange={(e) => updateNestedData("audience", "age", e.target.value)}
                      placeholder="e.g., 25-45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={presentationData.audience.gender}
                      onChange={(e) => updateNestedData("audience", "gender", e.target.value)}
                      placeholder="e.g., Mixed, Predominantly male/female"
                    />
                  </div>
                  <div>
                    <Label htmlFor="demographics">Key Demographics</Label>
                    <Input
                      id="demographics"
                      value={presentationData.audience.demographics}
                      onChange={(e) => updateNestedData("audience", "demographics", e.target.value)}
                      placeholder="Education level, income, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="geography">Geography</Label>
                    <Input
                      id="geography"
                      value={presentationData.audience.geography}
                      onChange={(e) => updateNestedData("audience", "geography", e.target.value)}
                      placeholder="Location, region"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={presentationData.audience.organization}
                      onChange={(e) => updateNestedData("audience", "organization", e.target.value)}
                      placeholder="Company, association, group"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title/Role</Label>
                    <Input
                      id="jobTitle"
                      value={presentationData.audience.jobTitle}
                      onChange={(e) => updateNestedData("audience", "jobTitle", e.target.value)}
                      placeholder="Common job titles or roles"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hobbies">Hobbies & Interests</Label>
                    <Input
                      id="hobbies"
                      value={presentationData.audience.hobbies}
                      onChange={(e) => updateNestedData("audience", "hobbies", e.target.value)}
                      placeholder="Common interests or hobbies"
                    />
                  </div>
                  <div>
                    <Label htmlFor="beliefs">Religion, Politics, Beliefs</Label>
                    <Input
                      id="beliefs"
                      value={presentationData.audience.beliefs}
                      onChange={(e) => updateNestedData("audience", "beliefs", e.target.value)}
                      placeholder="Shared beliefs or values"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="other">Other Connecting Factors</Label>
                  <Textarea
                    id="other"
                    value={presentationData.audience.other}
                    onChange={(e) => updateNestedData("audience", "other", e.target.value)}
                    placeholder="Any other factors that connect your audience members"
                  />
                </div>
              </CardContent>
            </Card>
          )

        case 3:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Situation</CardTitle>
                <CardDescription>
                  This takes into consideration two variables: time and location. Understanding your presentation
                  context is essential.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="time">How much time do you have for the presentation?</Label>
                  <Input
                    id="time"
                    value={presentationData.situation.time}
                    onChange={(e) => updateNestedData("situation", "time", e.target.value)}
                    placeholder="e.g., 30 minutes, 1 hour, 2 hours"
                  />
                </div>
                <div>
                  <Label htmlFor="setting">What type of room or setting will you give the presentation?</Label>
                  <select
                    id="setting"
                    value={presentationData.situation.setting}
                    onChange={(e) => updateNestedData("situation", "setting", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a setting</option>
                    <option value="Conference room">Conference room</option>
                    <option value="Board room">Board room</option>
                    <option value="Office">Office</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Elevator">Elevator</option>
                    <option value="Amphitheater">Amphitheater</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )

        case 4:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 5: Big Idea</CardTitle>
                <CardDescription>
                  What is the big idea behind your presentation? This is more than a theme. It's a one sentence
                  statement that sums up the single biggest idea behind the entire presentation.{" "}
                  <strong>Do not proceed until you know this.</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bigIdea">My Big Idea</Label>
                  <Textarea
                    id="bigIdea"
                    value={presentationData.bigIdea}
                    onChange={(e) => updatePresentationData("bigIdea", e.target.value)}
                    placeholder="Example: Presentations don't have to suck. They can be enjoyable for everyone."
                    className="min-h-[100px]"
                  />
                </div>
                {presentationData.bigIdea.trim() === "" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Important:</strong> You must define your Big Idea before proceeding. This is the
                      foundation of your entire presentation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )

        case 5:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 6: Key Points</CardTitle>
                <CardDescription>
                  What are the three major topics that your big idea rests on? You don't have to use three but do not
                  use more than three.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {presentationData.keyPoints.map((keyPoint, index) => (
                  <div key={index}>
                    <Label htmlFor={`keyPoint${index + 1}`}>Key Point {index + 1}</Label>
                    <Textarea
                      id={`keyPoint${index + 1}`}
                      value={keyPoint}
                      onChange={(e) => {
                        const newKeyPoints = [...presentationData.keyPoints]
                        newKeyPoints[index] = e.target.value
                        updatePresentationData("keyPoints", newKeyPoints)
                      }}
                      placeholder={`Enter key point ${index + 1}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )

        case 6:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 7: Sub Points</CardTitle>
                <CardDescription>
                  This is the data, facts, research, case studies, and examples that support each key point. Each key
                  point can have up to—but no more than—three sub points.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {presentationData.keyPoints.map(
                  (keyPoint, keyIndex) =>
                    keyPoint.trim() !== "" && (
                      <div key={keyIndex} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Sub Points for: "{keyPoint}"</h4>
                        <div className="space-y-3">
                          {presentationData.subPoints[keyIndex]?.map((subPoint, subIndex) => (
                            <div key={subIndex}>
                              <Label htmlFor={`subPoint${keyIndex}-${subIndex}`}>Sub Point {subIndex + 1}</Label>
                              <Textarea
                                id={`subPoint${keyIndex}-${subIndex}`}
                                value={subPoint}
                                onChange={(e) => {
                                  const newSubPoints = { ...presentationData.subPoints }
                                  if (!newSubPoints[keyIndex]) {
                                    newSubPoints[keyIndex] = ["", "", ""]
                                  }
                                  newSubPoints[keyIndex][subIndex] = e.target.value
                                  updatePresentationData("subPoints", newSubPoints)
                                }}
                                placeholder={`Supporting detail ${subIndex + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                )}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Remember:</strong> Anything that doesn't support a key point and/or help you achieve your
                    objective does not belong in the presentation!
                  </p>
                </div>
              </CardContent>
            </Card>
          )

        case 7:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 8: Stories</CardTitle>
                <CardDescription>
                  Stories are powerful tools for connection and persuasion. Follow this 8-step structure to craft
                  compelling narratives that support your key points.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {presentationData.stories.map((story, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">Story {index + 1}</h4>
                      <Button variant="outline" size="sm" onClick={() => removeStory(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Story Name</Label>
                        <Input
                          value={story.name}
                          onChange={(e) => updateStory(index, "name", e.target.value)}
                          placeholder="Give your story a memorable name"
                        />
                      </div>

                      <div>
                        <Label>1. Set the Scene</Label>
                        <p className="text-sm text-gray-600 mb-2">
                          (use a few sensory details to put the audience into the story with you)
                        </p>
                        <Textarea
                          value={story.scene}
                          onChange={(e) => updateStory(index, "scene", e.target.value)}
                          placeholder="Where were you? What did you see, hear, smell, feel? Paint the picture..."
                        />
                      </div>

                      <div>
                        <Label>2. Establish the Problem</Label>
                        <Textarea
                          value={story.problem}
                          onChange={(e) => updateStory(index, "problem", e.target.value)}
                          placeholder="What was the initial problem or challenge you faced?"
                        />
                      </div>

                      <div>
                        <Label>3. Create Conflict</Label>
                        <p className="text-sm text-gray-600 mb-2">(Who are you in conflict with? Bring this to life)</p>
                        <Textarea
                          value={story.conflict}
                          onChange={(e) => updateStory(index, "conflict", e.target.value)}
                          placeholder="Who or what were you in conflict with? Make them real for your audience..."
                        />
                      </div>

                      <div>
                        <Label>4. Emphasize the Stakes</Label>
                        <p className="text-sm text-gray-600 mb-2">(What is on the line for you in this story?)</p>
                        <Textarea
                          value={story.stakes}
                          onChange={(e) => updateStory(index, "stakes", e.target.value)}
                          placeholder="What would happen if you failed? What was at risk?"
                        />
                      </div>

                      <div>
                        <Label>5. Introduce the Hero or Guide</Label>
                        <p className="text-sm text-gray-600 mb-2">(Try not to make yourself the hero.)</p>
                        <Textarea
                          value={story.hero}
                          onChange={(e) => updateStory(index, "hero", e.target.value)}
                          placeholder="Who helped you? What mentor, colleague, or unexpected source provided guidance?"
                        />
                      </div>

                      <div>
                        <Label>6. Highlight the Key Decision</Label>
                        <p className="text-sm text-gray-600 mb-2">(What was the big difference maker?)</p>
                        <Textarea
                          value={story.decision}
                          onChange={(e) => updateStory(index, "decision", e.target.value)}
                          placeholder="What was the pivotal moment? What decision or action changed everything?"
                        />
                      </div>

                      <div>
                        <Label>7. Bring the story to Resolution</Label>
                        <p className="text-sm text-gray-600 mb-2">(How does it end? Land the plane.)</p>
                        <Textarea
                          value={story.resolution}
                          onChange={(e) => updateStory(index, "resolution", e.target.value)}
                          placeholder="How did the story conclude? What was the outcome?"
                        />
                      </div>

                      <div>
                        <Label>8. Reveal your Insight or Aha</Label>
                        <p className="text-sm text-gray-600 mb-2">
                          (What did you learn? What you learned is the point of the story. The key is to match the point
                          of the story with the point you are making in your presentation.)
                        </p>
                        <Textarea
                          value={story.insight}
                          onChange={(e) => updateStory(index, "insight", e.target.value)}
                          placeholder="What was your key insight? How does this lesson connect to your presentation point?"
                        />
                      </div>

                      <div>
                        <Label>Where will you use this story in your presentation?</Label>
                        <select
                          value={story.placement}
                          onChange={(e) => updateStory(index, "placement", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select placement</option>
                          <option value="Opening">Opening</option>
                          <option value="Key Point 1">Key Point 1</option>
                          <option value="Key Point 1 - Sub Point 1">Key Point 1 - Sub Point 1</option>
                          <option value="Key Point 1 - Sub Point 2">Key Point 1 - Sub Point 2</option>
                          <option value="Key Point 1 - Sub Point 3">Key Point 1 - Sub Point 3</option>
                          <option value="Key Point 2">Key Point 2</option>
                          <option value="Key Point 2 - Sub Point 1">Key Point 2 - Sub Point 1</option>
                          <option value="Key Point 2 - Sub Point 2">Key Point 2 - Sub Point 2</option>
                          <option value="Key Point 2 - Sub Point 3">Key Point 2 - Sub Point 3</option>
                          <option value="Key Point 3">Key Point 3</option>
                          <option value="Key Point 3 - Sub Point 1">Key Point 3 - Sub Point 1</option>
                          <option value="Key Point 3 - Sub Point 2">Key Point 3 - Sub Point 2</option>
                          <option value="Key Point 3 - Sub Point 3">Key Point 3 - Sub Point 3</option>
                          <option value="Closing">Closing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addStory} variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Story
                </Button>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6">
                  <h4 className="font-semibold mb-2">Story Structure Tips:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Make the audience feel like they're experiencing the story with you</li>
                    <li>• Don't make yourself the hero - let someone else save the day</li>
                    <li>• The insight/lesson should directly support your presentation point</li>
                    <li>• Keep stories concise but vivid - aim for 2-3 minutes when told</li>
                    <li>• Practice the story until it feels natural and conversational</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )

        case 8:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Step 9: Build your Open & Close</CardTitle>
                <CardDescription>
                  The Open has one function: establish the desired tone of your presentation. The Close has three parts:
                  Recap the Big Idea, Call to Action, and Drop the Mic.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="open">Opening</Label>
                  <p className="text-sm text-gray-600 mb-2">
                    This should be a marriage between your objectives and your brand. If your brand is fun and your
                    objective is to shift energy, then the open should be fun and high energy.
                  </p>
                  <Textarea
                    id="open"
                    value={presentationData.open}
                    onChange={(e) => updatePresentationData("open", e.target.value)}
                    placeholder="How will you open your presentation to establish the right tone?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Closing (3 Parts)</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recap">1. Recap the Big Idea</Label>
                      <Textarea
                        id="recap"
                        value={presentationData.close.recap}
                        onChange={(e) => updateNestedData("close", "recap", e.target.value)}
                        placeholder="Restate your big idea in a memorable way"
                      />
                    </div>
                    <div>
                      <Label htmlFor="callToAction">2. Call to Action</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        What do you want the audience to do? (Refer to your objectives)
                      </p>
                      <Textarea
                        id="callToAction"
                        value={presentationData.close.callToAction}
                        onChange={(e) => updateNestedData("close", "callToAction", e.target.value)}
                        placeholder="What specific action do you want your audience to take?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dropMic">3. Drop the Mic</Label>
                      <p className="text-sm text-gray-600 mb-2">Your final, memorable statement</p>
                      <Textarea
                        id="dropMic"
                        value={presentationData.close.dropMic}
                        onChange={(e) => updateNestedData("close", "dropMic", e.target.value)}
                        placeholder="Your powerful closing statement"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6 border-t">
                  <Button
                    onClick={() => setCurrentStep(9)}
                    className="bg-[#022136] hover:bg-[#1a2332] text-white px-8 py-3 text-lg"
                  >
                    Create Outline
                  </Button>
                </div>
              </CardContent>
            </Card>
          )

        case 9:
          return (
            <Card>
              <CardHeader>
                <CardTitle>Presentation Outline</CardTitle>
                <CardDescription>
                  Review your presentation structure and plan multimedia elements for each section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Header Row */}
                  <div className="grid grid-cols-3 gap-4 pb-2 border-b-2 border-gray-300">
                    <div className="font-bold text-lg">Outline Item</div>
                    <div className="text-center font-bold text-lg">High-Tech Multi-Media</div>
                    <div className="text-center font-bold text-lg">Low-Tech Multi-Media</div>
                  </div>

                  {/* Opening */}
                  <div className="grid grid-cols-3 gap-4 items-start border-b pb-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#022136] text-lg">OPEN:</h4>
                      <p className="text-sm text-gray-700 ml-2">{presentationData.open || "[Add your opening]"}</p>
                      {presentationData.stories
                        .filter((story) => story.placement === "Opening")
                        .map((story, storyIndex) => (
                          <div key={storyIndex} className="ml-4 p-2 rounded" style={{ backgroundColor: "#FFFB00" }}>
                            <p className="font-semibold text-sm">STORY: {story.name}</p>
                          </div>
                        ))}
                    </div>
                    <div>
                      <Textarea
                        value={presentationData.outlineMultimedia["open"]?.highTech || ""}
                        onChange={(e) => updateOutlineMultimedia("open", "highTech", e.target.value)}
                        placeholder="High-tech elements for opening"
                        className="w-full min-h-[60px]"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={presentationData.outlineMultimedia["open"]?.lowTech || ""}
                        onChange={(e) => updateOutlineMultimedia("open", "lowTech", e.target.value)}
                        placeholder="Low-tech elements for opening"
                        className="w-full min-h-[60px]"
                      />
                    </div>
                  </div>

                  {/* Key Points */}
                  {presentationData.keyPoints
                    .filter((kp) => kp.trim() !== "")
                    .map((keyPoint, index) => (
                      <div key={index} className="space-y-4 border-b pb-4">
                        <div
                          className="grid grid-cols-3 gap-4 items-start p-3 rounded"
                          style={{ backgroundColor: "#EBEBEB" }}
                        >
                          <div className="space-y-2">
                            <h4 className="font-bold text-[#022136] text-lg">
                              KP{index + 1}: {keyPoint}
                            </h4>
                            {presentationData.stories
                              .filter((story) => story.placement === `Key Point ${index + 1}`)
                              .map((story, storyIndex) => (
                                <div
                                  key={storyIndex}
                                  className="ml-4 p-2 rounded"
                                  style={{ backgroundColor: "#FFFB00" }}
                                >
                                  <p className="font-semibold text-sm">STORY: {story.name}</p>
                                </div>
                              ))}
                          </div>
                          <div>
                            <Textarea
                              value={presentationData.outlineMultimedia[`kp${index + 1}`]?.highTech || ""}
                              onChange={(e) => updateOutlineMultimedia(`kp${index + 1}`, "highTech", e.target.value)}
                              placeholder={`High-tech for KP${index + 1}`}
                              className="w-full min-h-[60px]"
                            />
                          </div>
                          <div>
                            <Textarea
                              value={presentationData.outlineMultimedia[`kp${index + 1}`]?.lowTech || ""}
                              onChange={(e) => updateOutlineMultimedia(`kp${index + 1}`, "lowTech", e.target.value)}
                              placeholder={`Low-tech for KP${index + 1}`}
                              className="w-full min-h-[60px]"
                            />
                          </div>
                        </div>

                        {/* Sub Points */}
                        {presentationData.subPoints[index]
                          ?.filter((sp) => sp.trim() !== "")
                          .map((subPoint, subIndex) => (
                            <div key={subIndex} className="grid grid-cols-3 gap-4 items-start ml-8">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  SP {subIndex + 1}: {subPoint}
                                </p>
                                {presentationData.stories
                                  .filter(
                                    (story) => story.placement === `Key Point ${index + 1} - Sub Point ${subIndex + 1}`,
                                  )
                                  .map((story, storyIndex) => (
                                    <div
                                      key={storyIndex}
                                      className="ml-4 p-2 rounded"
                                      style={{ backgroundColor: "#FFFB00" }}
                                    >
                                      <p className="font-semibold text-sm">STORY: {story.name}</p>
                                    </div>
                                  ))}
                              </div>
                              <div>
                                <Textarea
                                  value={
                                    presentationData.outlineMultimedia[`kp${index + 1}sp${subIndex + 1}`]?.highTech ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    updateOutlineMultimedia(
                                      `kp${index + 1}sp${subIndex + 1}`,
                                      "highTech",
                                      e.target.value,
                                    )
                                  }
                                  placeholder={`High-tech for SP${subIndex + 1}`}
                                  className="w-full min-h-[60px]"
                                />
                              </div>
                              <div>
                                <Textarea
                                  value={
                                    presentationData.outlineMultimedia[`kp${index + 1}sp${subIndex + 1}`]?.lowTech || ""
                                  }
                                  onChange={(e) =>
                                    updateOutlineMultimedia(
                                      `kp${index + 1}sp${subIndex + 1}`,
                                      "lowTech",
                                      e.target.value,
                                    )
                                  }
                                  placeholder={`Low-tech for SP${subIndex + 1}`}
                                  className="w-full min-h-[60px]"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}

                  {/* Q&A */}
                  <div className="grid grid-cols-3 gap-4 items-start border-b pb-4">
                    <div>
                      <h4 className="font-bold text-[#022136] text-lg">Q&A</h4>
                    </div>
                    <div>
                      <Textarea
                        value={presentationData.outlineMultimedia["qa"]?.highTech || ""}
                        onChange={(e) => updateOutlineMultimedia("qa", "highTech", e.target.value)}
                        placeholder="High-tech elements for Q&A"
                        className="w-full min-h-[60px]"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={presentationData.outlineMultimedia["qa"]?.lowTech || ""}
                        onChange={(e) => updateOutlineMultimedia("qa", "lowTech", e.target.value)}
                        placeholder="Low-tech elements for Q&A"
                        className="w-full min-h-[60px]"
                      />
                    </div>
                  </div>

                  {/* Close */}
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#022136] text-lg">CLOSE:</h4>
                      <p className="text-sm ml-2">
                        <strong>Recap:</strong> {presentationData.close.recap || "[Add recap]"}
                      </p>
                      <p className="text-sm ml-2">
                        <strong>Call to Action:</strong> {presentationData.close.callToAction || "[Add call to action]"}
                      </p>
                      <p className="text-sm ml-2">
                        <strong>Drop the Mic:</strong> {presentationData.close.dropMic || "[Add final statement]"}
                      </p>
                      {presentationData.stories
                        .filter((story) => story.placement === "Closing")
                        .map((story, storyIndex) => (
                          <div key={storyIndex} className="ml-4 p-2 rounded" style={{ backgroundColor: "#FFFB00" }}>
                            <p className="font-semibold text-sm">STORY: {story.name}</p>
                          </div>
                        ))}
                    </div>
                    <div>
                      <Textarea
                        value={presentationData.outlineMultimedia["close"]?.highTech || ""}
                        onChange={(e) => updateOutlineMultimedia("close", "highTech", e.target.value)}
                        placeholder="High-tech elements for closing"
                        className="w-full min-h-[60px]"
                      />
                    </div>
                    <div>
                      <Textarea
                        value={presentationData.outlineMultimedia["close"]?.lowTech || ""}
                        onChange={(e) => updateOutlineMultimedia("close", "lowTech", e.target.value)}
                        placeholder="Low-tech elements for closing"
                        className="w-full min-h-[60px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )

        case 10:
          return (
            <Card>
              <CardHeader>
                <CardTitle>This is the multi-media you need to create for your presentation.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* High Tech Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#022136] mb-4">High Tech</h3>
                  <p className="text-gray-600 mb-4">These are the slides you need to create for this presentation.</p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {/* Open */}
                      {presentationData.outlineMultimedia.open?.highTech && (
                        <div className="flex">
                          <div className="w-32 font-medium text-gray-700 flex-shrink-0">Open:</div>
                          <div className="flex-1">{presentationData.outlineMultimedia.open.highTech}</div>
                        </div>
                      )}

                      {/* Key Points and Sub Points */}
                      {presentationData.keyPoints
                        .filter((kp) => kp.trim() !== "")
                        .map((keyPoint, index) => (
                          <div key={index}>
                            {/* Key Point High Tech */}
                            {presentationData.outlineMultimedia[`kp${index + 1}`]?.highTech && (
                              <div className="flex">
                                <div className="w-32 font-medium text-gray-700 flex-shrink-0">
                                  Key Point {index + 1}:
                                </div>
                                <div className="flex-1">
                                  {presentationData.outlineMultimedia[`kp${index + 1}`].highTech}
                                </div>
                              </div>
                            )}

                            {/* Sub Points High Tech */}
                            {presentationData.subPoints[index]
                              ?.filter((sp) => sp.trim() !== "")
                              .map(
                                (subPoint, subIndex) =>
                                  presentationData.outlineMultimedia[`kp${index + 1}sp${subIndex + 1}`]?.highTech && (
                                    <div key={subIndex} className="flex">
                                      <div className="w-32 font-medium text-gray-700 flex-shrink-0 pl-4">
                                        Sub Point {subIndex + 1}:
                                      </div>
                                      <div className="flex-1">
                                        {presentationData.outlineMultimedia[`kp${index + 1}sp${subIndex + 1}`].highTech}
                                      </div>
                                    </div>
                                  ),
                              )}
                          </div>
                        ))}

                      {/* Q&A */}
                      {presentationData.outlineMultimedia.qa?.highTech && (
                        <div className="flex">
                          <div className="w-32 font-medium text-gray-700 flex-shrink-0">Q&A:</div>
                          <div className="flex-1">{presentationData.outlineMultimedia.qa.highTech}</div>
                        </div>
                      )}

                      {/* Close */}
                      {presentationData.outlineMultimedia.close?.highTech && (
                        <div className="flex">
                          <div className="w-32 font-medium text-gray-700 flex-shrink-0">Close:</div>
                          <div className="flex-1">{presentationData.outlineMultimedia.close.highTech}</div>
                        </div>
                      )}

                      {/* Show message if no high tech items */}
                      {!Object.values(presentationData.outlineMultimedia).some((item) => item?.highTech) && (
                        <p className="text-gray-500 italic text-center py-4">
                          No high-tech multimedia items specified in your outline.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Low Tech Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#022136] mb-4">Low Tech</h3>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {/* Open */}
                      {presentationData.outlineMultimedia.open?.lowTech && (
                        <div className="flex">
                          <div className="w-32 font-medium text-gray-700 flex-shrink-0">Open:</div>
                          <div className="flex-1">{presentationData.outlineMultimedia.open.lowTech}</div>
                        </div>
                      )}

                      {/* Key Points and Sub Points */}
                      {presentationData.keyPoints
                        .filter((kp) => kp.trim() !== "")
                        .map((keyPoint, index) => (
                          <div key={index}>
                            {/* Key Point Low Tech */}
                            {presentationData.outlineMultimedia[`kp${index + 1}`]?.lowTech && (
                              <div className="flex">
                                <div className="w-32 font-medium text-gray-700 flex-shrink-0">
                                  Key Point {index + 1}:
                                </div>
                                <div className="flex-1">
                                  {presentationData.outlineMultimedia[`kp${index + 1}`].lowTech}
                                </div>
                              </div>
                            )}

                            {/* Sub Points Low Tech */}
                            {presentationData.subPoints[index]
                              ?.filter((sp) => sp.trim() !== "")
                              .map(
                                (subPoint, subIndex) =>
                                  presentationData.outlineMultimedia[`kp${index + 1}sp${subIndex + 1}`]?.lowTech && (
                                    <div key={subIndex} className="flex">
                                      <div className="w-32 font-medium text-gray-700 flex-shrink-0 pl-4">
                                        Sub Point {subIndex + 1}:
                                      </div>
                                      <div className="flex-1">
                                        {presentationData.outlineMultimedia[`kp${index + 1}sp${subIndex + 1}`].lowTech}
                                      </div>
                                    </div>
                                  ),
                              )}
                          </div>
                        ))}

                      {/* Q&A */}
                      {presentationData.outlineMultimedia.qa?.lowTech && (
                        <div className="flex">
                          <div className="w-32 font-medium text-gray-700 flex-shrink-0">Q&A:</div>
                          <div className="flex-1">{presentationData.outlineMultimedia.qa.lowTech}</div>
                        </div>
                      )}

                      {/* Close */}
                      {presentationData.outlineMultimedia.close?.lowTech && (
                        <div className="flex">
                          <div className="w-32 font-medium text-gray-700 flex-shrink-0">Close:</div>
                          <div className="flex-1">{presentationData.outlineMultimedia.close.lowTech}</div>
                        </div>
                      )}

                      {/* Show message if no low tech items */}
                      {!Object.values(presentationData.outlineMultimedia).some((item) => item?.lowTech) && (
                        <p className="text-gray-500 italic text-center py-4">
                          No low-tech multimedia items specified in your outline.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-6 border-t">
                  <Button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-[#022136] hover:bg-[#1a2332] text-white"
                  >
                    <Download className="h-4 w-4" />
                    Print/Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )

        case 11:
          return (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Image
                  src="/presentation-transformation-logo-large.png"
                  alt="Presentation Transformation"
                  width={400}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold mb-2">{presentationData.title || "Your Presentation"}</h1>
              </div>

              {/* Overview Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Presentation Foundation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Your Core-4:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {presentationData.core4
                        .filter((core) => core.trim() !== "")
                        .map((core, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {core}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold">Audience:</h4>
                    <p className="text-sm text-gray-600">
                      {Object.entries(presentationData.audience)
                        .filter(([_, value]) => value.trim() !== "")
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(" | ")}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Situation:</h4>
                    <p className="text-sm text-gray-600">
                      Time: {presentationData.situation.time} | Setting: {presentationData.situation.setting}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Big Idea:</h4>
                    <p className="text-lg font-medium text-blue-800 bg-blue-50 p-3 rounded-lg">
                      {presentationData.bigIdea}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Presentation Outline */}
              <Card>
                <CardHeader>
                  <CardTitle>Presentation Outline</CardTitle>
                  <CardDescription>Use this as your speaker notes</CardDescription>
                  <div className="flex gap-2">
                    <Button onClick={downloadAsWord} variant="outline" size="sm">
                      <File className="h-4 w-4 mr-2" />
                      Download Word
                    </Button>
                    <Button onClick={downloadAsPDF} variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg" style={{ fontFamily: "Mont, sans-serif" }}>
                    <div>
                      <h4 className="font-bold text-[#022136]" style={{ fontSize: "18px" }}>
                        OPEN:
                      </h4>
                      <p className="ml-4 whitespace-pre-wrap" style={{ fontSize: "18px" }}>
                        {presentationData.open || "[Add your opening]"}
                      </p>
                      {presentationData.stories
                        .filter((story) => story.placement === "Opening")
                        .map((story, storyIndex) => (
                          <div key={storyIndex} className="ml-4 mt-2" style={{ backgroundColor: "#FFFB00" }}>
                            <p className="font-semibold p-2 rounded">STORY: {story.name}</p>
                          </div>
                        ))}
                    </div>

                    {presentationData.keyPoints
                      .filter((kp) => kp.trim() !== "")
                      .map((keyPoint, index) => (
                        <div key={index} style={{ backgroundColor: "#EBEBEB" }} className="p-3 rounded">
                          <h4 className="font-bold text-[#022136]" style={{ fontSize: "18px" }}>
                            KP{index + 1}: {keyPoint}
                          </h4>
                          {/* Stories for Key Point */}
                          {presentationData.stories
                            .filter((story) => story.placement === `Key Point ${index + 1}`)
                            .map((story, storyIndex) => (
                              <div key={storyIndex} className="ml-4 mt-2" style={{ backgroundColor: "#FFFB00" }}>
                                <p className="font-semibold p-2 rounded">STORY: {story.name}</p>
                              </div>
                            ))}

                          {presentationData.subPoints[index]
                            ?.filter((sp) => sp.trim() !== "")
                            .map((subPoint, subIndex) => (
                              <div key={subIndex}>
                                <p className="ml-4" style={{ fontSize: "16px" }}>
                                  SP {subIndex + 1}: {subPoint}
                                </p>
                                {/* Stories for Sub Points */}
                                {presentationData.stories
                                  .filter(
                                    (story) => story.placement === `Key Point ${index + 1} - Sub Point ${subIndex + 1}`,
                                  )
                                  .map((story, storyIndex) => (
                                    <div key={storyIndex} className="ml-8 mt-2" style={{ backgroundColor: "#FFFB00" }}>
                                      <p className="font-semibold p-2 rounded">STORY: {story.name}</p>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      ))}

                    <div>
                      <h4 className="font-bold text-[#022136]" style={{ fontSize: "18px" }}>
                        Q&A
                      </h4>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#022136]" style={{ fontSize: "18px" }}>
                        CLOSE:
                      </h4>
                      <p className="ml-4" style={{ fontSize: "18px" }}>
                        Recap: {presentationData.close.recap || "[Add recap]"}
                      </p>
                      <p className="ml-4" style={{ fontSize: "18px" }}>
                        Call to Action: {presentationData.close.callToAction || "[Add call to action]"}
                      </p>
                      <p className="ml-4" style={{ fontSize: "18px" }}>
                        Drop the Mic: {presentationData.close.dropMic || "[Add final statement]"}
                      </p>
                      {presentationData.stories
                        .filter((story) => story.placement === "Closing")
                        .map((story, storyIndex) => (
                          <div key={storyIndex} className="ml-4 mt-2" style={{ backgroundColor: "#FFFB00" }}>
                            <p className="font-semibold p-2 rounded">STORY: {story.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stories Summary */}
              {presentationData.stories.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Stories</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          const content = presentationData.stories
                            .map(
                              (story, index) =>
                                `Story ${index + 1} - Placement: ${story.placement}\n\nSetup: ${story.scene}\nProblem: ${story.problem}\nConflict: ${story.conflict}\nStakes: ${story.stakes}\nHero: ${story.hero}\nDecision: ${story.decision}\nResolution: ${story.resolution}\nInsight: ${story.insight}\n\n`,
                            )
                            .join("---\n\n")

                          const blob = new Blob([content], { type: "application/msword" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = "Your-Stories.doc"
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Stories
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {presentationData.stories.map((story, index) => (
                      <div key={index} className="mb-4 p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {story.name} - Placement: {story.placement}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Scene:</strong> {story.scene}
                          </p>
                          <p>
                            <strong>Problem:</strong> {story.problem}
                          </p>
                          <p>
                            <strong>Insight:</strong> {story.insight}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Complete Story Details */}
              {presentationData.stories.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Story Details</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          const content = presentationData.stories
                            .map(
                              (story, index) =>
                                `${story.name} - Placement: ${story.placement}\n\n${story.scene}\n\n${story.problem}\n\n${story.conflict}\n\n${story.stakes}\n\n${story.hero}\n\n${story.decision}\n\n${story.resolution}\n\n${story.insight}\n\n`,
                            )
                            .join("---\n\n")

                          const blob = new Blob([content], { type: "application/msword" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = "Complete-Story-Details.doc"
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Complete Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {presentationData.stories.map((story, index) => (
                      <div key={index} className="mb-8 p-4 border rounded-lg">
                        <h4 className="font-semibold mb-4 text-lg">
                          {story.name} - Placement: {story.placement}
                        </h4>
                        <div className="space-y-3 text-sm leading-relaxed">
                          {story.scene && <p>{story.scene}</p>}
                          {story.problem && <p>{story.problem}</p>}
                          {story.conflict && <p>{story.conflict}</p>}
                          {story.stakes && <p>{story.stakes}</p>}
                          {story.hero && <p>{story.hero}</p>}
                          {story.decision && <p>{story.decision}</p>}
                          {story.resolution && <p>{story.resolution}</p>}
                          {story.insight && <p>{story.insight}</p>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* PowerPoint Slide Deck */}

              {/* Multimedia Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Multimedia Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">High Tech, Low Touch:</h4>
                      <ul className="space-y-1">
                        {presentationData.multimedia.highTech
                          .filter((item) => item.trim() !== "")
                          .map((item, index) => (
                            <li key={index} className="text-sm">
                              • {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Low Tech, High Touch:</h4>
                      <ul className="space-y-1">
                        {presentationData.multimedia.lowTech
                          .filter((item) => item.trim() !== "")
                          .map((item, index) => (
                            <li key={index} className="text-sm">
                              • {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.print()} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download/Print
                </Button>
              </div>
            </div>
          )

        default:
          return (
            <Card>
              <CardContent>
                <p>Step content not found.</p>
              </CardContent>
            </Card>
          )
      }
    } catch (error) {
      console.error("Error rendering step content:", error)
      return (
        <Card>
          <CardContent>
            <p>Error loading step content. Please try again.</p>
          </CardContent>
        </Card>
      )
    }
  }

  const canProceedToNextStep = () => {
    if (currentStep === 4) {
      // Big Idea step
      return presentationData.bigIdea.trim() !== ""
    }
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBackToHome} variant="ghost" size="sm" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Image
                src="/presentation-transformation-logo-large.png"
                alt="Presentation Transformation"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold">In-10 Approach</h1>
                <p className="text-sm text-muted-foreground">Step-by-step presentation builder</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Step {currentStep + 1} of 11</p>
              <p className="text-xs text-muted-foreground">{steps[currentStep]?.title || "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentStep(index)} className="focus:outline-none">
                    {isStepComplete(index) ? (
                      <CheckCircle className="h-5 w-5 text-green-600 cursor-pointer hover:text-green-700" />
                    ) : (
                      <Circle
                        className={`h-5 w-5 cursor-pointer ${index === currentStep ? "text-blue-600 hover:text-blue-700" : "text-gray-300 hover:text-gray-400"}`}
                      />
                    )}
                  </button>
                  <span
                    className={`text-xs font-medium cursor-pointer ${index === currentStep ? "text-blue-600" : isStepComplete(index) ? "text-green-600" : "text-gray-500"}`}
                    onClick={() => setCurrentStep(index)}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-gray-300 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={() => {
              if (currentStep === 10) {
                setCurrentStep(11)
              } else if (currentStep < 10) {
                setCurrentStep(Math.min(10, currentStep + 1))
              }
            }}
            disabled={!canProceedToNextStep() || currentStep === 11}
            className="flex items-center gap-2"
          >
            {currentStep === 10 ? "Generate Presentation" : currentStep === 11 ? "Final Output" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
