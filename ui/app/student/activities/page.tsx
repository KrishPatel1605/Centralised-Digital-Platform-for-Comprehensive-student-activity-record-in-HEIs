"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Plus,
  Upload,
  Filter,
  Search,
  Calendar,
  Award,
  BookOpen,
  Users,
  Trophy,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  MoreHorizontal,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthGuard } from "@/components/auth-guard"

// Mock data for activities
const activities = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Certification",
    description: "Completed AWS Cloud Practitioner certification course with 85% score",
    type: "certification",
    category: "Technical Skills",
    status: "approved",
    submittedDate: "2024-03-01",
    approvedDate: "2024-03-03",
    approvedBy: "Dr. Vijaya",
    documents: ["aws-certificate.pdf", "score-report.pdf"],
    tags: ["AWS", "Cloud Computing", "Certification"],
  },
  {
    id: 2,
    title: "University Hackathon 2024 - Winner",
    description: "Won 1st place in the annual university hackathon with an AI-powered study assistant app",
    type: "competition",
    category: "Competitions",
    status: "pending",
    submittedDate: "2025-03-4",
    documents: ["hackathon-certificate.pdf", "project-demo.mp4"],
    tags: ["Hackathon", "AI", "First Place", "Team Work"],
  },
  {
    id: 3,
    title: "Summer Internship at TechCorp",
    description: "3-month software development internship focusing on full-stack web development",
    type: "internship",
    category: "Work Experience",
    status: "approved",
    submittedDate: "2025-02-27",
    approvedDate: "2025-03-3",
    approvedBy: "Prof. Miley Cyrus",
    documents: ["internship-certificate.pdf", "performance-review.pdf"],
    tags: ["Internship", "Full Stack", "Web Development"],
  },
  {
    id: 4,
    title: "Community Coding Workshop Volunteer",
    description: "Volunteered as a mentor at local coding workshop for high school students",
    type: "volunteer",
    category: "Community Service",
    status: "rejected",
    submittedDate: "2025-02-10",
    rejectedDate: "2025-02-12",
    rejectedBy: "Dr. Mukta Navis",
    rejectionReason: "Insufficient documentation provided",
    documents: ["volunteer-hours.pdf"],
    tags: ["Volunteering", "Teaching", "Community Service"],
  },
  {
    id: 5,
    title: "React Conference 2024",
    description: "Attended React Conference 2024 and participated in workshops on Next.js and TypeScript",
    type: "conference",
    category: "Professional Development",
    status: "approved",
    submittedDate: "2024-11-20",
    approvedDate: "2024-11-22",
    approvedBy: "Dr. Sonali",
    documents: ["conference-certificate.pdf", "workshop-completion.pdf"],
    tags: ["React", "Conference", "Next.js", "TypeScript"],
  },
]

const activityTypes = [
  { value: "certification", label: "Certification", icon: Award },
  { value: "internship", label: "Internship", icon: BookOpen },
  { value: "conference", label: "Conference", icon: Users },
  { value: "competition", label: "Competition", icon: Trophy },
  { value: "volunteer", label: "Volunteer Work", icon: Users },
  { value: "project", label: "Project", icon: FileText },
]

export default function ActivitiesPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter = selectedFilter === "all" || activity.status === selectedFilter
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleViewActivity = (activity: any) => {
    setSelectedActivity(activity)
    setIsViewDialogOpen(true)
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
              <Badge variant="secondary">Activities</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/student-avatar.png" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Mukesh Jamwal</p>
                      <p className="text-xs leading-none text-muted-foreground">STU123456</p>
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
              <h1 className="text-3xl font-bold mb-2">Activity Tracker</h1>
              <p className="text-muted-foreground">Manage and track your academic and extracurricular activities</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Activity</DialogTitle>
                  <DialogDescription>Submit a new activity for faculty approval</DialogDescription>
                </DialogHeader>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="activityType">Activity Type</Label>
                      <Select name="activityType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Skills</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="community">Community Service</SelectItem>
                          <SelectItem value="academic">Academic Achievement</SelectItem>
                          <SelectItem value="professional">Professional Development</SelectItem>
                          <SelectItem value="creative">Creative Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title</Label>
                    <Input id="title" name="title" placeholder="Enter activity title" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide detailed description of your activity..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" name="startDate" type="date" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" name="endDate" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" name="tags" placeholder="Enter tags separated by commas" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documents">Upload Documents</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                      <Input id="documents" name="documents" type="file" multiple className="hidden" />
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </form>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit for Approval</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activities List */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredActivities.map((activity) => {
                const ActivityIcon = activityTypes.find((type) => type.value === activity.type)?.icon || FileText
                return (
                  <Card key={activity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <ActivityIcon className="h-6 w-6 text-primary" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{activity.title}</h3>
                              <Badge className={`${getStatusColor(activity.status)} border`}>
                                {getStatusIcon(activity.status)}
                                <span className="ml-1 capitalize">{activity.status}</span>
                              </Badge>
                            </div>

                            <p className="text-muted-foreground mb-3">{activity.description}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {activity.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Submitted: {new Date(activity.submittedDate).toLocaleDateString()}
                              </span>
                              {activity.approvedDate && (
                                <span className="flex items-center gap-1">
                                  <CheckCircle className="h-4 w-4" />
                                  Approved: {new Date(activity.approvedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewActivity(activity)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Documents
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <div className="relative">
                {filteredActivities.map((activity, index) => {
                  const ActivityIcon = activityTypes.find((type) => type.value === activity.type)?.icon || FileText
                  return (
                    <div key={activity.id} className="relative flex items-start gap-6 pb-8">
                      {/* Timeline line */}
                      {index < filteredActivities.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-full bg-border"></div>
                      )}

                      {/* Timeline dot */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-sm">
                        <ActivityIcon className="h-5 w-5 text-primary" />
                      </div>

                      {/* Content */}
                      <Card className="flex-1">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{activity.title}</h3>
                            <Badge className={`${getStatusColor(activity.status)} border`}>
                              {getStatusIcon(activity.status)}
                              <span className="ml-1 capitalize">{activity.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(activity.submittedDate).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Activity Details Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              {selectedActivity && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {(() => {
                        const ActivityIcon =
                          activityTypes.find((type) => type.value === selectedActivity.type)?.icon || FileText
                        return <ActivityIcon className="h-5 w-5" />
                      })()}
                      {selectedActivity.title}
                    </DialogTitle>
                    <DialogDescription>Activity Details and Status</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(selectedActivity.status)} border`}>
                        {getStatusIcon(selectedActivity.status)}
                        <span className="ml-1 capitalize">{selectedActivity.status}</span>
                      </Badge>
                      <Badge variant="outline">{selectedActivity.category}</Badge>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-muted-foreground">{selectedActivity.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedActivity.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Submitted Date</h4>
                        <p className="text-muted-foreground">
                          {new Date(selectedActivity.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedActivity.approvedDate && (
                        <div>
                          <h4 className="font-medium mb-2">Approved Date</h4>
                          <p className="text-muted-foreground">
                            {new Date(selectedActivity.approvedDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedActivity.approvedBy && (
                      <div>
                        <h4 className="font-medium mb-2">Approved By</h4>
                        <p className="text-muted-foreground">{selectedActivity.approvedBy}</p>
                      </div>
                    )}

                    {selectedActivity.rejectionReason && (
                      <div>
                        <h4 className="font-medium mb-2">Rejection Reason</h4>
                        <p className="text-red-600">{selectedActivity.rejectionReason}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Documents</h4>
                      <div className="space-y-2">
                        {selectedActivity.documents.map((doc: string) => (
                          <div key={doc} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{doc}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AuthGuard>
  )
}
