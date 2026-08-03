"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PropertyModal } from "./PropertyModal"
import { useRouter } from "next/navigation"
import { CreatePropertyFormData, IProperty } from "@/lib/types"
import { addProperty } from "@/app/(publicRoutes)/_actions/propertyActions"
import { toast } from "sonner"

export function AddPropertyButton() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleCreateProperty = async (data: CreatePropertyFormData) => {
        try {
            const res = await addProperty(data)
            if (res?.success) {
                toast.success(res?.message || "New property add successfully")
            } else {
                toast.error("Failed to Add Property")
            }
            router.refresh()
        } catch (error) {
            console.error("Failed to create property:", error)
            toast.error("Failed to Add Property")
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                size="lg"
                className="w-full sm:w-auto h-11 px-5 rounded-xl font-semibold text-xs transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-95 active:scale-[0.98] gap-2.5 bg-primary text-primary-foreground group"
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground group-hover:scale-110 transition-transform">
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                </div>
                <span className="tracking-wide">Add New Property</span>
            </Button>


            <PropertyModal
                open={open}
                onOpenChange={setOpen}
                onSubmit={handleCreateProperty}
            />
        </>
    )
}
