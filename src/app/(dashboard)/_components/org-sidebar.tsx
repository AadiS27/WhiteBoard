"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { LayoutDashboard, Star } from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"


const font =Poppins({
    subsets: ['latin'],
    weight: [ '600'],
    
  })
export const OrgSidebar = () => {
    const searchParams=useSearchParams();
    const favourites=searchParams.get("favourites")
return(
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
        <Link href="/">
        <div className="flex items-center gap-x-2">
            <Image src="/logo.svg" alt="logo" width={60} height={60} className="w-10 h-10" />
            <span className={cn("font-semibold text-2xl",font.className)}>Boardly</span>
        </div>
        </Link>
        <OrganizationSwitcher
  hidePersonal
  appearance={{
    elements: {
      rootBox:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
      organizationSwitcherTrigger:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        backgroundColor: "#F9FAFB",
        color: "#111827",
        fontSize: "3rem",
        fontWeight: 600,
      },
      organizationPreview: "gap-2",
      organizationAvatar: "w-5 h-5",
    },
  }}
/>
    <div className="space-y-1 w-full">
    <Button asChild size="lg" variant={favourites?"ghost":"secondary"} className="font-normal justify-start w-full px-2">
        <Link href="/"><LayoutDashboard className="h-4 w-4 mr-2"/>
        Teams</Link>
    </Button>
    <Button asChild size="lg"  variant={favourites?"secondary":"ghost"} className="font-normal justify-start w-full px-2">
        <Link href={{
            pathname:"/",
            query:{favourites:true}
        }}><Star className="h-4 w-4 mr-2"/>
        Favourites</Link>
    </Button>
    </div>
    </div>
)
}