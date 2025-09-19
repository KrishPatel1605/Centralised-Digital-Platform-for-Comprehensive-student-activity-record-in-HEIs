"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Download,
  FileText,
  BarChart3,
  PieChartIcon,
  Shield,
  Settings,
  Bell,
  LogOut,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthGuard } from "@/components/auth-guard"

// Mock data for analytics
const studentParticipationData = [
  { month: "Jan", students: 120, activities: 450 },
  { month: "Feb", students: 135, activities: 520 },
  { month: "Mar", students: 142, activities: 580 },
  { month: "Apr", students: 158, activities: 620 },
  { month: "May", students: 165, activities: 680 },
  { month: "Jun", students: 172, activities: 720 },
]

const departmentData = [
  { name: "Computer Science", students: 245, activities: 1250, color: "#0ea5e9" },
  { name: "Electrical Eng.", students: 180, activities: 890, color: "#8b5cf6" },
  { name: "Mechanical Eng.", students: 165, activities: 780, color: "#f59e0b" },
  { name: "Civil Engineering", students: 140, activities: 650, color: "#10b981" },
  { name: "Business Admin", students: 120, activities: 580, color: "#ef4444" },
]

const activityTypeData = [
  { name: "Certifications", value: 35, color: "#0ea5e9" },
  { name: "Internships", value: 25, color: "#8b5cf6" },
  { name: "Conferences", value: 20, color: "#f59e0b" },
  { name: "Competitions", value: 12, color: "#10b981" },
  { name: "Volunteer Work", value: 8, color: "#ef4444" },
]

const accreditationMetrics = [
  { category: "Student Participation", current: 85, target: 90, status: "good" },
  { category: "Faculty Engagement", current: 92, target: 85, status: "excellent" },
  { category: "Documentation Quality", current: 78, target: 80, status: "warning" },
  { category: "Compliance Reports", current: 95, target: 90, status: "excellent" },
  { category: "Data Completeness", current: 88, target: 85, status: "good" },
]

const recentActivities = [
  {
    id: 1,
    type: "approval",
    message: "Dr. Vijaya approved 5 student activities",
    timestamp: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "submission",
    message: "15 new activity submissions received",
    timestamp: "4 hours ago",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "alert",
    message: "Documentation quality below target for CS department",
    timestamp: "6 hours ago",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    id: 4,
    type: "report",
    message: "Monthly NAAC compliance report generated",
    timestamp: "1 day ago",
    icon: FileText,
    color: "text-purple-600",
  },
]

export default function AdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`)
    // In a real app, this would trigger report generation
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Smart Student Hub</span>
              </div>
              <Badge variant="secondary">Admin Dashboard</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.png" alt="Admin User" />
                      <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">System Administrator</p>
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
              <h1 className="text-3xl font-bold mb-2">Analytics & Admin Dashboard</h1>
              <p className="text-muted-foreground">Institutional overview and accreditation readiness metrics</p>
            </div>

            <div className="flex items-center gap-3">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => generateReport("naac")}>
                    <FileText className="h-4 w-4 mr-2" />
                    NAAC Compliance Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => generateReport("aicte")}>
                    <FileText className="h-4 w-4 mr-2" />
                    AICTE Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => generateReport("nirf")}>
                    <FileText className="h-4 w-4 mr-2" />
                    NIRF Rankings Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => generateReport("custom")}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Custom Analytics Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Portfolios</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,089</div>
                <p className="text-xs text-muted-foreground">87% completion rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activities Logged</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,150</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accreditation Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.6</div>
                <p className="text-xs text-muted-foreground">NAAC Grade A ready</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="accreditation">Accreditation</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Student Participation Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Participation Trends</CardTitle>
                    <CardDescription>Monthly student engagement and activity submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={studentParticipationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="students"
                          stackId="1"
                          stroke="#0ea5e9"
                          fill="#0ea5e9"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="activities"
                          stackId="2"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Activity Types Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Types Distribution</CardTitle>
                    <CardDescription>Breakdown of activity categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={activityTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {activityTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {activityTypeData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm text-muted-foreground">({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activities</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border">
                          <div className={`flex-shrink-0 ${activity.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Student participation and activity metrics by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#0ea5e9" name="Students" />
                      <Bar dataKey="activities" fill="#8b5cf6" name="Activities" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentData.map((dept) => (
                  <Card key={dept.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Active Students</span>
                          <span className="font-semibold">{dept.students}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Activities</span>
                          <span className="font-semibold">{dept.activities}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg. per Student</span>
                          <span className="font-semibold">{Math.round(dept.activities / dept.students)}</span>
                        </div>
                        <Progress value={(dept.activities / 1250) * 100} className="mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accreditation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Accreditation Readiness Meter</CardTitle>
                  <CardDescription>Current compliance status for NAAC, AICTE, and NIRF requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {accreditationMetrics.map((metric) => (
                      <div key={metric.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{metric.category}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getStatusColor(metric.status)} border`}>
                              {metric.status === "excellent" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {metric.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {metric.current}%
                            </Badge>
                            <span className="text-sm text-muted-foreground">Target: {metric.target}%</span>
                          </div>
                        </div>
                        <Progress value={metric.current} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">NAAC Grade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">A</div>
                      <p className="text-sm text-muted-foreground">Ready for accreditation</p>
                      <Progress value={87} className="mt-4" />
                      <p className="text-xs text-muted-foreground mt-2">87.6/100 points</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AICTE Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">✓</div>
                      <p className="text-sm text-muted-foreground">Fully compliant</p>
                      <Progress value={95} className="mt-4" />
                      <p className="text-xs text-muted-foreground mt-2">95% compliance rate</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">NIRF Ranking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">42</div>
                      <p className="text-sm text-muted-foreground">National ranking</p>
                      <Progress value={78} className="mt-4" />
                      <p className="text-xs text-muted-foreground mt-2">Improved by 8 positions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Reports</CardTitle>
                    <CardDescription>Generate reports for accreditation bodies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" onClick={() => generateReport("naac")}>
                      <FileText className="h-4 w-4 mr-2" />
                      NAAC Self-Study Report
                    </Button>
                    <Button className="w-full justify-start" onClick={() => generateReport("aicte")}>
                      <FileText className="h-4 w-4 mr-2" />
                      AICTE Annual Report
                    </Button>
                    <Button className="w-full justify-start" onClick={() => generateReport("nirf")}>
                      <FileText className="h-4 w-4 mr-2" />
                      NIRF Data Collection
                    </Button>
                    <Button className="w-full justify-start" onClick={() => generateReport("ugc")}>
                      <FileText className="h-4 w-4 mr-2" />
                      UGC Compliance Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Reports</CardTitle>
                    <CardDescription>Detailed analytics and insights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" onClick={() => generateReport("student-analytics")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Student Analytics Report
                    </Button>
                    <Button className="w-full justify-start" onClick={() => generateReport("faculty-analytics")}>
                      <PieChartIcon className="h-4 w-4 mr-2" />
                      Faculty Performance Report
                    </Button>
                    <Button className="w-full justify-start" onClick={() => generateReport("department-analytics")}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Department Comparison
                    </Button>
                    <Button className="w-full justify-start" onClick={() => generateReport("custom")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Custom Report Builder
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Previously generated reports and downloads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "NAAC Self-Study Report - September 2024", date: "2024-03-15", size: "2.4 MB" },
                      { name: "Student Analytics - January 2025", date: "2024-02-28", size: "1.8 MB" },
                      { name: "AICTE Annual Report - 2023-24", date: "2024-02-15", size: "3.2 MB" },
                      { name: "Department Performance - Q4 2024", date: "2024-01-30", size: "1.5 MB" },
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium text-sm">{report.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Generated on {report.date} • {report.size}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
