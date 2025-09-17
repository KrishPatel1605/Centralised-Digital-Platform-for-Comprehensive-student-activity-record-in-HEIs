"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "student" | "faculty" | "admin"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/login" }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] AuthGuard: Checking auth - isLoading:", isLoading, "user:", !!user, "requiredRole:", requiredRole)

    // Don't redirect while still loading
    if (isLoading) {
      console.log("[v0] AuthGuard: Still loading, waiting...")
      return
    }

    // If no user and not loading, redirect to login
    if (!user) {
      console.log("[v0] AuthGuard: No user found, redirecting to login")
      router.push(redirectTo)
      return
    }

    // Check role-based access
    if (requiredRole && user.role !== requiredRole) {
      console.log("[v0] AuthGuard: Role mismatch. Required:", requiredRole, "User role:", user.role)
      router.push("/unauthorized")
      return
    }

    console.log("[v0] AuthGuard: Auth check passed")
  }, [user, isLoading, requiredRole, redirectTo, router])

  // Show loading while auth is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!user) {
    return null
  }

  // Don't render if role doesn't match
  if (requiredRole && user.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
