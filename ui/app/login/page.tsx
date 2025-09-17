"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Eye, EyeOff, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState("student")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string

    console.log("[v0] Login: Attempting login with role:", role, "email:", email)

    const success = await login(email, password, role)

    console.log("[v0] Login: Login result:", success)

    if (success) {
      console.log("[v0] Login: Login successful, redirecting based on role:", role)

      // Add a small delay to ensure auth state is updated
      setTimeout(() => {
        if (role === "student") {
          console.log("[v0] Login: Redirecting to student dashboard")
          router.push("/student/dashboard")
        } else if (role === "faculty") {
          console.log("[v0] Login: Redirecting to faculty dashboard")
          router.push("/faculty/dashboard")
        } else if (role === "admin") {
          console.log("[v0] Login: Redirecting to admin dashboard")
          router.push("/admin/dashboard")
        }
      }, 100)
    } else {
      console.log("[v0] Login: Login failed")
      setError("Invalid credentials. Please use the test credentials provided below.")
    }
  }

  const getTestCredentials = (role: string) => {
    const credentials = {
      student: { email: "student@test.com", password: "student123" },
      faculty: { email: "faculty@test.com", password: "faculty123" },
      admin: { email: "admin@test.com", password: "admin123" },
    }
    return credentials[role as keyof typeof credentials]
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Smart Student Hub</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-2">Test Credentials:</p>
                <div className="space-y-1 text-blue-800">
                  <p>
                    <strong>{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}:</strong>
                  </p>
                  <p>
                    Email: <code className="bg-blue-100 px-1 rounded">{getTestCredentials(selectedRole)?.email}</code>
                  </p>
                  <p>
                    Password:{" "}
                    <code className="bg-blue-100 px-1 rounded">{getTestCredentials(selectedRole)?.password}</code>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue="student" required onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full"
                  defaultValue={getTestCredentials(selectedRole)?.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full pr-10"
                    defaultValue={getTestCredentials(selectedRole)?.password}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
