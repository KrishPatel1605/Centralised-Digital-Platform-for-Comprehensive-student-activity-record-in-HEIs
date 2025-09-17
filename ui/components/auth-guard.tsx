"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "student" | "faculty" | "admin"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/login" }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate auth check - in real app, this would check JWT/session
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token")
      const role = localStorage.getItem("user_role")

      if (!token) {
        setIsAuthenticated(false)
        router.push(redirectTo)
        return
      }

      setIsAuthenticated(true)
      setUserRole(role)

      // Check role-based access
      if (requiredRole && role !== requiredRole) {
        router.push("/unauthorized")
        return
      }
    }

    checkAuth()
  }, [requiredRole, redirectTo, router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
