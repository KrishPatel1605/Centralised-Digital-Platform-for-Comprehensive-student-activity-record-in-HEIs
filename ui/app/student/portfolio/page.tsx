"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  GraduationCap,
  Download,
  Share2,
  Eye,
  Palette,
  FileText,
  Award,
  BookOpen,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Bell,
  Settings,
  LogOut,
  Copy,
  CheckCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthGuard } from "@/components/auth-guard"

// Mock student data for portfolio
const studentData = {
  name: "",
  studentId: "STU123456",
  department: "Computer Science",
  semester: "6th Semester",
  email: "mukesh@university.edu",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  website: "mukesh.dev",
  avatar: "/student-avatar.png",
  bio: "Passionate computer science student with expertise in full-stack development, AI/ML, and cloud technologies. Experienced in leading teams and contributing to open-source projects.",
  gpa: 3.8,
  expectedGraduation: "May 2024",
}

const achievements = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Certification",
    description: "Completed AWS Cloud Practitioner certification course with 85% score",
    type: "certification",
    date: "March 2024",
    issuer: "Amazon Web Services",
    tags: ["AWS", "Cloud Computing", "Certification"],
  },
  {
    id: 2,
    title: "University Hackathon 2024 - Winner",
    description: "Won 1st place in the annual university hackathon with an AI-powered study assistant app",
    type: "competition",
    date: "February 2024",
    issuer: "University Tech Club",
    tags: ["Hackathon", "AI", "First Place", "Team Work"],
  },
  {
    id: 3,
    title: "Summer Internship at TechCorp",
    description: "3-month software development internship focusing on full-stack web development",
    type: "internship",
    date: "June - August 2023",
    issuer: "TechCorp Inc.",
    tags: ["Internship", "Full Stack", "Web Development"],
  },
  {
    id: 4,
    title: "React Conference 2024",
    description: "Attended React Conference 2024 and participated in workshops on Next.js and TypeScript",
    type: "conference",
    date: "January 2024",
    issuer: "React Community",
    tags: ["React", "Conference", "Next.js", "TypeScript"],
  },
]

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "AWS", level: 70 },
  { name: "TypeScript", level: 85 },
]

const portfolioThemes = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and corporate design perfect for job applications",
    preview: "/theme-professional.png",
    colors: { primary: "#1e3a8a", secondary: "#0ea5e9", accent: "#f3f4f6" },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    preview: "/theme-minimal.png",
    colors: { primary: "#374151", secondary: "#6b7280", accent: "#f9fafb" },
  },
  {
    id: "creative",
    name: "Creative",
    description: "Vibrant and modern design for creative professionals",
    preview: "/theme-creative.png",
    colors: { primary: "#7c3aed", secondary: "#a855f7", accent: "#faf5ff" },
  },
]

export default function PortfolioPage() {
  const [selectedTheme, setSelectedTheme] = useState("professional")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareUrl] = useState("https://portfolio.smartstudenthub.com/john-doe-stu123456")
  const [copied, setCopied] = useState(false)

  const currentTheme = portfolioThemes.find((theme) => theme.id === selectedTheme) || portfolioThemes[0]

  const handleExportPDF = () => {
    console.log("Exporting portfolio as PDF...")
    // In a real app, this would generate and download a PDF
  }

  const handleSharePortfolio = () => {
    setIsShareDialogOpen(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "certification":
        return Award
      case "internship":
        return BookOpen
      case "conference":
        return Users
      case "competition":
        return Trophy
      default:
        return FileText
    }
  }

  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Smart Student Hub</span>
              </div>
              <Badge variant="secondary">Portfolio Generator</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{studentData.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{studentData.studentId}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Digital Portfolio Generator</h1>
              <p className="text-muted-foreground">Create and customize your professional portfolio</p>
            </div>

            <div className="flex items-center gap-3">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Portfolio Preview - {currentTheme.name} Theme</DialogTitle>
                    <DialogDescription>Preview how your portfolio will look to visitors</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <PortfolioPreview theme={currentTheme} studentData={studentData} achievements={achievements} />
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleSharePortfolio}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>

              <Button onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Theme Selection & Settings */}
            <div className="space-y-6">
              {/* Theme Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Portfolio Themes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioThemes.map((theme) => (
                      <div
                        key={theme.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedTheme === theme.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex gap-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: theme.colors.primary }}
                            ></div>
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: theme.colors.secondary }}
                            ></div>
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: theme.colors.accent }}
                            ></div>
                          </div>
                          <h3 className="font-medium">{theme.name}</h3>
                          {selectedTheme === theme.id && <CheckCircle className="h-4 w-4 text-primary ml-auto" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{theme.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Achievements</span>
                      <Badge variant="secondary">{achievements.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Certifications</span>
                      <Badge variant="secondary">{achievements.filter((a) => a.type === "certification").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Internships</span>
                      <Badge variant="secondary">{achievements.filter((a) => a.type === "internship").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Competitions</span>
                      <Badge variant="secondary">{achievements.filter((a) => a.type === "competition").length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Portfolio Completeness</span>
                      <Badge variant="secondary">92%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Portfolio Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                      <div className="flex items-start gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                          <AvatarFallback className="text-2xl">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-2">{studentData.name}</h2>
                          <p className="text-muted-foreground mb-4">{studentData.bio}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {studentData.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {studentData.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {studentData.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              {studentData.website}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Academic Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Student ID:</span>
                              <span>{studentData.studentId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Department:</span>
                              <span>{studentData.department}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Current Semester:</span>
                              <span>{studentData.semester}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GPA:</span>
                              <span>{studentData.gpa}/4.0</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Expected Graduation:</span>
                              <span>{studentData.expectedGraduation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-4">
                      {achievements.map((achievement) => {
                        const Icon = getActivityIcon(achievement.type)
                        return (
                          <div key={achievement.id} className="p-4 border rounded-lg">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">{achievement.title}</h3>
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {achievement.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {achievement.date}
                                  </span>
                                  <span>{achievement.issuer}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {achievement.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                      <div className="grid gap-4">
                        {skills.map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4">Portfolio Visibility</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Public Portfolio</span>
                            <Badge variant="secondary">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Search Engine Indexing</span>
                            <Badge variant="secondary">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Contact Information</span>
                            <Badge variant="secondary">Visible</Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Export Options</h3>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start bg-transparent"
                            onClick={handleExportPDF}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download as PDF
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <FileText className="h-4 w-4 mr-2" />
                            Export as Word Document
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Share Dialog */}
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Your Portfolio</DialogTitle>
                <DialogDescription>
                  Share your portfolio with employers, colleagues, or on social media
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Portfolio URL</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 p-2 bg-muted rounded text-sm font-mono">{shareUrl}</div>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AuthGuard>
  )
}

// Portfolio Preview Component
function PortfolioPreview({ theme, studentData, achievements }: any) {
  return (
    <div
      className="p-8 rounded-lg border"
      style={{
        backgroundColor: theme.colors.accent,
        borderColor: theme.colors.secondary,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Avatar className="h-32 w-32 mx-auto mb-4">
            <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
            <AvatarFallback className="text-4xl">JD</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>
            {studentData.name}
          </h1>
          <p className="text-xl" style={{ color: theme.colors.secondary }}>
            {studentData.department} Student
          </p>
          <p className="text-muted-foreground mt-2">{studentData.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" style={{ color: theme.colors.secondary }} />
            {studentData.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" style={{ color: theme.colors.secondary }} />
            {studentData.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" style={{ color: theme.colors.secondary }} />
            {studentData.location}
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" style={{ color: theme.colors.secondary }} />
            {studentData.website}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.primary }}>
            Achievements & Experience
          </h2>
          <div className="space-y-4">
            {achievements.slice(0, 3).map((achievement: any) => (
              <div key={achievement.id} className="border-l-4 pl-4" style={{ borderColor: theme.colors.secondary }}>
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.date} • {achievement.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
