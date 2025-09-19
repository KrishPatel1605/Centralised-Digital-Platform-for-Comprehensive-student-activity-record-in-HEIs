"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "student" | "faculty" | "admin"
  department?: string
  studentId?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Test credentials for different roles
const TEST_CREDENTIALS = {
  student: {
    email: "student@test.com",
    password: "student123",
    user: {
      id: "1",
      email: "student@test.com",
      name: "Mukesh Jamwal",
      role: "student" as const,
      department: "Computer Science",
      studentId: "CS2021001",
    },
  },
  faculty: {
    email: "faculty@test.com",
    password: "faculty123",
    user: {
      id: "2",
      email: "faculty@test.com",
      name: "Dr. Sarah Wilson",
      role: "faculty" as const,
      department: "Computer Science",
    },
  },
  admin: {
    email: "admin@test.com",
    password: "admin123",
    user: {
      id: "3",
      email: "admin@test.com",
      name: "Mukesh Jamwal",
      role: "admin" as const,
    },
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] AuthProvider: Checking existing auth on mount")

    // Check for existing auth on mount
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    console.log("[v0] AuthProvider: Found token:", !!token, "userData:", !!userData)

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        console.log("[v0] AuthProvider: Setting user from localStorage:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.log("[v0] AuthProvider: Error parsing user data, clearing storage")
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
        localStorage.removeItem("user_role")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    console.log("[v0] AuthProvider: Login attempt for role:", role, "email:", email)

    const credentials = TEST_CREDENTIALS[role as keyof typeof TEST_CREDENTIALS]

    if (credentials && email === credentials.email && password === credentials.password) {
      console.log("[v0] AuthProvider: Credentials valid, logging in...")

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const token = `test_token_${Date.now()}`
      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_role", role)
      localStorage.setItem("user_data", JSON.stringify(credentials.user))

      console.log("[v0] AuthProvider: Auth data saved to localStorage")
      setUser(credentials.user)
      return true
    }

    console.log("[v0] AuthProvider: Invalid credentials")
    return false
  }

  const logout = () => {
    console.log("[v0] AuthProvider: Logging out")
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_role")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
