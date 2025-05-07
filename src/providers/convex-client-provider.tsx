"use client";

import { ClerkProvider,SignIn,useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { AuthLoading,Authenticated,ConvexReactClient, Unauthenticated } from "convex/react";

interface ConvexClientProviderProps {
    children: React.ReactNode
    }

const ConvexUrl=process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex=new ConvexReactClient(ConvexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return(
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated> 
           {children}
    </Authenticated>
    <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn routing="hash"/>
        </div>
    </Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )

}