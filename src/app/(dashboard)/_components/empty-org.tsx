"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import {  CirclePlus } from "lucide-react"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CreateOrganization } from "@clerk/clerk-react"



export const EmptyOrg = () => {

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center max-w-md text-center space-y-6">
        <div className="relative h-40 w-40 rounded-full bg-muted/30 p-2 backdrop-blur-sm">
          <Image src="/empty.avif" height={200} width={200} alt="Empty state illustration" className="object-contain" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">Welcome to Boardly</h3>
          <p className="text-muted-foreground">
            There`&apos;`s nothing here. Get
            started by creating a new Organization.
          </p>
        </div>
        <Dialog >
            <DialogTrigger asChild >
        <Button className="gap-2"> 
        Create Organization
        <CirclePlus className="h-4 w-4" /> 
        </Button>
        </DialogTrigger>
        <DialogContent className="p-0 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg bg-background">
            <VisuallyHidden><DialogTitle>IDK</DialogTitle></VisuallyHidden>
            <CreateOrganization/>
        </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
