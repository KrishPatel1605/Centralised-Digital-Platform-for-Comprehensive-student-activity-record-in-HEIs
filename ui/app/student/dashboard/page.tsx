"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Calendar,
  Upload,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Users,
  Bell,
  Settings,
  LogOut,
  Plus,
  CheckCircle,
  FileText,
} from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

// Mock data for demonstration
const studentData = {
  name: "Mukesh Jamwal",
  studentId: "STU123456",
  department: "Computer Science",
  semester: "6th Semester",
  avatar: "/student-avatar.png",
  stats: {
    attendance: 92,
    gpa: 3.8,
    credits: 145,
    totalCredits: 180,
  },
}

const recentActivities = [
  {
    id: 1,
    type: "achievement",
    title: "Hackathon Winner",
    description: "Won 1st place in University Hackathon 2024",
    status: "approved",
    date: "2 days ago",
    icon: Award,
  },
  {
    id: 2,
    type: "certificate",
    title: "AWS Cloud Practitioner",
    description: "Completed AWS certification course",
    status: "pending",
    date: "1 week ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "internship",
    title: "Summer Internship at TechCorp",
    description: "3-month software development internship",
    status: "approved",
    date: "2 weeks ago",
    icon: BookOpen,
  },
  {
    id: 4,
    type: "volunteer",
    title: "Community Service",
    description: "Volunteered at local coding bootcamp",
    status: "pending",
    date: "3 weeks ago",
    icon: Users,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Career Fair 2024",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    type: "career",
  },
  {
    id: 2,
    title: "Project Presentation",
    date: "March 18, 2024",
    time: "2:00 PM",
    location: "Room 301",
    type: "academic",
  },
  {
    id: 3,
    title: "Tech Talk: AI in Healthcare",
    date: "March 22, 2024",
    time: "4:00 PM",
    location: "Virtual",
    type: "seminar",
  },
]

export default function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

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
              <Badge variant="secondary">{studentData.department}</Badge>
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">
              {studentData.semester} • {studentData.department}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.stats.attendance}%</div>
                <Progress value={studentData.stats.attendance} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {studentData.stats.attendance >= 85 ? "Excellent attendance!" : "Needs improvement"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Academic GPA</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.stats.gpa}</div>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <div
                        key={star}
                        className={`h-3 w-3 rounded-full mr-1 ${
                          star <= studentData.stats.gpa ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Out of 4.0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.stats.credits}</div>
                <Progress value={(studentData.stats.credits / studentData.stats.totalCredits) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {studentData.stats.totalCredits - studentData.stats.credits} credits remaining
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Next: {upcomingEvents[0]?.title}</p>
                <p className="text-xs text-muted-foreground">{upcomingEvents[0]?.date}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Activity Feed & Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Quick Upload
                  </CardTitle>
                  <CardDescription>Add your latest achievements and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Award className="h-6 w-6" />
                      <span className="text-xs">Certificate</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <BookOpen className="h-6 w-6" />
                      <span className="text-xs">Internship</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Users className="h-6 w-6" />
                      <span className="text-xs">Event</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Plus className="h-6 w-6" />
                      <span className="text-xs">Other</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest submissions and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{activity.title}</h4>
                              <Badge
                                variant={activity.status === "approved" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {activity.status === "approved" ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Upcoming Events & Quick Stats */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Certificates</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Internships</span>
                      <Badge variant="secondary">3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Events Attended</span>
                      <Badge variant="secondary">28</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Volunteer Hours</span>
                      <Badge variant="secondary">45</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Portfolio
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Award className="h-4 w-4 mr-2" />
                      View Achievements
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
