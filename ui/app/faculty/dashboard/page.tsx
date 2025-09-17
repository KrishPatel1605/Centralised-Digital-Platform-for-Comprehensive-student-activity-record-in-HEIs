"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  GraduationCap,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  User,
  Award,
  BookOpen,
  Users,
  Trophy,
  FileText,
  Bell,
  Settings,
  LogOut,
  MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthGuard } from "@/components/auth-guard"

// Mock data for pending submissions
const pendingSubmissions = [
  {
    id: 1,
    student: {
      name: "John Doe",
      id: "STU123456",
      department: "Computer Science",
      semester: "6th Semester",
      avatar: "/student-avatar.png",
    },
    activity: {
      title: "AWS Cloud Practitioner Certification",
      description: "Completed AWS Cloud Practitioner certification course with 85% score",
      type: "certification",
      category: "Technical Skills",
      submittedDate: "2024-03-01",
      documents: ["aws-certificate.pdf", "score-report.pdf"],
      tags: ["AWS", "Cloud Computing", "Certification"],
    },
    priority: "high",
  },
  {
    id: 2,
    student: {
      name: "Jane Smith",
      id: "STU789012",
      department: "Computer Science",
      semester: "4th Semester",
      avatar: "/student-avatar-2.png",
    },
    activity: {
      title: "University Hackathon 2024 - Winner",
      description: "Won 1st place in the annual university hackathon with an AI-powered study assistant app",
      type: "competition",
      category: "Competitions",
      submittedDate: "2024-02-28",
      documents: ["hackathon-certificate.pdf", "project-demo.mp4"],
      tags: ["Hackathon", "AI", "First Place", "Team Work"],
    },
    priority: "high",
  },
  {
    id: 3,
    student: {
      name: "Mike Johnson",
      id: "STU345678",
      department: "Electrical Engineering",
      semester: "8th Semester",
      avatar: "/student-avatar-3.png",
    },
    activity: {
      title: "IEEE Conference on Robotics",
      description: "Presented research paper on autonomous navigation systems",
      type: "conference",
      category: "Research",
      submittedDate: "2024-02-25",
      documents: ["conference-paper.pdf", "presentation-slides.pdf"],
      tags: ["IEEE", "Robotics", "Research", "Presentation"],
    },
    priority: "medium",
  },
  {
    id: 4,
    student: {
      name: "Sarah Wilson",
      id: "STU901234",
      department: "Computer Science",
      semester: "6th Semester",
      avatar: "/student-avatar-4.png",
    },
    activity: {
      title: "Community Coding Workshop Volunteer",
      description: "Volunteered as a mentor at local coding workshop for high school students",
      type: "volunteer",
      category: "Community Service",
      submittedDate: "2024-02-20",
      documents: ["volunteer-hours.pdf", "workshop-photos.zip"],
      tags: ["Volunteering", "Teaching", "Community Service"],
    },
    priority: "low",
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

export default function FacultyDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false)
  const [approvalComments, setApprovalComments] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredSubmissions = pendingSubmissions.filter((submission) => {
    const matchesSearch =
      submission.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.student.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || submission.student.department === selectedDepartment

    const matchesType = selectedType === "all" || submission.activity.type === selectedType

    const matchesPriority = selectedPriority === "all" || submission.priority === selectedPriority

    return matchesSearch && matchesDepartment && matchesType && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission)
    setIsViewDialogOpen(true)
  }

  const handleApprove = (submission: any) => {
    setSelectedSubmission(submission)
    setIsApprovalDialogOpen(true)
  }

  const handleReject = (submission: any) => {
    setSelectedSubmission(submission)
    setIsRejectionDialogOpen(true)
  }

  const confirmApproval = () => {
    // Handle approval logic here
    console.log("Approved:", selectedSubmission?.id, "Comments:", approvalComments)
    setIsApprovalDialogOpen(false)
    setApprovalComments("")
  }

  const confirmRejection = () => {
    // Handle rejection logic here
    console.log("Rejected:", selectedSubmission?.id, "Reason:", rejectionReason)
    setIsRejectionDialogOpen(false)
    setRejectionReason("")
  }

  return (
    <AuthGuard requiredRole="faculty">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Smart Student Hub</span>
              </div>
              <Badge variant="secondary">Faculty Dashboard</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/faculty-avatar.png" alt="Dr. Sarah Johnson" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Dr. Sarah Johnson</p>
                      <p className="text-xs leading-none text-muted-foreground">Computer Science Department</p>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Faculty Approval Panel</h1>
            <p className="text-muted-foreground">Review and approve student activity submissions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingSubmissions.filter((s) => s.priority === "high").length} high priority
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students Reviewed</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Review Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3</div>
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, ID, or activity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Activity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => {
              const ActivityIcon =
                activityTypes.find((type) => type.value === submission.activity.type)?.icon || FileText
              return (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={submission.student.avatar || "/placeholder.svg"}
                            alt={submission.student.name}
                          />
                          <AvatarFallback>
                            {submission.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{submission.student.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {submission.student.id}
                            </Badge>
                            <Badge className={`${getPriorityColor(submission.priority)} border text-xs`}>
                              {submission.priority} priority
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {submission.student.department} • {submission.student.semester}
                          </p>

                          <div className="flex items-center gap-2 mb-3">
                            <ActivityIcon className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">{submission.activity.title}</h4>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{submission.activity.description}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {submission.activity.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Submitted: {new Date(submission.activity.submittedDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {submission.activity.documents.length} documents
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewSubmission(submission)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleApprove(submission)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleReject(submission)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Documents
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* View Submission Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              {selectedSubmission && (
                <>
                  <DialogHeader>
                    <DialogTitle>Activity Submission Details</DialogTitle>
                    <DialogDescription>Review the complete submission information</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Student Info */}
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={selectedSubmission.student.avatar || "/placeholder.svg"}
                          alt={selectedSubmission.student.name}
                        />
                        <AvatarFallback>
                          {selectedSubmission.student.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{selectedSubmission.student.name}</h3>
                        <p className="text-muted-foreground">{selectedSubmission.student.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedSubmission.student.department} • {selectedSubmission.student.semester}
                        </p>
                      </div>
                    </div>

                    {/* Activity Details */}
                    <div>
                      <h4 className="font-medium mb-3">Activity Information</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Title</Label>
                          <p className="text-sm">{selectedSubmission.activity.title}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Description</Label>
                          <p className="text-sm text-muted-foreground">{selectedSubmission.activity.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Type</Label>
                            <p className="text-sm capitalize">{selectedSubmission.activity.type}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Category</Label>
                            <p className="text-sm">{selectedSubmission.activity.category}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Tags</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedSubmission.activity.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-medium mb-3">Submitted Documents</h4>
                      <div className="space-y-2">
                        {selectedSubmission.activity.documents.map((doc: string) => (
                          <div key={doc} className="flex items-center justify-between p-3 border rounded">
                            <span className="text-sm">{doc}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                      Close
                    </Button>
                    <Button variant="outline" onClick={() => handleReject(selectedSubmission)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button onClick={() => handleApprove(selectedSubmission)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Approval Dialog */}
          <AlertDialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Approve Activity Submission</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to approve "{selectedSubmission?.activity.title}" by {selectedSubmission?.student.name}.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="approvalComments">Comments (Optional)</Label>
                  <Textarea
                    id="approvalComments"
                    placeholder="Add any comments or feedback for the student..."
                    value={approvalComments}
                    onChange={(e) => setApprovalComments(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmApproval}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Activity
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Rejection Dialog */}
          <AlertDialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reject Activity Submission</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to reject "{selectedSubmission?.activity.title}" by {selectedSubmission?.student.name}.
                  Please provide a reason for rejection.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="rejectionReason">Reason for Rejection *</Label>
                  <Textarea
                    id="rejectionReason"
                    placeholder="Please explain why this submission is being rejected..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmRejection}
                  disabled={!rejectionReason.trim()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Activity
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </AuthGuard>
  )
}
