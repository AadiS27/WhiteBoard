"use client"

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react"
import { Loading } from "@/components/auth/loading"

interface ConvexClientProviderProps {
  children: React.ReactNode
}

const ConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!
const convex = new ConvexReactClient(ConvexUrl)

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          {/* Show full-screen animated loading while auth status is being determined */}
          <Loading />
        </AuthLoading>

        <Unauthenticated>
          {/* Show SignIn only when user is confirmed unauthenticated */}
          <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>

        <Authenticated>
          {/* Show app only when fully authenticated */}
          {children}
        </Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
